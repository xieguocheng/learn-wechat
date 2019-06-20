const app = getApp()

var util = require('../../../../../utils/util.js');
Page({
  data: {
    courseId: "",
    deleteIds: [], //删除了的questionId
    courseTaskId: 0, //作业id
    name: "", //作业名字
    name1: "", //作业备用名字
    start_date: "", //开始日期 
    date: '', //截止日期
    showModal: false,
    ans_id: [ //答案的ABCD
      "A", "B", "C", "D", "E", "F", "G"
    ],
    blank_id: [ //答案的ABCD
      "第一空答案", "第二空答案", "第三空答案", "第四空答案", "第五空答案", "第六空答案", "第七空答案"
    ],
    type: [
      "单选题", "多选题", "填空题"
    ],
    /**
     * testList[数据结构
     * {
          questionId: 1,
          questionType: 0, 
          questionDesc: "问题描述",
          choice: [
            "选项1", "选项2", "选项3"
          ],
          answer: ["A"] //answer[0]
     * }
     * ]
     */
    testList: []
  },
  //保存临时修改
  onShow: function() {
    //console.log(this.data.testList)
  },

  //保存临时修改
  saveQuestion: function(e) {
    //console.log('Save', this.data.testList)
    //加工函数，将answer和chioce的数组形式转换为String形式


    var me = this;
    wx.showModal({
      title: '提示',
      content: '是否保存临时修改？',
      success: function(res) {
        if (res.confirm) {
          var vi = me.data.testList //vi遍历
          for (var i = 0; i < vi.length; i++) {
            //输出ID(ID可能是空的)

            //输出问题类型和问题描述


            if (vi[i].questionType != 3) {
              //输出单选多选的选项
              var cho = ""
              for (var j = 0; j < vi[i].choices.length; j++) {
                cho += me.data.ans_id[j] + '.' + vi[i].choices[j]
                if (j != vi[i].choices.length - 1)
                  cho += '-'
              }
              vi[i].choice = cho
            } else {
              //填空选项为空
              vi[i].choice = ""
            }

            if (vi[i].questionType != 3) {
              //输出单选多选的答案
              vi[i].answer = vi[i].answers[0]

            } else {
              //输出填空题的答案
              var ans = ""
              for (var j = 0; j < vi[i].answers.length; j++) {
                ans += vi[i].answers[j]
                if (j != vi[i].answers.length - 1)
                  ans += '-'
              }
              vi[i].answer = ans
            }
          }
          console.log('vi', vi)

          //(待修改)将testList和name保存到服务器,页面自动返回上层
          var serverUrl = app.serverUrl;
          var courseTaskId = me.data.courseTaskId;
          console.log('courseTaskId', courseTaskId);
          wx.request({
            url: serverUrl + '/task/modifyCourseTask',
            method: "POST",
            header: {
              'content-type': 'application/json'
            },
            data: {
              courseTaskId: courseTaskId,
              taskTitle: me.data.name,
              questionList: JSON.stringify(vi),
              deleteIds: JSON.stringify(me.data.deleteIds)
            },
            dataType: "json",
            success: function(res) {
              //  var data = JSON.parse(res.data);
              wx.hideLoading();
              wx.hideNavigationBarLoading();
              if (res.data.status == 200) {
                wx.showToast({
                  title: '保存修改成功',
                })
                setTimeout(function() {
                  wx.navigateBack({

                  })
                }, 1500)

              } else {
                wx.showToast({
                  title: '保存修改失败!~~',
                  icon: "success"
                });
              }

            },
            fail: function() {
              wx.showToast({
                title: '网络访问超时...',
                icon: 'none'
              })
            }
          })

        } else {

        }
      }
    })
  },
  //创建下一题
  createQuestion: function(e) {
    wx.navigateTo({
      url: 'hw_addQues/hw_addQues?index=' + this.data.testList.length,
    })
  },

  onLoad: function(options) {

    wx.showLoading({
      title: '请等待，加载中...',
    });

    // 获取上一个页面传入的课程作业id
    var me = this;
    var courseTaskId = options.courseTaskId;
    var courseId = options.courseId;
    console.log(courseTaskId)
    var serverUrl = app.serverUrl;
    wx.request({
      url: serverUrl + '/task/getAllQuestions?courseTaskId=' + courseTaskId,
      method: "POST",
      success: function(res) {
        wx.hideLoading();

        console.log('onload...',res.data.data);
        me.setData({
          testList: res.data.data,
          start_date: util.formatTime(new Date()),
          name: options.name,
          name1: options.name,
          courseTaskId: courseTaskId,
          courseId: courseId 
        })

      }
    })


  },
  //输入更改标题
  changeName: function(e) {
    if (e.detail.value == "") {
      wx.showToast({
        title: '标题不可为空',
        icon: "none"
      })
      this.setData({
        name: this.data.name1
      })
      return false
    } else {
      this.setData({
        name: e.detail.value
      })
      wx.showToast({
        title: '请保存修改',
      })
    }
  },
  edititem: function(e) {
    var that = this
    var list = this.data.testList

    var index = e.currentTarget.dataset.set

    //var mode64 = base64.encode(JSON.stringify(list[index]))
    var question = JSON.stringify(list[index])

    console.log(question);
    wx.navigateTo({
      url: '../hw_edit/hw_edit?question=' + encodeURIComponent(question) + "&index=" + index,
    })

  },
  delitem: function(e) {
    var that = this
    var list = this.data.testList
    var index = e.currentTarget.dataset.set
    wx.showModal({
      title: '提示',
      content: '确定删除第' + (index + 1) + '题' + that.data.type[that.data.testList[index].questionType - 1],
      success(res) {
        if (res.confirm) {
          var deleteId = that.data.deleteIds
          if (that.data.testList[index].questionId != null) {
            deleteId[deleteId.length] = that.data.testList[index].questionId
          }

          console.log('当前删除的ID组', deleteId)
          //删除
          list.splice(index, 1);
          //更新列表的状态
          that.setData({
            testList: list,
            deleteIds: deleteId
          });
          console.log("删除")
          console.log(list)
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })

        } else if (res.cancel) {

        }
      }
    })
  },
  showDialogBtn: function(e) {

    if (this.data.testList.length == 0) {
      wx.showToast({
        title: '发布失败，请创建题目',
        icon: "none"
      })
      return false
    } else {
      this.setData({
        showModal: true,
        date: util.formatTime(new Date())
      })
    }
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  //发布作业
  GetName: function(e) {

    var me = this;
    var vi = me.data.testList //vi遍历
    for (var i = 0; i < vi.length; i++) {
      //输出ID(ID可能是空的)
      //输出问题类型和问题描述
      if (vi[i].questionType != 3) {
        //输出单选多选的选项
        var cho = ""
        for (var j = 0; j < vi[i].choices.length; j++) {
          cho += me.data.ans_id[j] + '.' + vi[i].choices[j]
          if (j != vi[i].choices.length - 1)
            cho += '-'
        }
        vi[i].choice = cho
      } else {
        //填空选项为空
        vi[i].choice = ""
      }

      if (vi[i].questionType != 3) {
        //输出单选多选的答案
        vi[i].answer = vi[i].answers[0]

      } else {
        //输出填空题的答案
        var ans = ""
        for (var j = 0; j < vi[i].answers.length; j++) {
          ans += vi[i].answers[j]
          if (j != vi[i].answers.length - 1)
            ans += '-'
        }
        vi[i].answer = ans
      }
    }

    //(待修改)将testList和name保存到服务器,页面自动返回上层
    var serverUrl = app.serverUrl;
    var courseTaskId = me.data.courseTaskId;
    var endTime = me.data.date;
    console.log('courseTaskId', courseTaskId);
    wx.request({
      url: serverUrl + '/task/publishCourseTask',
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        courseId: me.data.courseId,
        courseTaskId: courseTaskId,
        taskTitle: me.data.name,
        questionList: JSON.stringify(vi),
        deleteIds: JSON.stringify(me.data.deleteIds),
        endTime: endTime
      },
      dataType: "json",
      success: function(res) {
        //  var data = JSON.parse(res.data);
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        if (res.data.status == 200) {
          wx.showToast({
            title: '发布作业成功',
          })
          setTimeout(function() {
            wx.navigateBack({

            })
          }, 1500)

        } else {
          wx.showToast({
            title: '发布作业失败!~~',
            icon: "success"
          });
        }

      },
      fail: function() {
        wx.showToast({
          title: '网络访问超时...',
          icon: 'none'
        })
      }
    })


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
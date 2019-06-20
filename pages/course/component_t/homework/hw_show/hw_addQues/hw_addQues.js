// pages/course/component_t/homework/hw_edit/hw_addQues/hw_addQues.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,//当前是题目type
    myindex:"",//第几题
    ans_id: [ //答案的ABCD
      "A", "B", "C", "D", "E", "F", "G"
    ],
    blank_id: [ //答案的ABCD
      "第一空答案", "第二空答案", "第三空答案", "第四空答案", "第五空答案", "第六空答案", "第七空答案"
    ],
    objectArray: [{//问题类型
      id: 1,
      name: '单选题'
    },
    {
      id: 2,
      name: '多选题'
    },
    {
      id: 3,
      name: '填空题'
    }
    ],
    radioArray: [//单选行(2)
      {
      },
      {
      }
    ],
    checkboxArray: [//多选行(2)
      {
      },
      {
      }
    ],
    blankArray: [//填空行(1)
      {
      }
    ],
    /**
     * testList[数据结构
     * {
          question_id: 1,
          question_type: 0, 
          question_desc: "问题描述",
          choicess: [
            "选项1", "选项2", "选项3"
          ],
          answerss: ["A"], //answers[0]
          answers
     * }
     * ]
     */
    question:{
      questionId: "",
      questionType: "",
      questionDesc: "",
      choices: [],
      answers: [""], //answers[0],
      answer:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      myindex:options.index
    })
  },
  bindPickerChange: function (e) {
    var update = this.data.question
    update.answers = [""]
    this.setData({
      index: e.detail.value,
      question: update,
      checked: ''
    })
    
  },
  radioChange:function(e){
    var edit = this.data.question
    edit.answers[0] = e.detail.value
    this.setData({
      question: edit
    })
  },
  checkboxChange:function(e){
    var edit = this.data.question
    // edit.answers[0] = e.detail.value.sort()
    // this.setData({
    //   question: edit
    // })
    edit.answers[0]=""
    var val = e.detail.value.sort()
    for(var i =0;i<e.detail.value.length;i++){
      edit.answers[0] += val[i]
    }
    edit.answers[0] = edit.answers[0]
    this.setData({
      question: edit
    })
  },
  //继续创建下一题
  GetSingle:function(e){
    var that = this
    if(e.detail.target.dataset.set=="0"){
 
      if (e.detail.value.textarea == "") {
        wx.showToast({
          title: '问题描述不可为空',
          icon: "none"
        })
        return false
      }
      var temp = that.data.question
      temp.questionDesc = e.detail.value.textarea
      temp.questionType = this.data.index*1 + 1
      
      that.setData({
        question: temp
      })

      if (this.data.question.answers[0] == "") {
        wx.showToast({
          title: '请选择正确答案',
          icon: "none"
        })
        return false
      }
      var temp = this.data.question
      temp.choices = [""]
      var length = 0
      if (this.data.index == 0)
        length = this.data.radioArray.length
      else if (this.data.index == 1)
        length = this.data.checkboxArray.length
      for (var i = 0; i < length; i++) {
        if (e.detail.value[i] == "") {
          wx.showToast({
            title: '请填写第' + (i + 1) + '项选项',
            icon: "none"
          })
          return false
        }
        else {
          temp.choices[i] = e.detail.value[i]
        }
      }
      this.setData({
        question: temp
      })
      let pages = getCurrentPages()
      let pre = pages[pages.length - 2]
      var testList = pre.data.testList
      testList.push(this.data.question)

      pre.setData({
        testList: testList
      })
      
      var myindex = this.data.myindex*1 +1
      var update = this.data.question
      update.answers = [""]
      this.setData({
        myindex: myindex,
        question:update,
        checked:"",
        form_info:"",
        testList:{}
      })
      wx.showToast({
        title: '添加成功',
      })
    }
    else if (e.detail.target.dataset.set == "1"){
      if (e.detail.value.textarea == "") {
        wx.navigateBack({
          
        })
        return false
      }
      var temp = that.data.question
      temp.questionDesc = e.detail.value.textarea
      temp.questionType = this.data.index*1 +1
      that.setData({
        question: temp
      })
      if (this.data.question.answers[0] == "") {
        wx.navigateBack({

        })
        return false
      }
      var temp = this.data.question
      temp.choices = [""]
      var length = 0
      if (this.data.index == 0)
        length = this.data.radioArray.length
      else if (this.data.index == 1)
        length = this.data.checkboxArray.length
      for (var i = 0; i < length; i++) {
        if (e.detail.value[i] == "") {
          wx.navigateBack({

          })
          return false
        }
        else {
          temp.choices[i] = e.detail.value[i]
        }
      }
      this.setData({
        question: temp
      })
      let pages = getCurrentPages()
      let pre = pages[pages.length -2]
      var testList = pre.data.testList
      testList.push(this.data.question)

      pre.setData({
        testList: testList
      })
      wx.showToast({
        title: '添加成功',
      })
      setTimeout(function(){
        wx.navigateBack({

        })
      },1500)
     
    }
  },
  GetBlank:function(e){
    var that = this
    if (e.detail.target.dataset.set == "0") {
      if (e.detail.value.textarea == "") {
        wx.showToast({
          title: '问题描述不可为空',
          icon: "none"
        })
        return false
      }
      var temp = that.data.question
      temp.questionDesc = e.detail.value.textarea
      temp.questionType = this.data.index*1 +1
      that.setData({
        question: temp
      })

      var temp = this.data.question
      temp.answers = [""]
      var length = this.data.blankArray.length     
      for (var i = 0; i < length; i++) {
        if (e.detail.value[i] == "") {
          wx.showToast({
            title: '请填写第' + (i + 1) + '项答案',
            icon: "none"
          })
          return false
        }
        else {
          temp.answers[i] = e.detail.value[i]
        }
      }
      this.setData({
        question: temp
      })
      
      let pages = getCurrentPages()
      let pre = pages[pages.length - 2]
      var testList = pre.data.testList
      testList.push(this.data.question)

      pre.setData({
        testList: testList
      })

      var myindex = this.data.myindex * 1 + 1
      this.setData({
        myindex: myindex,
        checked: "",
        form_info: ""
      })
      wx.showToast({
        title: '添加成功',
      })
    }
    else if (e.detail.target.dataset.set == "1") {
      if (e.detail.value.textarea == "") {
        wx.navigateBack({

        })
        return false
      }
      var temp = that.data.question
      temp.questionDesc = e.detail.value.textarea
      temp.questionType = this.data.index*1 +1
      that.setData({
        question: temp
      })

      var temp = this.data.question
      temp.answers = [""]
      var length = this.data.blankArray.length
      for (var i = 0; i < length; i++) {
        if (e.detail.value[i] == "") {
          wx.navigateBack({
            
          })
          return false
        }
        else {
          temp.answers[i] = e.detail.value[i]
        }
      }
      this.setData({
        question: temp
      })
      

      let pages = getCurrentPages()
      let pre = pages[pages.length - 2]
      var testList = pre.data.testList
      testList.push(this.data.question)

      pre.setData({
        testList: testList
      })
      wx.showToast({
        title: '添加成功',
      })
      setTimeout(function () {
        wx.navigateBack({

        })
      }, 1500)

    }
  },
  /**
   * 删除和添加事件
   */
  additem: function (e) {
    if (e.currentTarget.id == 1) {
      var that = this.data.radioArray
    } else if (e.currentTarget.id == 2) {
      var that = this.data.checkboxArray
    }
    else if (e.currentTarget.id == 3) {
      var that = this.data.blankArray
    }
    else {
      wx.showToast({
        title: '系统错误',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    //添加选项
    if (that.length == 7) {
      wx.showToast({
        title: '最多添加7个选项',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    else {
      var temp = that
      temp.push({})
      if (e.currentTarget.id == 1) {
        this.setData({
          radioArray: temp
        })
      }
      else if (e.currentTarget.id == 2) {
        this.setData({
          checkboxArray: temp
        })
      }
      else if (e.currentTarget.id == 3) {
        this.setData({
          blankArray: temp
        })
      }
    }

  },
  delitem: function (e) {
    if (e.currentTarget.id == 1) {
      var that = this.data.radioArray
    } else if (e.currentTarget.id == 2) {
      var that = this.data.checkboxArray
    } else if (e.currentTarget.id == 3) {
      var that = this.data.blankArray
    }
    else {
      wx.showToast({
        title: '系统错误',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    //删除选项
    if (that.length == 2 && this.data.index != 2) {
      wx.showToast({
        title: '最少保留2个选项',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    else if (that.length == 1 && this.data.index == 2) {
      wx.showToast({
        title: '最少保留1个选项',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    else {
      var temp = that
      temp.pop({})
      if (e.currentTarget.id == 1) {
        if (this.data.question.answers[0] == this.data.ans_id[that.length]){
          var edit = this.data.question
          edit.answers[0]=""
          this.setData({
            question:edit
          })
        }
        this.setData({
          radioArray: temp
        })
      }
      else if (e.currentTarget.id == 2) {
        if (this.data.question.answers[0].charAt(this.data.question.answers[0].length - 1) == this.data.ans_id[that.length]) {
          var edit = this.data.question
          edit.answers[0] = edit.answers[0].substr(0, edit.answers[0].length - 1);  
          this.setData({
            question: edit
          })
        }
        this.setData({
          checkboxArray: temp,
        })
      }
      else if (e.currentTarget.id == 3) {
        this.setData({
          blankArray: temp
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
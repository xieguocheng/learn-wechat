const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myCourseImg: "",
    myCourseName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var myCourseName = options.myCourseName;
    var myCourseImg = options.myCourseImg;
    this.setData({
      myCourseName: myCourseName,
      myCourseImg: myCourseImg
    })
  },

  chooseCourseImg: function() {
    var me = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        var courseId = me.data.courseId;
        console.log(tempFilePaths);

        wx.showLoading({
          title: '上传中...',
        })
        var serverUrl = app.serverUrl;

        wx.uploadFile({
          url: serverUrl + '/course/uploadCourseImg', 
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'application/json', // 默认值
          },

          success: function(res) {
            var data = JSON.parse(res.data);
            console.log(data);
            wx.hideLoading();
            if (data.status == 200) {
              wx.showToast({
                title: '上传成功!~~',
                icon: "success"
              });

              var imageUrl = data.data;
              //显示当前选中的封面
              me.setData({
                myCourseImg: imageUrl
              });

            } else if (data.status == 500) {
              wx.showToast({
                title: data.msg
              });
            }

          }

        })
        console.log('kkkkk')
      }
    })
  },

  //修改课程基本信息
  modifyCourseBaseMsg: function(e) {
    var me = this;

    //伪数据(测试)
    var courseId = app.getGlobalMyCourseInfo().courseId;

    //获取封面路径
    var courseImg = me.data.myCourseImg;

    //获取表单数据
    var courseName = e.detail.value.courseName;
    console.log("courseName:" + courseName);

    if (courseImg == null || courseImg == "" || courseName == null || courseName == "") {
      wx.showToast({
        title: '修改内容不能为空...',
        icon: 'none',
        duration: 2000
      })
    } else {
    //确定保存
    wx.showModal({
      title: '提示',
      content: '是否保存？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')

          // 保存课程
          wx.showLoading({
            title: '保存中...',
          })
          var serverUrl = app.serverUrl;
          wx.request({
            url: serverUrl + '/course/modifyCourseBaseMsg?courseId=' + courseId + '&courseName=' + courseName + '&courseImg=' + courseImg,
            method: "POST",
            success: function(res) {
              wx.hideLoading();
              app.setGlobalMyCourseName(courseName);
              app.setGlobalMyCourseImg(courseImg);
              app.setGlobalIfModify(true);
              app.setGlobalIfCreate(true);//返回刷新首页
             // console.log(app.get);
              wx.navigateBack({ 
                delta: 1,
              })
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  }

})
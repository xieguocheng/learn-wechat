const app = getApp()

Page({

  data: {
    courseImg: "../../img/add.jpg",  
    isJoin:1,
    courseId:"424245",
    myCourseInfo:{}
  },

  onLoad: function (options) {
    var me = this;
    var isJoin = me.data.isJoin;
    console.log(isJoin)
  },

  chooseCourseImg: function (){
    var me = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
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
          
          success: function (res) {
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
                courseImg: imageUrl
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

//创建课程
  createCourse: function(e){
    var me = this;
    var userId = wx.getStorageSync("userInfo").userId;

    //获取封面路径
    var courseImg = me.data.courseImg;

    //获取表单数据
    var courseName = e.detail.value.courseName;
    var isJoin = me.data.isJoin;
    console.log("courseName:" + courseName);

    if (courseName == null || courseName == "") {
      wx.showToast({
        title: '课程名称不能为空...',
        icon: 'none',
        duration: 2000
      })
    } else {
      //确定保存
      wx.showModal({
        title: '提示',
        content: '是否保存？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')

            // 创建课程
            wx.showLoading({
              title: '创建中...',
            })
            var serverUrl = app.serverUrl;

            wx.request({
              url: serverUrl + '/course/createCourse?userId=' + userId + '&courseName=' + courseName + '&courseImg=' + courseImg + "&added=" + isJoin,
              method: "POST",
              success: function (res) {
                wx.hideLoading();
                wx.hideNavigationBarLoading();
                console.log(res.data);
                app.setGlobalIfCreate(true); 
                me.setData({
                  myCourseInfo: res.data.data
                })
                app.setGlobalMyCourseInfo(me.data.myCourseInfo);

                wx.showToast({
                  title: '创建成功',
                  success(ee){
                    setTimeout(function(){
                      wx.navigateTo({
                        url: '/pages/tabbar_t/tabbar_t',
                      })
                    },1500)
                  }
                })
               
              }
            })

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
  }

  },

  joinCourse: function(){
    var me = this;
    var isJoin = me.data.isJoin;
    
    if (isJoin==1){
      me.setData({
        isJoin:0,
      })
    }
    else{
    me.setData({
      isJoin: 1,
    })
    }
    console.log(me.data.isJoin);
  }

})


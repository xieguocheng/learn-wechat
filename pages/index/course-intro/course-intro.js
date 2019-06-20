const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgWidth: wx.getSystemInfoSync().windowWidth *0.9 ,
    imgHeight: wx.getSystemInfoSync().windowWidth / 1.77 ,

    course:{},
    serverUrl: ""
  },
  join:function()
  {
    var classnum = this.data.course.classnum;
    console.log(classnum)
    var userInfo = wx.getStorageSync("userInfo");
    console.log(userInfo.userId);
    var userId = userInfo.userId;
    wx.showModal({
      title: '提示',
      content: '你确定加入这个帮课吗',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.serverurl + 'course/addcoursebyclassnumanduserid?userId=' + userId + '&classnum=' + classnum,
            method: "POST",
            success: function (ress) {
            
              wx.showToast({
                title: ress.data.data.data,
                icon: "none",
                duration: 3500
              })
              if (ress.data.data.data == "加入班课成功") {
                wx.showToast({
                  title: ress.data.data.data,

                  duration: 1500
                })
                setTimeout(function(){
                  wx.reLaunch({
                    url: '/pages/course/course',
                  })
                },1500)
              
                

              }
            }
          })


        } else {
          console.log('用户点击取消')

        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var me = this;
    // 获取上一个页面传入的参数
    var courseInfo = JSON.parse(params.courseInfo);

    var serverUrl = app.serverUrl;
    wx.request({
      url: serverUrl + '/course/showCourseById?courseId=' + courseInfo.courseId,
      method: 'GET',
      success: function (res) {
        console.log(res.data);

        var course = res.data.data;
console.log(course)
        me.setData({
          course: course
        });
      }
    })
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
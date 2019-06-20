// pages/index/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courselist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  to:function(e)
  {
    var me = this;
    var courselist = me.data.courselist;
    var arrindex = e.currentTarget.dataset.index;
    if (courselist[arrindex].classnum==null)
    {
      //跳转学生
      app.courseId = courselist[arrindex].courseId;
      app.courseInfo = courselist[arrindex];
      var courseInfo = JSON.stringify(courselist[arrindex]);

      console.log(app.courseId)
      wx.navigateTo({

        url: '/pages/tabbar/tabbar?courseInfo=' + courseInfo
      })

    }
    else{
      //等待修改
      // 跳转老师

      var courselist = me.data.courselist;
      var arrindex = e.currentTarget.dataset.index;

      app.setGlobalMyCourseInfo(courselist[arrindex]);
      console.log(app.getGlobalMyCourseInfo());
      wx.navigateTo({
        url: '/pages/tabbar_t/tabbar_t' ,
      })


    }
  },
  search: function(e) {
    var me = this;
    var formObject = e.detail.value;
    var coursename = formObject.coursename;
    var userinfo = wx.getStorageSync("userInfo");
    var userId = userinfo.userId;
    wx.request({
      url: app.serverurl + 'course/searchcourse?userId=' + userId + '&coursename=' + coursename,
      method: "POST",

      success: function(res) {

        var courselist = res.data.data.data;
        console.log(courselist);
        me.setData({
          courselist: courselist
        });

      }
    });
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
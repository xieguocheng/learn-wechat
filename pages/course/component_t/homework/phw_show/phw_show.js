const app = getApp()
// pages/course/component_t/homework/phw_show/phw_show.js
Page({
  /**
   * 页面的初始数据 
   */
  data: {
    courseTaskId:0,
    stuT: [
    //   {//已经提交的学生
    //   userId: 2,
    //   userName: '谢国城',
    //   grade:66,
    //   status: 1
    // },
    // {
    //   userId: 4,
    //   userName: '蒸铃声',
    //   grade: 33,
    //   status: 1
    // }
    ],
    stuF: [
    //   {//没有提交的学生
    //   userId: 1,
    //   userName: '许伟杰',
    //   grade: 0,
    //   status: 0
    // },
    // {
    //   userId: 3,
    //   userName: '肖展洲',
    //   grade: 0,
    //   status: 0
    // },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  toOverview: function(e){
    var stuName = this.data.stuT[e.currentTarget.dataset.index].username
    var grade = this.data.stuT[e.currentTarget.dataset.index].grade
    wx.navigateTo({
      //使用学生姓名进行跳转,可能需要结合课程ID作业ID获取学生这项作业的详情
      url: 'phw_overview/phw_overview?stuName=' + stuName + "&grade=" + grade + "&courseTaskId=" + this.data.courseTaskId + "&userId=" + this.data.stuT[e.currentTarget.dataset.index].userId,
    })
  },

  onLoad: function (options) {
    var me = this;
    wx.setNavigationBarTitle({
      title: options.name,
    })

    wx.showLoading({
      title: '请等待，加载中...',
    });
    var serverUrl = app.serverUrl;
    wx.request({
      url: serverUrl + '/task/showAllStudents?courseTaskId=' + options.courseTaskId,
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        console.log(res.data.data[0]);

        me.setData({
          stuT: res.data.data[0],
          stuF: res.data.data[1],
          courseTaskId: options.courseTaskId
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
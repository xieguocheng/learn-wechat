// pages/my/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    help:[
      {
        desc:"怎么加入课程"
      },
      {
        desc: "怎么创建课程"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toHelp:function(e){
    wx.navigateTo({
      url: '/pages/my/help/help_detail/help_detail?index=' + e.currentTarget.dataset.set + '&desc=' + this.data.help[e.currentTarget.dataset.set].desc,
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
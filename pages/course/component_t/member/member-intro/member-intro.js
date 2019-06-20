// pages/course/component_t/member/member-intro/member-intro.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var me = this;
    // 获取上一个页面传入的参数
    var studentInfo = JSON.parse(params.studentInfo);
    me.setData({
      studentInfo: studentInfo
    });
    
  }

  
})
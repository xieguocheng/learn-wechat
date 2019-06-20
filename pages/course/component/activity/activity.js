// pages/course/component/activity/activity.js 

var time = require('../../../../utils/util.js');
const app = getApp()
Component({

  /**
   * 页面的初始数据
   */
  data: {
    experimentinfolist: [],
    activity: []
  },
  attached: function(e) {
   
    console.log("activity");
    var info = app.courseInfo;

    var userInfo = wx.getStorageSync("userInfo");
    var userId = userInfo.userId;
    var courseId = info.courseId;
    var me = this;

    wx.request({
      url: app.serverurl +'courseExperiment/queryExperimentbycourseidanduserid?userId=' + userId + '&courseId=' + courseId,
      method: "POST",
 success: function(res) {
        var experimentinfolist = res.data.data.data;
        console.log(experimentinfolist);

        
        me.setData({
          activity: experimentinfolist
        });
 
  
      }
    })

  },


  methods: {
    onLoad: function(e) {
      wx.setNavigationBarTitle({
        title: '计算机网络',
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

    },
    toExperiment: function(e) {

      var me = this;
      var inedx = e.currentTarget.dataset.index;
      console.log(inedx);
      var experimentlist = this.data.activity;
      console.log(experimentlist[inedx]);
      var experimentInfo = JSON.stringify(experimentlist[inedx]);
      wx.navigateTo({
        url: '/pages/course/component/activity/experiment/experiment?experimentInfo=' + experimentInfo
      })
    }
  },
  properties: {
    /*这里拿来设置参数,小老弟 */
    courseInfo: {
      type: JSON
    }
  }
})
// pages/course/course.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //搜索词
    myCourseInfo:{},
    searchContent: "",
    choosecourseList: [],
    creatcourseList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  toMyCourse: function (e) {
    var me = this;
    var creatcourseList = me.data.creatcourseList;
    var arrindex = e.currentTarget.dataset.index;
    console.log(creatcourseList[arrindex]);
   
    app.setGlobalMyCourseInfo(creatcourseList[arrindex]);
    console.log(app.getGlobalMyCourseInfo());
    wx.navigateTo({
      url: '/pages/tabbar_t/tabbar_t',
    })
  },
  onLoad: function(params) {
    var me = this;
    var userInfo = wx.getStorageSync("userInfo");
    var userId = userInfo.userId;
    wx.request({
      url: app.serverurl+'course/querycreatecoursebyid?userId=' + userId,
      method: "POST",
      data: {

      },
      success: function(res) {
        console.log(res.data);

        var creatcourseList = res.data.data.data;
        console.log(creatcourseList);
        me.setData({
          creatcourseList: creatcourseList
        });

      }
    });
    me.getchooseList();
    console.log('课程',this.data)
  },
  getchooseList: function() {
    var me = this;
    var userInfo = wx.getStorageSync("userInfo");
    var userId = userInfo.userId;
    wx.request({
      url: app.serverurl+'course/queryallcoursebyid?userId=' + userId,
      method: "POST",
      success: function(res) {
        console.log(res.data);
        var choosecourseList = res.data.data.data;
        console.log(choosecourseList);
        me.setData({
          choosecourseList: choosecourseList
        });

      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  to: function(e) {
    var me = this;
    var choosecourseList = me.data.choosecourseList;
    var arrindex = e.currentTarget.dataset.index;
    console.log(choosecourseList[arrindex]);
    app.courseId = choosecourseList[arrindex].courseId;
    app.courseInfo = choosecourseList[arrindex];
    var courseInfo = JSON.stringify(choosecourseList[arrindex]);

    console.log(app.courseId)
    wx.navigateTo({

      url: '/pages/tabbar/tabbar?courseInfo=' + courseInfo
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad("");
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
  toSearch: function() {
    
  },
  toSearch: function (e) {
    wx.navigateTo({
      url: 'search/search',
    })
  },
  toAdd: function(e) {
    wx.showActionSheet({
      itemList: ["创建课程", "加入课程"],
      success: function(e) {
        if (e.tapIndex == 0) {
          wx.navigateTo({
            url: '../create/create',
          })
        } else if (e.tapIndex == 1) {
          wx.navigateTo({
            url: '../join/join',
          })
        }
      }
    })
  }
})
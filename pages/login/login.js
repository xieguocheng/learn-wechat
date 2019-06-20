// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {

    this.doLogin();

  },

  doLogin: function(e) {
    var me = this;
    //  如果token存在，发到后端检验
    var token = wx.getStorageSync("token")
    var userInfo = wx.getStorageSync("userInfo")
    console.log("token为:" + token)
    if (token || userInfo || userInfo==null || token==null) {
      console.log("如果token存在,发到后端检查");
      wx.request({
        url: app.serverurl +'check?token=' + token,
        method: "post",
        success: function(result) {
          console.log(result);
          var state = result.data.data;
          console.log(state)
          if (state == "未过期") {

            wx.switchTab({
              url: "/pages/index/index",
            })
          } else {
            wx.removeStorageSync("token");
            wx.removeStorageSync("userInfo");
            me.doLogin();
          }
        }
      })


    } else {
      console.log(e.detail.errMsg);
      console.log(e.detail.userInfo);
      console.log("过期或者第一次登录走这里")
      //微信用户信息
      var wxinfo = e.detail.rawData;
      console.log(wxinfo);
      wx.login({
        success: function(res) {
          //获取登录的临时凭证
          console.log(res);
          var code = res.code;
          wx.request({
            url: app.serverurl + 'wxLogin?code=' + code,
            method: "post",
            success: function(result) {
              console.log(result);
              var token = result.data.data;
              console.log(token)
              //拿到微信用户信息把他的信息传过去，包括
              wx.request({
                url: app.serverurl +'inputuser',
                method: "POST",
                data: {

                  avatarUrl: e.detail.userInfo.avatarUrl,
                  city: e.detail.userInfo.city,
                  country: e.detail.userInfo.country,
                  gender: e.detail.userInfo.gender,
                  language: e.detail.userInfo.language,
                  nickName: e.detail.userInfo.nickName,
                  province: e.detail.userInfo.province,
                  openid: token
                },
                success: function(res) {
                  console.log(res);
                  console.log(res.data)
                }
              });
              wx.setStorageSync("token", token);
              console.log(wx.getStorageSync("token"));
              //待修改，获取user

              wx.request({
                url: app.serverurl +'getuser?token=' + token,
                method: "POST",
                success: function(res) {

                  var userinfo = res.data.data;
                 
                  console.log(userinfo);
                  wx.setStorageSync("userInfo", userinfo)
                }
              });


              wx.switchTab({
                url: "/pages/index/index",
              })
            }
          })
        }
      })

    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {

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
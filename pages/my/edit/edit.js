// pages/my/edit/edit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uinfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    var me = this;
    var userInfo = wx.getStorageSync("userInfo");
    var userId = userInfo.userId;
    wx.request({

      url: app.serverurl + 'user/queryuser?userId=' + userInfo.userId,
      method: 'POST',

      success: function(res) {
        console.log(res)
        console.log(res.data.data)
        me.setData({
          uinfo: res.data.data
        })
      }
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
  submituser: function(e) {
    console.log(e);
    var formObject = e.detail.value;
    var username = formObject.username;
    var email = formObject.email;
    var number = formObject.number;
    var school = formObject.school;
    var telephone = formObject.telephone;
    var email = formObject.email;
    var password = formObject.password;
   
    var userInfo = wx.getStorageSync("userInfo");
    console.log(email)
    if(username ==""||email==""||number==""||telephone==""||password==""){
      wx.showToast({
        title: '请填写所有信息',
        icon:'none'
      })
      return false
    }
    else{
      wx.showLoading({
        title: '请稍后...',
      })
      wx.request({

        url: app.serverurl + 'user/updatauserbyid?userId=' + userInfo.userId,
        method: 'POST',
        data: {
          username: username,
          email: email,
          number: number,
          telephone: telephone,
          email: email,
          password: password

        },
        success: function (res) {

       
          wx.hideLoading();
          var status = res.data.status;
          console.log(status);
          if (status == 200) {
            wx.showToast({
              title: "修改成功",
              icon: 'none',
              success(ress) {
              
                  setTimeout(function(){
                    wx.reLaunch({
                      url: '/pages/index/index',
                    })
                  },1500)
                
              }
            })
          
            
          } else if (status == 500) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 3000
            })
          }
          // me.setData({

          // });

        }
      })
      
    }
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
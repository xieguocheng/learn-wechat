// pages/course/component/activity/experiment/experiment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    experimentInfo: {},
    urllist: [],
    mylist:[]
  },
  open: function(e) {
    var arrindex = e.currentTarget.dataset.index;
    console.log(arrindex);
    var url = this.data.urllist[arrindex].url;

    if(this.data.urllist[arrindex].type=="doc")
    {
    wx.downloadFile({
      url: url,
      success: function(res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          fileType: "doc",
          success: function(res) {
            console.log('打开文档成功')
          }
        })
      }
    })
    }
    if (this.data.urllist[arrindex].type == "docx") {
      wx.downloadFile({
        url: url,
        success: function (res) {
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            fileType: "docx",
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
      })
    }
    if (this.data.urllist[arrindex].type == "xls") 
    {
      wx.downloadFile({
        url: url,
        success: function (res) {
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            fileType: "xls",
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
      })
    }
    if (this.data.urllist[arrindex].type == "ppt") {
      console.log()
      wx.downloadFile({
        url: url,
        success: function (res) {
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            fileType: "ppt",
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
      })
    }
    if (this.data.urllist[arrindex].type == "pdf") {
      console.log()
      wx.downloadFile({
        url: url,
        success: function (res) {
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            fileType: "pdf",
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
      })
    }
  },
  toopen: function (e) {
    var arrindex = e.currentTarget.dataset.index;
    console.log(arrindex);
    var url = this.data.mylist[arrindex].url;

    if (this.data.mylist[arrindex].type == "doc") {
      wx.downloadFile({
        url: url,
        success: function (res) {
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            fileType: "doc",
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
      })
    }
    if (this.data.mylist[arrindex].type == "docx") {
      wx.downloadFile({
        url: url,
        success: function (res) {
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            fileType: "docx",
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
      })
    }
    if (this.data.mylist[arrindex].type == "xls") {
      wx.downloadFile({
        url: url,
        success: function (res) {
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            fileType: "xls",
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
      })
    }
    if (this.data.mylist[arrindex].type == "ppt") {
      console.log()
      wx.downloadFile({
        url: url,
        success: function (res) {
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            fileType: "ppt",
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
      })
    }
    if (this.data.mylist[arrindex].type == "pdf") {
      console.log()
      wx.downloadFile({
        url: url,
        success: function (res) {
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            fileType: "pdf",
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(params) {

    var me = this;
    var experimentInfo = JSON.parse(params.experimentInfo);
    console.log(experimentInfo);
    me.setData({
      experimentInfo: experimentInfo
    });
    var url = experimentInfo.courUrl;

    var userurl = experimentInfo.userUrl;

    url = decodeURIComponent(url);

    userurl = decodeURIComponent(userurl);

    var arr = url.split(",");


    var userarr = userurl.split(",");




    for (var ar in arr) {
      
      var wangzhi = "http://learn.wushirui.cn"
      console.log(arr[ar]);
      //截取文件名 a=信息科学技术学院学生通讯录.xls
      var a = arr[ar].substring(wangzhi.length+33, arr[ar].length);
      //截取格式 type=xls 
      var typearr = a.split(".");
      var type = typearr[typearr.length - 1];
      console.log(type);
      var documentdetail = {
        type: type,
        documentname: a,
        url: arr[ar]
      }
      if (me.data.urllist == null) {
        me.setData({
          urllist: documentdetail
        })
      } else {
        var newurllist = me.data.urllist.concat(documentdetail)
        me.setData({
          urllist: newurllist
        })
      }


    }



    for (var ar in userarr) {
      var wangzhi = "http://learn.wushirui.cn"
      console.log(userarr[ar]);
      //截取文件名 a=信息科学技术学院学生通讯录.xls
      var a = userarr[ar].substring(wangzhi.length + 33, userarr[ar].length);
      //截取格式 type=xls 
      var typearr = a.split(".");
      var type = typearr[typearr.length - 1];
      console.log(type);
      var documentdetail = {
        type: type,
        documentname: a,
        url: userarr[ar]
      }
      if (me.data.mylist == null) {
        me.setData({
          mylist: documentdetail
        })
      } else {
        var newmylist = me.data.mylist.concat(documentdetail)
        me.setData({
          mylist: newmylist
        })
      }


    }





    console.log('实验', this.data.experimentInfo)
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
// pages/course/component_t/homework/phw_show/phw_overview/look_ques/look_ques.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: '',
    ans_id: [ //答案的ABCD
      "A", "B", "C", "D", "E", "F", "G"
    ],
    blank_id: [ //答案的ABCD
      "第一空答案", "第二空答案", "第三空答案", "第四空答案", "第五空答案", "第六空答案", "第七空答案"
    ],
    myBlank_id: ["第一空", "第二空", "第三空", "第四空", "第五空", "第六空", "第七空"],
    type: [
      "单选题", "多选题", "填空题"
    ],
    ques: [],//显示的题目
    quesList: []//所有题目
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



    wx.setNavigationBarTitle({
      title: options.navTitle,
    })
    //待修改,使用base64进行解析
    var list = JSON.parse(decodeURIComponent(options.list))
console.log(list)
    this.setData({
      quesList: list,
      index: options.index,
      ques: list[options.index]
    })

  },
  switchQues: function (e) {
    var temp = this.data.quesList[e.currentTarget.dataset.set]
    this.setData({
      ques: temp,
      index: e.currentTarget.dataset.set
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
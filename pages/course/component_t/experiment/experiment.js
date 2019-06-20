const app = getApp()
// pages/course/component/detail/detail.js
Component({
  /**
   * 页面的初始数据
   */
  data: {
    courseId:"424245",
    totalExperiments:0,
    exList: [
      // {
      //   courseId:"",
      //   courExperimentId:0,
      //   title:'实验一：制作双绞线11111111111111111111231321211111111111111111111111111111111111111111111111',
      //   detail:'暂未设置实验描述',
      //   courUrl:[],
      //   fileName:[],
      //   score:'100',
      //   status:0,
      //   createTime:"2019-04-19",
      //   endTime:"2019-05-15"
      // },
      // {
      //   courseId: "",
      //   courExperimentId: 1,
      //   title: '实验二：子网划分',
      //   detail: '看视频学习划分子网111111111111111111111111111111111111111111111111111111111111111111',
      //   courUrl: ["http:","http:"],//里面有?会报错
      //   fileName: ["学号_姓名1111111111111111111111111111111111111111111.doc", "实验：如何制作双绞线.ppt","数据.xls"], 
      //   score: '100',
      //   status: 1,
      //   createTime: "2019-05-19",
      //   endTime: "2019-06-30"
      // }
    ]

  },
  pageLifetimes:{
    show(){},
    hide(){}
  },

  attached() {
    var me = this;
    me.getAllExperimentList();

  },
 
  methods: {

    //获取所有课程实验信息
    getAllExperimentList: function () {
      var me = this;
      var serverUrl = app.serverUrl;
      var courseId = app.getGlobalMyCourseInfo().courseId;
      wx.showLoading({
        title: '请等待，加载中...',
      });

      wx.request({
        url: serverUrl + '/experiment/getAllExperimentList?courseId=' + courseId,
        method: "POST",
        success: function (res) {
          wx.hideLoading();
          console.log(res.data);

          var totalExperiments = res.data.data.length;
          var exList = res.data.data;

          me.setData({
            exList: exList,
            totalExperiments: totalExperiments
          });

        }
      })
    },

    toExperiment: function (e) {
      //利用index顺序索引进行进入下一个页面
      var index = e.currentTarget.dataset.set
      wx.navigateTo({
        url: '/pages/course/component_t/experiment/ex_show/ex_show?ex='+JSON.stringify(this.data.exList[index])
      })
  
    },

    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },


  },
  /**
   * 生命周期函数--监听页面加载
   */
  properties: {
    /*这里拿来设置参数,小老弟 */
  }
})
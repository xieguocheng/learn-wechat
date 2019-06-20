let app = getApp()
Component({
  data: {
    taskq: []
  },
  attached: function(e) {

  
    var me = this;
    console.log("exam");
    var info = wx.getStorageSync("userInfo");
    var courseId = info.courseId;
    var userInfo = wx.getStorageSync("userInfo");
    var userId = userInfo.userId;

    //根据课程id还有用id查询所有task
    wx.request({
      url: app.serverurl +'/coursetask/querytaskbycourseidanduserid?userId=' + userId + '&courseId=' + courseId,

      method: "POST",
      success: function(res) {
        var taskinfolist = res.data.data.data;
        console.log(taskinfolist);
        me.setData({
          taskq: taskinfolist
        });

      }
    })

  },
  methods: {

    toExams: function(e) {
      var arrindex = e.currentTarget.dataset.index;
      var info = this.data.taskq[arrindex];
      var taskinfo = JSON.stringify(info);
console.log(info);
      if (info.usertaskstatus==0)
      {
      wx.navigateTo({
        url: '/pages/course/component/question/exam/exam?taskinfo=' + taskinfo,
      })
      }
      else
      {
        wx.navigateTo({
          url: '/pages/course/component/question/phw_overview/phw_overview?taskinfo=' + taskinfo,
        })
      }
    }
  },
  properitys: {

  },
  pageLifetimes: {
    show() {

      //页面被展示重新调用attched的方法
      var me = this;
      var info = app.courseInfo;
      var courseId = info.courseId;
      var userinfo = wx.getStorageSync("userInfo");
      var userId =userinfo.userId;
      //根据课程id还有用id查询所有task
      wx.request({
        url: app.serverurl + '/coursetask/querytaskbycourseidanduserid?userId=' + userId + '&courseId=' + courseId,

        method: "POST",
        success: function(res) {
          var taskinfolist = res.data.data.data;
          me.setData({
            taskq: taskinfolist
          });

        }
      })

    },
    hide() {
      // 页面被隐藏
    }
  }


})
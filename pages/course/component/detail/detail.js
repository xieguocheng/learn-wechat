// pages/course/component/detail/detail.js
const app = getApp()
Component({
  /**
   * 页面的初始数据
   */
  data: {
    teacherinfo: {},
    sss: "",
    info: {},
    intro: [{
        title: "课程简介",
        con: null,
        src: "/img/detail/intro.png"
      },
      {
        title: "学习要求",
        con: null,
        src: "/img/detail/study.png"
      },
      {
        title: "教学进度",
        con: null,
        src: "/img/detail/progess.png"
      },
      {
        title: "考试安排",
        con: null,
        src: "/img/detail/exam.png"
      }
    ],
    classify: [{
        title: "班级",
        desc: null,
        src: "/img/detail/class.png"
      },
      {
        title: "分类",
        desc: null,
        src: "/img/detail/classify.png"

      },
      {
        title: "所属学期",
        desc: null,
        src: "/img/detail/schedule.png"
      }
    ]
  },

  methods: {

    onLoad: function(options) {

    },


    copyId: function() {

      wx.setClipboardData({
        data: "" + this.data.info.classnum,
      })
    
    },
    toTeacherInfo: function() {
      var me = this;
      var teacheruserid = this.data.info.userId;

      wx.request({
        url: app.serverurl +'user/queryuser?userId=' + teacheruserid,
        method: "POST",
        success: function(res) {
          console.log(res.data);

          var info = res.data.data;
          console.log(info);
          var infoss = JSON.stringify(info);
          infoss = encodeURIComponent(infoss);
          console.log(infoss);
          wx.navigateTo({
            url: '/pages/course/component/detail/teacher-intro/teacher-intro?teacherinfo=' + infoss,
          })
        }
      });
    
      
      

    },
    toquit: function() {


      var courseId = this.data.info.courseId;
      var userinfo = wx.getStorageSync("userInfo");
      var userId = userinfo.userId;
      wx.showModal({
        title: '提示',
        content: '你确定退出这个班课吗',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: app.serverurl +'course/quitcourse?userId=' + userId + '&courseId=' + courseId,
              method: "POST",
              success: function(ress) {
                console.log(ress);
                wx.showToast({
                  title: ress.data.data.data,
                  icon: "none",
                  duration: 2500
                })
                if (ress.data.data.data == "退出班课成功") {
                  wx.navigateBack();

                }
              }
            })


          } else {
            console.log('用户点击取消')

          }
        }
      });




    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  attached: function(e) {
    console.log("242");
    var info = app.courseInfo;

    var courseId = info.courseId;
    var me = this;

    wx.request({
      url: app.serverurl +'course/querydetailbycourseid?courseId=' + courseId,
      method: "POST",
      success: function(res) {
        var info = res.data.data.data;
        console.log(info);
        me.setData({
          info: info,
          
          "classify[0].desc": info.classname,
          "classify[1].desc": info.courseTypename,
          "classify[2].desc": info.semeter,
          "intro[0].con": info.introduction,
          "intro[1].con": info.request,
          "intro[2].con": info.speed,
          "intro[3].con": info.examin
        });

      }
    })

  },
  properties: {
    /*这里拿来设置参数,小老弟 */
    courseInfo: {
      type: JSON
    }
  }


})
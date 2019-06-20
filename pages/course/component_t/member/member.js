const app = getApp()
Component({
  data: {
    totalStudents:0,
    courseId: "424245",
    
    studentList: [],
    serverUrl: "",
    studentImg: "../../img/course-s.png"
  },

  attached() {
    var me = this;
    me.getAllStudentList();
 
  },

  methods: {

    //获取所有学生信息
    getAllStudentList: function () {
      var me = this;
      var serverUrl = app.serverUrl;
      var courseId = app.getGlobalMyCourseInfo().courseId;
      wx.showLoading({
      title: '请等待，加载中...',
      });

      wx.request({
        url: serverUrl + '/student/getAllStudents?courseId=' + courseId ,
        method: "POST",
        success: function (res) {
          wx.hideLoading();
          wx.hideNavigationBarLoading();
          wx.stopPullDownRefresh();
          console.log(res.data);

          var totalStudents = res.data.data.length;
          var studentList = res.data.data;

          me.setData({
            studentList: studentList,
            serverUrl: serverUrl,
            totalStudents: totalStudents
          });

        }
      })
    },
    
    toTro: function (e) { 
      var me = this;
      var studentList = me.data.studentList;
      var id = e.currentTarget.dataset.id;
      var studentInfo = (JSON.stringify(studentList[id]));
      wx.navigateTo({
        url: '/pages/course/component_t/member/member-intro/member-intro?studentInfo=' + studentInfo,
      })
    }
  },
  properity: {

  }
})
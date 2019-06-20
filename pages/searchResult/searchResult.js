const app = getApp()

Page({

  data: {
    // 用于分页的属性
    totalPage: 1,
    page: 1,
    courseList: [],
    serverUrl: "",
    coursename: "",
    courseImg: "../../img/course-s.png"
  },

  onLoad: function (params) {
    var me = this;
    //获取当前的分页数
    var page = me.data.page;
    me.setData({
      coursename: params.coursename
    })
    me.getCourseList(page);
  },

  getCourseList: function (page) {
    var me = this;
    var serverUrl = app.serverUrl;
    var coursename = me.data.coursename;
    var page = me.data.page;
    var pageSize = 10;
    //wx.showLoading({
    //title: '请等待，加载中...',
    //});

    wx.request({
      url: serverUrl + '/course/searchCourse',
      data: {
        coursename: coursename,
        page: page,
        pageSize: pageSize
      },
      method: "GET",
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        console.log(res.data);

        //判断当前页page是否是第一页
        if (page == 1) {
          me.setData({
            courseList: []
          });
        }

        var courseList = res.data.data.rows;
        var newCourseList = me.data.courseList;

        me.setData({
          courseList: newCourseList.concat(courseList),
          page: page,
          totalPage: res.data.data.total,
          serverUrl: serverUrl
        });

      }
    })
  },

  onReachBottom: function () {
    
    var me = this;
    var currentPage = me.data.page;
    var totalPage = me.data.totalPage;
    if (currentPage === totalPage) {
      wx.showToast({
        title: '哥！这回真没了...',
        icon: "none"
      })
      return;
    }
    var page = currentPage + 1;
    me.setData({
      page: page
    });
    me.getCourseList(page);
    
  },

  intro: function (e) {
    var me = this;
    var courseList = me.data.courseList;
    var id = e.currentTarget.dataset.id;
    var courseInfo = (JSON.stringify(courseList[id]));
    wx.navigateTo({
      url: '../index/course-intro/course-intro?courseInfo=' + courseInfo
    })
  }

})
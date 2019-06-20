const app = getApp()

Page({

  data: {
    uinfo: {},
    imgUrls: [
      '../../img/swiper/s1.png',
      '../../img/swiper/s2.png',
      '../../img/swiper/s5.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    indicatorColor: '#ddd',
    activeColor: '#24dd82',
    //所有图片的高度
    imgWidth: wx.getSystemInfoSync().windowWidth * 0.95,
    imgHeight: wx.getSystemInfoSync().windowWidth / 1.77,

    coursename: "",
    // 用于分页的属性
    totalPage: 1,
    page: 1,
    courseList: [],
    serverUrl: "",
    courseImg: "../../img/course-d.png",
    lastLength: 0,
    swiper: []
  },

  onShow: function() {
    if (app.getGlobalIfCreate()) {
      this.setData({
        courseList: [],
        totalPage: 1,
        page: 1
      })

      this.onLoad();
      app.setGlobalIfCreate(false);
    }

  },

  onLoad: function() {
    var me = this;
    var userInfo = wx.getStorageSync("userInfo");
    var userId = userInfo.userId;

    //获取当前的分页数
    var page = me.data.page;
    me.getAllCourseList(page);
    me.setData({
      page: page
    })



    wx.request({

      url: app.serverurl + 'user/queryuser?userId=' + userInfo.userId,
      method: 'POST',

      success: function(res) {

        me.setData({
          uinfo: res.data.data
        })
        console.log(res.data)
        if (me.data.uinfo.email == null || me.data.uinfo.password == null) {
          wx.showModal({
            showCancel: false,
            title: '提示',
            content: '完善个人信息以继续使用',
            success(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/my/edit/edit'
                })
              }
            }
          })

        }
      }

    })


  },

  //获取所有课程信息
  getAllCourseList: function(page) {
    var me = this;
    var serverUrl = app.serverUrl;
    var coursename = me.data.coursename;
    var page = me.data.page;
    wx.showLoading({
      title: '正在玩命加载',
    });

    wx.request({
      url: serverUrl + '/course/searchCourse?page=' + page,
      method: "GET",
      success: function(res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        //console.log(res.data.data.rows);
        var lastLength = res.data.data.rows.length;
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
          serverUrl: serverUrl,
          lastLength: lastLength
        });
        //更新swiper
        var swiperNum = 3,
            swiper = []
        if (me.data.courseList.length < 3) {
          swiperNum = me.data.courseList.length
        }
        for (var i = 0; i < swiperNum;i++){
            swiper.push(me.data.courseList[i])
        }
        me.setData({
          swiper:swiper
        })
      }
    })
  },


  onReachBottom: function() {
    var me = this;
    var currentPage = me.data.page;
    var totalPage = me.data.totalPage;
    if (currentPage === totalPage) {
      wx.showToast({
        title: '已经见底了',
        icon: "none"
      })
      return;
    }
    var page = currentPage + 1;
    me.setData({
      page: page
    });
    me.getAllCourseList(page);
  },

  toSearch: function(e) {
    wx.navigateTo({
      url: '../searchCourse/searchCourse',
    })
  },

  intro: function(e) {
    var me = this;
    var courseList = me.data.courseList;
    var id = e.currentTarget.dataset.id;
    var courseInfo = (JSON.stringify(courseList[id]));
    wx.navigateTo({
      url: 'course-intro/course-intro?courseInfo=' + courseInfo
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
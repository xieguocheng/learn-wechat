const app = getApp()

Component({
  /**
   * 页面的初始数据
   */
  data: {
    selectShow: false,//初始option不显示
    nowText: "请选择",//初始内容
    animationData: {},//右边箭头的动画
    courseId: "424245",
    isJoin: 1,
    courseType:1,
    courseTypeList: [],
    load:0,
    myCourseInfo:{},
    username:"",
    myCourseName:"",
    myCourseImg:""
  },

  pageLifetimes: {
    show() {
      console.log('app.getGlobalIfModify', app.getGlobalIfModify)
      if (app.getGlobalIfModify()){
        this.setData({
          myCourseName: app.getGlobalMyCourseName(),
          myCourseImg: app.getGlobalMyCourseImg()
        })
        app.setGlobalIfModify(false);
      }
      console.log('show....')
    }
  },

  attached() {
    //页面首次加载
    var userInfo = wx.getStorageSync("userInfo");
    var username = userInfo.username;
    this.setData({
      username: username,
      myCourseInfo: app.getGlobalMyCourseInfo(),
      courseType: app.getGlobalMyCourseInfo().courseType,
      myCourseName: app.getGlobalMyCourseInfo().courseName,
      myCourseImg: app.getGlobalMyCourseInfo().courseImg,
      isJoin: app.getGlobalMyCourseInfo().added
    })
    console.log('myCourseInfo',this.data.myCourseInfo)
    console.log('myCourseName', this.data.myCourseName)
    console.log('myCourseImg', this.data.myCourseImg)
  },

  methods: {
    onLoad: function (options) {
      
    },

    //结束课程
    endingCourse:function(){
      var me = this;
      console.log("end");
      //确定结束
      wx.showModal({
        title: '提示',
        content: '是否结束班课？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')

            var serverUrl = app.serverUrl;
            wx.request({
              url: serverUrl + '/course/endingCOurse?courseId=' + app.getGlobalMyCourseInfo().courseId,
              method: "POST", 
              success: function (res) {
                wx.hideLoading();
                wx.hideNavigationBarLoading();
                if(res.data.status == 200){
                  wx.showToast({
                    title: '班课已结束',
                    icon: "success"
                  })
                }else{
                  wx.showToast({
                    title: '操作失败，请重试',
                    icon: "none"
                  })
                }
            
              }
            })

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },

    //修改课程详情
    modifyCourseDetails:function(e){
      var me = this;

      //获取表单数据
      var courseId = app.getGlobalMyCourseInfo().courseId;
      var isJoin = me.data.isJoin;
      var courseType = me.data.courseType;

      var classname = e.detail.value.classname;
      var semeter = e.detail.value.semeter;
      var introduction = e.detail.value.introduction;
      var request = e.detail.value.request;
      var examin = e.detail.value.examin;

      if (classname == null || classname == "" || semeter == null || semeter == "" || introduction == null || introduction == "" || request == null || request == "" || examin == null || examin == ""){
        wx.showToast({
          title: '修改内容不能为空...', 
          icon: 'none',
          duration: 2000
        })
      }else{
        //确定保存
        wx.showModal({
          title: '提示',
          content: '是否保存？',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')

              // 保存课程
              wx.showLoading({
                title: '保存中...',
              })
              var serverUrl = app.serverUrl;

              wx.request({
                url: serverUrl + '/course/modifyCourseDetails',
                method: "POST",
                header: { 'content-type': 'application/json' },
                data: {
                  courseId: courseId,
                  classname: classname,
                  courseType: courseType,
                  semeter: semeter,
                  introduction: introduction,
                  request: request,
                  examin: examin,
                  added: isJoin
                },

                success: function (res) {
                  wx.hideLoading();
                  wx.hideNavigationBarLoading();
                  console.log(res.data);
                  app.setGlobalIfCreate(true);//返回刷新首页
                  wx.showToast({
                    title: '保存成功...',
                    icon: 'success',
                    duration: 2000
                  })

                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })

      }

      console.log(isJoin)
    },

    //是否公开课程
    joinCourse: function () {
      var me = this;
      var isJoin = me.data.isJoin;

      if (isJoin == 1) {
        me.setData({
          isJoin: 0,
        })
      }
      else {
        me.setData({
          isJoin: 1,
        })
      }
      console.log(me.data.isJoin);
    },

    copyId: function () {
      wx.setClipboardData({
        data: "" + this.data.myCourseInfo.classnum,
      })
    },
    toTeacherInfo: function () {
      wx.navigateTo({
        url: '/pages/course/component_t/detail/teacher_edit/teacher_edit?myCourseName=' + this.data.myCourseName + '&myCourseImg=' + this.data.myCourseImg,
      })
    },

  　　　//option的显示与否
    selectToggle: function () {
      
      var nowShow = this.data.selectShow;//获取当前option显示的状态
      //创建动画
      var animation = wx.createAnimation({
        timingFunction: "ease"
      })
      this.animation = animation;
      if (nowShow) {
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export()
        })
      } else {
        animation.rotate(180).step();
        this.setData({
          animationData: animation.export()
        })
      }
      this.setData({
        selectShow: !nowShow
      })

      //首次加载课程分类的下拉列表框
      var me = this;
      var load = me.data.load;
      if (load == 0){
      var serverUrl = app.serverUrl;
      wx.request({
        url: serverUrl + '/course/getAllCourseType',
        method: "GET",
        success: function (res) {
          wx.hideLoading();
          wx.hideNavigationBarLoading();
          console.log('courseTypeList',res.data.data)
          me.setData({
            nowText: me.data.nowText,
            courseTypeList: res.data.data,
            load:1
          });

        }
      })
      }
    },
    //设置内容
    setText: function (e) {
      var nowData = this.properties.courseTypeList;//当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties
      var nowIdx = e.target.dataset.index;//当前点击的索引
      var nowText = nowData[nowIdx].name;//当前点击的内容
      //再次执行动画，注意这里一定，一定，一定是this.animation来使用动画
      var courseType = nowData[nowIdx].courseType;
      this.animation.rotate(0).step();
      this.setData({
        courseType: courseType,
        selectShow: false,
        nowText: nowText,
        animationData: this.animation.export()
      })
      console.log(courseType);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  properties: {
    /*这里拿来设置参数,小老弟 */
    propArray: {
      type: Array,
    }
  }
})
let app = getApp()

Page({
  data: {
    currentTab: 3,
    innerText: "123",
    courseInfo:{},
    items: [
      {
        "iconPath": "../../img/question.png",
        "selectedIconPath": "../../img/question-s.png",
        "text": "作业"
      },
      {
        "iconPath": "../../img/activity.png",
        "selectedIconPath": "../../img/activity-s.png",
        "text": "实验"
      },
      {
        "iconPath": "../../img/member.png",
        "selectedIconPath": "../../img/member-s.png",
        "text": "成员"
      },
      {
        "iconPath": "../../img/detail.png",
        "selectedIconPath": "../../img/detail-s.png",
        "text": "课程详情"
      }
    ]
  },
  swichNav: function (e) {
    let that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onLoad: function (option) {
    wx.setNavigationBarTitle({
      title: app.getGlobalMyCourseInfo().courseName,
    })
  }
})

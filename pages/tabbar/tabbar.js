let app = getApp()

Page({
data: {

  courseInfo: {},
  currentTab: 1,
  items: [{
      "iconPath": "../../img/question.png",
      "selectedIconPath": "../../img/question-s.png",
      "text": "题库"
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
swichNav: function(e) {
  let that = this;
  if (this.data.currentTab === e.target.dataset.current) {
    return false;
  } else {
    that.setData({
      currentTab: e.target.dataset.current
    })
  }
},
onLoad: function(params) {
  console.log("tarbar");
  var info = app.courseInfo;
  console.log(info);
  var me = this;
  me.setData({
    courseInfo: info
  });
  
  wx.setNavigationBarTitle({
    title: me.data.courseInfo.coursename,
  })

}




})
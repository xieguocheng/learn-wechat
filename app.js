//app.js
App({

  courseInfo: null,
  courseId: null,
  //serverurl: "http://22159h7z34.iok.la:33867/",
  serverurl:"http://193.112.67.186:8081/",
  serverUrl: "http://193.112.67.186:8080",
  myCourseInfo: {},
  ifCreate: false,
  myCourseName:"",
  myCourseImg:"",
  ifModify: false,

  // "",
  setGlobalIfCreate: function(ifCreate) {
    wx.setStorageSync("ifCreate", ifCreate);
  },

  getGlobalIfCreate: function() {
    return wx.getStorageSync("ifCreate");
  },

  setGlobalIfModify: function (ifModify) {
    wx.setStorageSync("ifModify", ifModify);
  },

  getGlobalIfModify: function () {
    return wx.getStorageSync("ifModify");
  },

  setGlobalMyCourseInfo: function(myCourseInfo) {
    wx.setStorageSync("myCourseInfo", myCourseInfo);
  },

  getGlobalMyCourseInfo: function() {
    return wx.getStorageSync("myCourseInfo");
  },
  setGlobalMyCourseName: function (myCourseName) {
    wx.setStorageSync("myCourseName", myCourseName);
  },

  getGlobalMyCourseName: function () {
    return wx.getStorageSync("myCourseName");
  },
  setGlobalMyCourseImg: function (myCourseImg) {
    wx.setStorageSync("myCourseImg", myCourseImg);
  },

  getGlobalMyCourseImg: function () {
    return wx.getStorageSync("myCourseImg");
  },

  setGlobalUserInfo: function(user) {
    wx.setStorageSync("userInfo", user)
  },
  getGlobalUserInfo: function() {
    return wx.getStorageSync("userInfo")
  },
  globalData: {
    ifCreate: false,
    myCourseInfo: {},
    myCourseName: "",
    myCourseImg: "",
    ifModify: false
  }




})
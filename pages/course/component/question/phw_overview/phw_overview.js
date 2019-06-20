// pages/course/component_t/homework/phw_show/phw_overview/phw_overview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    questionList: [], //题目列表
    grade: '', //本次作业得分
    navTitle: '', //用户
  },
  lookQues: function(e) {
    var index = e.target.dataset.arrindex;
    console.log(index);
    var navTitle = this.data.navTitle;
    var list = JSON.stringify(this.data.questionList)
    console.log(navTitle);
    wx.navigateTo({
      //(待修改)需要使用base64进行传输
      url: 'look_ques/look_ques?index=' + index + '&navTitle= ' + navTitle + '&list=' +  encodeURIComponent(list),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var me = this;
    var taskinfo = JSON.parse(options.taskinfo);
    console.log(taskinfo);
    let app = getApp()
    var userinfo = wx.getStorageSync("userInfo");
    var username = userinfo.username;
    wx.setNavigationBarTitle({
      title: username + "的作业报告",
    })
    var grade = taskinfo.grade;
    var grade = (grade * 1).toPrecision(3);
    console.log("grade=" + grade)

    var questionids = taskinfo.questionListId;

    wx.request({
      url: app.serverurl +'question/queryquerstionlist?questionids=' + questionids,

      method: "POST",
      success: function(res) {

        var questionList = res.data.data.data;
        console.log(questionList);
        var questionans = [];
        var useranswer = taskinfo.answer;
        var userans = useranswer.split('-');
        var qqqqq = [];
        for (var question in questionList) {

          if (questionList[question].answer == userans[question]) {
            var questiongrade = 1;
            var questionf = {
              "questionId": questionList[question].questionId,
              "questionType": questionList[question].questionType,
              "status": questionList[question].status,
              "questionSource": questionList[question].questionSource,
              "questionListId": questionList[question].questionListId,
              "questionGrade": questiongrade,
              "answer": questionList[question].answer,

              "useranswer": userans[question].split(','),
              "type": questionList[question].type,
              "questionDesc": questionList[question].questionDesc,
              "choice": questionList[question].choice,
              "choicelist": questionList[question].choicelist
            };
          } else {
            var questiongrade = 0;
            var questionf = {
              "questionId": questionList[question].questionId,
              "questionType": questionList[question].questionType,
              "status": questionList[question].status,
              "questionSource": questionList[question].questionSource,
              "questionListId": questionList[question].questionListId,
              "useranswer": userans[question].split(','),
              "questionGrade": questiongrade,
              "answer": questionList[question].answer,
              "type": questionList[question].type,
              "questionDesc": questionList[question].questionDesc,
              "choice": questionList[question].choice,
              "choicelist": questionList[question].choicelist
            };
          }
          qqqqq.push(questionf);
        }

        me.setData({
          questionList: qqqqq,
          grade: grade,
          navTitle: username + "的作业报告"
        })
        console.log(me.data.questionList);




      }
    })

    ;

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {
    
  },


})
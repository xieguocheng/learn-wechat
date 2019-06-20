const app = getApp()
Component({
  data: {
    memberinfo: []
  },


  methods: {



    toTro: function(e) {
      var me = this;
      var index = e.currentTarget.dataset.index;
      var info = me.data.memberlist[index];
      
      var memberinfo = JSON.stringify(info);
      memberinfo=encodeURIComponent(memberinfo);
      console.log("userInfo:" + memberinfo);
      wx.navigateTo({
        url: '/pages/course/component/member/member-intro/member-intro?memberinfo='+ memberinfo,
      })
    }
  },
  properties: {
    courseInfo: {
      type: JSON
    }
  },


  attached: function(e) {
    var me = this;
    var courseId = app.courseId;;
    console.log("id:"+courseId);
    wx.request({
      url: app.serverurl +'course/queryallstudentbycourseid?courseId=' + courseId,
      method: "POST",
      success: function(res) {
        console.log(res.data);
        var memberlist = res.data.data.data;
        console.log(memberlist);
        me.setData({
          memberlist: memberlist
        });

      }
    })
    
  },
})
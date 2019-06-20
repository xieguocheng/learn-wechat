const app = getApp()
// pages/course/component_t/experiment/ex_show/ex_show.js
Page({

  /**
   * 页面的初始数据 
   */

  data: {
    type: [""],//文件格式
    experimentInfo:"",
    urllist:[],
    success:false,
    //(待修改)从上个实验中获取实验详情，涉及到json的转换
    exList: "",//实验
    /*
    stuT: [{已经上传实验作业的学生List(status=1)
      userId: 2,
      userName: '谢国城',
      upTime: '2019-05-19',
      status: 1
    }]
    stuF:[{没有上传实验作业的学生List(status=0)
      userId: 1,
      userName: '许伟杰',
      upTime: '',
      status: 0
    }]
    */ 
    //(待修改)获取该课程的学生及学生参与该项实验的status
    stuT: [
    //   {
    //   userId: 2,
    //   userName: '谢国城',
    //   upTime: '2019-05-19',
    //   status: 1
    // },
    //   {
    //     userId: 4,
    //     userName: '蒸铃声',
    //     upTime: '2019-05-20',
    //     status: 1
    //   }
    ],
    stuF: [
    //   {
    //   userId: 1,
    //   userName: '许伟杰',
    //   upTime: '',
    //   status: 0
    // },
    //   {
    //     userId: 3,
    //     userName: '肖展洲',
    //     upTime: '',
    //     status: 0
    //   },
    ]
  },

  open: function (e) {
    var me = this;
    var arrindex = e.currentTarget.dataset.index;
    var url = this.data.urllist[arrindex].url;
    var fileType = this.data.urllist[arrindex].type;
    if (fileType=="docx"){
      fileType = "doc"
    } else if (fileType == "pptx"){
      fileType = "ppt"
    }
    console.log(fileType)
    wx.downloadFile({
      url: url,
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          fileType: fileType,
          success: function (res) {
            console.log('打开文档成功')
            console.log(filePath)
          },
          fail:function(){
            wx.showToast({
              title: '格式有误，无法打开...',
              icon: 'none'
            })
          }
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var exList = JSON.parse(options.ex)
    this.setData({
      exList: exList
    })

    var me = this;
    var experimentInfo = me.data.exList;
    me.setData({
      experimentInfo: experimentInfo
    });
    var url = experimentInfo.courUrls;
    url = decodeURIComponent(url);
    var arr = url.split(",");

    for (var ar in arr) {
      var wangzhi = "http://pr2t5kesu.bkt.clouddn.com/"
      console.log(arr[ar]);
      //截取文件名 a=信息科学技术学院学生通讯录.xls
      //var a = arr[ar].substring(wangzhi.length, arr[ar].length);
      var shuzu = arr[ar].split('/');
      var a = shuzu[shuzu.length-1];
      //截取格式 type=xls 
      var typearr = a.split(".");
      var type = typearr[typearr.length - 1];
      //console.log(type);
      var documentdetail = {
        type: type,
        documentname: a,
        url: arr[ar]
      }
      if (me.data.urllist == null) {
        me.setData({
          urllist: documentdetail
        })
      } else {
        var newurllist = me.data.urllist.concat(documentdetail)
        me.setData({
          urllist: newurllist
        })
      }
    }
    console.log('urllist', me.data.urllist)

    var type = this.data.type
    var urllist = me.data.urllist;

    for (var i = 0; i < urllist.length; i++) {
      //var substr = exList.fileName[i].split(".")
      switch (urllist[i].type) {
        case "docx":
          type[i] = "word.png";
          this.setData({
            type: type
          });
          break;
        case "doc":
          type[i] = "word.png";
          this.setData({
            type: type
          });
          break;
        case "pptx":
          type[i] = "point.png";
          this.setData({
            type: type
          });
          break;
        case "pdf":
          type[i] = "text.png";
          this.setData({
            type: type
          });
          break;
        case "xls":
          type[i] = "excel.png";
          this.setData({
            type: type
          });
          break;
        case "mp4":
          type[i] = "vedio.png";
          this.setData({
            type: type
          });
          break;
        default:
          type[i] = "un.png";
          this.setData({
            type: type
          });
          break;
      }
    }
    me.getAllCourseList();
  },

  //获取所有课程信息
  getAllCourseList: function () {
    var me = this;
    var serverUrl = app.serverUrl;
    console.log('me.data.exList', me.data.exList)
    wx.showLoading({
      title: '请等待，加载中...',
    });

    wx.request({
      url: serverUrl + '/experiment/getAllStudents?courseExperimentId=' + me.data.exList.courExperimentId,
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        console.log(res.data.data);

        me.setData({
          stuT: res.data.data[0],
          stuF: res.data.data[1]
        });

      }
    })
  },

  toStuT:function(e){
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      //(待修改)传值进入学生详情页面
      url: '../../member/member-intro/member-intro?studentInfo=' + JSON.stringify(this.data.stuT[index]),
    })
  },

  toStuF: function (e) {
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      //(待修改)传值进入学生详情页面
      url: '../../member/member-intro/member-intro?studentInfo=' + JSON.stringify(this.data.stuF[index]),
    })
  }

  

})
// pages/personal_info.js
const app = getApp()
Page({
  data: 
  {
    imagebox: [],
    array: ['手机号', 'qq号', '微信号'],
    index: 0,
    name:'',
    stu_num:'',
    details:"",
    is_ready: false,
  },
  contact_methodPickerChange: function (e) 
  {
    this.setData({index: e.detail.value})
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /*点击提交*/
  formSubmit: function (e) 
  {
    var that = this
    wx.showModal(
    {
      title: "提示",
      content: "是否确定提交",
      cancelColor: 'cancelColor',
      success(res)
      {
        if(res.confirm)
        {
          wx.cloud.init({})
          const db = wx.cloud.database({})
          var newDate = new Date();
          var newDateStr = newDate.toLocaleDateString();
          var hour = newDate.getHours()
          var minute = newDate.getMinutes()
          var second = newDate.getSeconds()
          var photoID
          //上传图片
          var name = newDateStr + hour + minute + second + "person" + ".jpg";//上传的图片的别名
          String(that.data.imagebox)
          console.log(that.data.imagebox)
          console.log("name = ",name)
          wx.cloud.uploadFile(
          {
            cloudPath: name, // 上传至云端的路径
            filePath: that.data.imagebox[0], // 小程序临时文件路径
            complete:function(res){
              photoID = res.fileID
              console.log(photoID)
            },
          })
          setTimeout(function(){
            db.collection('User').doc(app.globalData.openid).get({
              success: function(res) {
                db.collection('User').doc(app.globalData.openid).update({
                  data:{
                    name: e.detail.value.name,
                    student_number: e.detail.value.number,
                    contact_method: e.detail.value.contact_method,//'手机号'=0, 'qq号'=1, '微信号'=2
                    contact_info: e.detail.value.contact_info,
                    student_photoID: photoID,
                  },
                  success: function(res) {
                    wx.showModal({
                      title:"提示",
                      content: "修改成功",
                      showCancel: false,
                      success(res){
                          wx.switchTab({
                            url: '../index/index',
                          })
                      }
                    })
                  }
                })
              },
              fail: function(res){
                db.collection('User').add({
                  data: {
                    _id: app.globalData.openid,
                    name: e.detail.value.name,
                    student_number: e.detail.value.number,
                    contact_method: e.detail.value.contact_method,//'手机号'=0, 'qq号'=1, '微信号'=2
                    contact_info: e.detail.value.contact_info,
                    student_photoID: photoID,
                    favourite: []
                  },
                  success: function(res) {
                    wx.showModal({
                      title:"提示",
                      content: "保存成功",
                      showCancel: false,
                      success(res){
                          wx.switchTab({
                            url: '../index/index',
                          })
                      }
                    })
                  }
                }) 
              }
            })
          },3000)
        }
      }
    })
  },
  /*图片删除*/
  delPic :function(e){
    let _this = this
    // console.log('_this.data.imagebox:'+_this.data.imagebox)
    _this.setData({
      imagebox: '',
    })
    // console.log('_this.data.imagebox:'+_this.data.imagebox+'!')
  },
  /*图片添加*/
  addPic :function(){
    var imgbox = this.data.imagebox
    var _this = this
    var n = 1
    wx.chooseImage({
      count: n,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res){
        var tmpFilePaths = res.tempFilePaths
        imgbox = tmpFilePaths
        _this.setData({
          imagebox: imgbox
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log('hi,I\'m onLoad')
    var that = this
    wx.cloud.init();
    var db = wx.cloud.database() 
    var GD = db.collection('User')
    const _ = db.command
    GD.where({_id:app.globalData.openid}).get({
      complete: function(res) {
      if(res.data.length==0)
      {
        that.setData({
          is_ready:true
        })
      }
      that.setData({name:res.data[0].name})
      that.setData({stu_num:res.data[0].student_number})
      that.setData({details:res.data[0].contact_info})
      that.setData({index:res.data[0].contact_method})
      var tmpimg
      wx.cloud.downloadFile({
        fileID: res.data[0].student_photoID, // 文件 ID
        success: res => {
          tmpimg=res.tempFilePath
        },
      })  
      setTimeout(function(){
        var temp = []
        temp[0] = tmpimg
        that.setData({imagebox:temp, is_ready: true})
      },3000)
  }
})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
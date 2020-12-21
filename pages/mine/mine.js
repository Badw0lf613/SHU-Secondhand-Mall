// pages/mine/mine.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var judge = app.globalData.hasUserInfo
    this.setData({
      hasUserInfo: judge
    })
  },
  onShow: function(){
    var judge = app.globalData.hasUserInfo
    console.log(judge)
    this.setData({
      hasUserInfo: judge
    })
  },
  
  tap:function(e){
    var type = e.currentTarget.dataset.type
    console.log(type)
    if(type == "hist")
    {
      if(app.globalData.hasUserInfo == false)
      {
        wx.showModal({
          cancelColor: 'cancelColor',
          title: "提示",
          content: "请先登录",
          showCancel: false,
        })
      }
      else
      {
        wx.navigateTo({
          url: '../history/history',
        })
      }
    }
    else if(type=="favo")
    {
      if(app.globalData.hasUserInfo == false)
      {
        wx.showModal({
          cancelColor: 'cancelColor',
          title: "提示",
          content: "请先登录",
          showCancel: false,
        })
      }
      else
      {
        wx.navigateTo({
          url: '../my_favourite/my_favourite',
        })
      }
    }
    else if(type=="info")
    {
      if(app.globalData.hasUserInfo == false)
      {
        wx.showModal({
          cancelColor: 'cancelColor',
          title: "提示",
          content: "请先登录",
          showCancel: false,
        })
      }
      else
      {
        wx.navigateTo({
          url: '../personal_info/personal_info',
        })
      }
    }
  },

  getUserInfo: function(e) {
    app.globalData.hasUserInfo = true
    console.log(app.globalData.hasUserInfo)
    this.setData({
      hasUserInfo: true
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
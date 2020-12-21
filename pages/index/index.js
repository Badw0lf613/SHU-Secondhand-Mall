//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    images: ["cloud://seond-hand-database-4jymm.7365-seond-hand-database-4jymm-1302694025/毕业典礼.jpg","cloud://seond-hand-database-4jymm.7365-seond-hand-database-4jymm-1302694025/座谈会.jpg","cloud://seond-hand-database-4jymm.7365-seond-hand-database-4jymm-1302694025/校园美景.jpg"],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    attention: "1.此为测试注意事项\n",
    is_ready: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  sell_tap: function(){
    if(app.globalData.hasUserInfo==false)
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
        url: '../sell/sell',
      })
    }
  },


  buy_tap: function(){
    if(app.globalData.hasUserInfo==false)
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
        url: '../buy_search/buy_search',
      })
    }
  },
  /*bindImageTap: function(){
    wx.request({
      url: 'https://news.shu.edu.cn/info/1021/57296.htm',
    })
  },*/
  onLoad: function () {
    var judge = app.globalData.hasUserInfo
    console.log(judge)
    this.setData({
      hasUserInfo: judge,
    })
    var that = this
    setTimeout(()=>{
      that.setData({
        is_ready: true
      })
    },3000)
  },

  onShow: function(){
    var judge = app.globalData.hasUserInfo
    console.log(judge)
    this.setData({
      hasUserInfo: judge
    })
  },

  getUserInfo: function(e) {
    app.globalData.hasUserInfo = true
    this.setData({
      hasUserInfo: true
    })
  }
})

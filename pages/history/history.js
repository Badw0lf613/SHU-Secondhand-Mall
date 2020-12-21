// pages/history/history.js
var app = getApp()
Page({
  data: 
  {
    history: [],
    is_ready: false
  },
  delete_item: function(res)
  {
    var that = this
    wx.cloud.init({})
    const db = wx.cloud.database({})
    var hist = that.data.history
    app.globalData.id  = res.currentTarget.id
    var del_item = hist.splice(app.globalData.id , 1)
    var del_id=del_item[0]._id
    db.collection('GOODs').doc(del_id).remove({
      success: function(res) {}
    })
    that.setData({
      history: hist
    })
  },
  tap: function(res){
    wx.cloud.init();
    var db = wx.cloud.database() 
    const _=db.command
    app.globalData.id = res.currentTarget.id
    const type = res.currentTarget.dataset.type
    var that = this
    var hist = that.data.history
    console.log(this.data.history)
    if (type == "sell_done")
    {
      hist[app.globalData.id].status = "已卖出"
      that.setData({
        history: hist
      })
      db.collection('GOODs').doc(hist[app.globalData.id]._id).update({
        data: {
          issell: 2
        },
        success: function(res){
          that.setData({
            is_ready: false
          })
          that.onLoad()
        }
      })
    }
    else if(type == "out")
    {
      hist[app.globalData.id].status = "已下架"
      that.setData({
        history: hist
      })
      db.collection('GOODs').doc(hist[app.globalData.id]._id).update({
        data: {
          issell: 1
        },
        success: function(res){
          that.setData({
            is_ready: false
          })
          that.onLoad()
        }
      })    
    }
    else if(type == "revise")
    {
      wx.navigateTo({
        url: '../revise_goods/revise_goods',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) 
  {
    var that = this
    wx.cloud.init();
    var db = wx.cloud.database() 
    var GD = db.collection('GOODs')
    const _ = db.command
    GD.where({sellerID:app.globalData.openid}).get({
      complete: function(res) {
        that.setData({history:res.data})
        var temp=[]
        if(that.data.history.length == 0)
        {
          that.setData({
            is_ready: true
          })
        }
        else{
          for(var i = 0 ; i <that.data.history.length;i++)
          {
            var hour =that.data.history[i].Date.getHours();console.log(hour)
            var min = that.data.history[i].Date.getMinutes();console.log(min)
            var sec =that.data.history[i].Date.getSeconds();console.log(sec)
            var yy =that.data.history[i].Date.getFullYear();console.log(yy)
            var dd =that.data.history[i].Date.getDate();console.log(dd)
            var mm = that.data.history[i].Date.getMonth();console.log(mm)
            var mm=mm+1
            var time= yy + '-' + mm + '-' + dd + ' '  + hour + ':' + min + ':' + sec;
            var str ="history["+i+"].date"
            that.setData({[str]:time.substring(0,10), is_ready: true})
          } 
        }
       
      }
    })
    setTimeout(()=>{
      app.globalData.now_list = that.data.history },5000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
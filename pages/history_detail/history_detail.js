// pages/history_detail/history_detail.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    person:{},
    price:0,
    tag:'',
    percent:'',
    details:'',
    photoID:[],
    date:'',
    goodsid:'',
    is_ready: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log(app.globalData.now_list)
    var hour =app.globalData.now_list[app.globalData.id ].Date.getHours();
    var min = app.globalData.now_list[app.globalData.id ].Date.getMinutes();
    var sec =app.globalData.now_list[app.globalData.id ].Date.getSeconds();console.log(sec)
    var yy =app.globalData.now_list[app.globalData.id ].Date.getFullYear();console.log(yy)
    var dd =app.globalData.now_list[app.globalData.id ].Date.getDate();console.log(dd)
    var mm =app.globalData.now_list[app.globalData.id ].Date.getMonth();console.log(mm)
    var mm=mm+1
    var time= yy + '-' + mm + '-' + dd + ' '  + hour + ':' + min + ':' + sec;
    this.setData({
      price :app.globalData.now_list[app.globalData.id ].price,
      percent :app.globalData.now_list[app.globalData.id ].percent,
      details :app.globalData.now_list[app.globalData.id ].details,
      photoID :app.globalData.now_list[app.globalData.id ].photoID,
      date :time.substring(0,10),
      goodsid:app.globalData.now_list[app.globalData.id ]._id,
      tag: app.globalData.now_list[app.globalData.id].goods_tag,
      is_ready: true
    })
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
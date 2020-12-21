// pages/my_favourite/my_favourite.js
var app = getApp()
Page({
  data: 
  {
    favor_list:{},
    goodslist:[],
    is_ready: false
  },
  to_detail:function(res)
  {
    console.log(res.currentTarget.dataset.id)
    app.globalData.id = res.currentTarget.dataset.id
    wx.navigateTo({
      url: '../good_detail/good_detail',
    })
  },
  delete_item: function(res)
  {
    var that = this
    wx.cloud.init();
    var db = wx.cloud.database()
    const _ = db.command
    var id = res.currentTarget.dataset.id
    var goods = that.data.goodslist
    var del_item = goods.splice(id, 1)
    that.setData({
      goodslist: goods
    })
    var fav = []
    for (var i = 0; i < goods.length; i++)
    {
      fav[i]=goods[i]._id
    }
    db.collection('User').doc(app.globalData.openid).update({
      data: 
      {
        favourite: fav
      },
      success: function(res){      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) 
  {
    var that = this
    wx.cloud.init();
    var db = wx.cloud.database() 
    var GD = db.collection('User')
    const _ = db.command
    var ss=[]
    GD.where({_id:app.globalData.openid}).get({
      complete: function(res) {
        console.log(1)
        that.setData({favor_list:res.data})
        for(var i = 0 ; i < that.data.favor_list[0].favourite.length;i++)
        {
          console.log(that.data.favor_list[0].favourite[i])
          db.collection('GOODs').where({_id:that.data.favor_list[0].favourite[i]}).get({
            complete:function(res){ 
              if(res.data!=undefined && res.data.length!=0)
              {
                console.log(res)
                ss.push(res.data[0])
              }
            }
          })
        }
        setTimeout(()=>{
          console.log(ss)
          that.setData({goodslist: ss,
          is_ready: true})
          console.log(that.data.goodslist)
          app.globalData.now_list = that.data.goodslist
          console.log(app.globalData.now_list)
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
// pages/good_detail/good_detail.js
const app=getApp();
Page({
  data: 
  {
    goods:[],
    phone:'',
    name:'',
    qq:'',
    price:'',
    percent:'',
    tag:'',
    details:'',
    photo:[] ,
    stu_num:'',
    goodid:'',
    is_ready: false
  },
  onLoad: function (options)
  {
    console.log(app.globalData.now_list)
    this.setData({goods : app.globalData.now_list[app.globalData.id ]})
    this.setData({phone:this.data.goods.Phone_number})
    this.setData({qq:this.data.goods.QQ_number})
    this.setData({price:this.data.goods.price})
    this.setData({percent:this.data.goods.percent})
    this.setData({tag:this.data.goods.goods_tag})
    this.setData({photo:this.data.goods.photoID})
    this.setData({goodid:this.data.goods._id})
    this.setData({details:this.data.goods.details})

    console.log(this.data.goodid,app.globalData.openid)
    var that = this
    wx.cloud.init();
    var db = wx.cloud.database() 
    var GD = db.collection('User')
    const _ = db.command
    console.log(that.data.goods.sellerID)
    var ty
    var tr
    GD.where({_id: that.data.goods.sellerID}).get({
      complete: function(res){
        console.log(res)
        tr = res.data[0].name
        ty = res.data[0].student_number
        that.setData({
          name: tr
        })
        that.setData({
          stu_num: ty,
          is_ready:true
        })
      }
    })
    var count = that.data.goods.count
    db.collection('GOODs').doc(that.data.goods._id).update({
      data: {
        count: count+1
      },
      success: function(res){

      }
    })
  },
  
  go_my_favourite: function(){
    wx.cloud.init();
    var db = wx.cloud.database() 
    const _=db.command
    var that=this
    var fav = []
    db.collection('User').doc(app.globalData.openid).get({
      success: function(res) {
        //console.log(res.data.favourite)
        fav = res.data.favourite
      }
    })
    setTimeout(()=>{
      var flag = false
      for (var i=0; i<fav.length; i++){
        if (fav[i]==that.data.goodid){
          flag=true
          break
        }
      }
      if (flag==true){
        wx.showModal({
          title: "提示",
          content: "已存在",
          showCancel: false
        })
      }
      else{
        db.collection('User').doc(app.globalData.openid).update({
          // data 传入需要局部更新的数据
          data: {
            favourite: _.push(that.data.goodid)
          },
          success: function(res) {
            console.log(res)
            wx.showModal({
              title: "提示",
              content: "收藏成功",
              showCancel: false
            })
          }
        })
      }
    }
    ,500)
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
    this.data.is_ready = false
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
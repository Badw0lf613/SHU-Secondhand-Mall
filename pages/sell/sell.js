// pages/sell.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imagebox: [],
    goods_info_text: ["商品名称：", "新旧程度：", 
    "定价："],
    seller_info_text: ["qq号: ", "手机号："],
    info: [],
    QQ_number: "",
    Phone_number: "",
    goods_tag: "",
    percent: "",
    price: "",
    details: "",
    is_ready: false
  },
  /*点击提交*/
  submit :function(e){
    var that = this
    if(that.data.imagebox.length < 2)
    {
      wx.showModal({
        cancelColor: 'cancelColor',
        title: "提示",
        content: "图片至少上传两张！",
        showCancel: false
      })
    }
    else{
      wx.showModal({
        title: "提示",
        content: "请确认所有信息是否填写正确，是否确定提交",
        cancelColor: 'cancelColor',
        success(res){
          console.log(1)
          if(res.confirm)
          {
            var photoID = []
            wx.cloud.init({})
            const db = wx.cloud.database({})
            var i
            var newDate = new Date();
            var newDateStr = newDate.toLocaleDateString();
            var hour = newDate.getHours()
            var minute = newDate.getMinutes()
            var second = newDate.getSeconds()
            //上传商品信息
            for (i=0; i<that.data.imagebox.length;i++)
            {
              //上传图片
              var name = newDateStr + hour + minute + second + i + ".jpg";//上传的图片的别名
              wx.cloud.uploadFile({
                cloudPath: name, // 上传至云端的路径
                filePath: that.data.imagebox[i], // 小程序临时文件路径
                success:function(res){
                  // 返回文件 ID
                  console.log(res.fileID)
                  photoID.push(res.fileID)
                },
              })
            }
            setTimeout(function(){
              db.collection('GOODs').add({
                // data 字段表示需新增的 JSON 数据
                data: {
                  goods_tag: that.data.goods_tag,
                  QQ_number: that.data.QQ_number,
                  Phone_number: that.data.Phone_number,
                  percent: Number(that.data.percent),
                  price: Number(that.data.price),
                  details: that.data.details,
                  photoID: photoID,
                  count: 0,   //浏览数
                  issell: 0,   //出售状态，0为正在出售，1为已下架，2为已售出
                  sellerID: app.globalData.openid,
                  Date: newDate,
                },
                success: function(res) {
                  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                  console.log(res)
                }
                })
                wx.showModal({
                  cancelColor: 'cancelColor',
                  title:"提示",
                  content: "商品上架成功，请前往出售历史查看",
                  showCancel: false,
                  success(res){
                    if(res.confirm || res.cancel)
                    {
                      wx.switchTab({
                        url: '../index/index',
                      })
                    }
                  }
                })
            },1000)
            setTimeout(function(){
              console.log(1)
            },1000)
          }
        }
      })
    }
  }, 

  Get_tags: function(e){
    var that = this
    that.setData({
      goods_tag: e.detail.value
    })
  },

  Get_percent: function(e){
    var that = this
    that.setData({
      percent: e.detail.value
    })
  },

  Get_price: function(e){
    var that = this
    that.setData({
      price: e.detail.value
    })
  },

  Get_details: function(e){
    var that = this
    that.setData({
      details: e.detail.value
    })
    console.log(that.data.details)
  },

  Get_QQ: function(e){
    var that = this
    that.setData({
      QQ_number: e.detail.value
    })
    console.log(that.data.QQ_number)
  },

  Get_phone: function(e){
    var that = this
    that.setData({
      Phone_number: e.detail.value
    })
    console.log(that.data.Phone_number)
  },

  /*图片删除*/
  delPic :function(e){
    let imgbox = this.data.imagebox
    let _this = this
    let index = e.currentTarget.dataset.deindex
    imgbox.splice(index, 1)
    _this.setData({
      imagebox: imgbox
    })
  },

  /*图片添加*/
  addPic :function(){
    var imgbox = this.data.imagebox
    var _this = this
    var n = 5
    if (5 > imgbox.length)
    {
      n = 5-imgbox.length
    }
    else if(5 == imgbox.length)
    {
      n = 1
    }
    wx.chooseImage({
      count: n,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res){
        var tmpFilePaths = res.tempFilePaths
        if(imgbox.length == 0)
        {
          imgbox = tmpFilePaths
        }
        else if(5 > imgbox.length)
        {
          imgbox = imgbox.concat(tmpFilePaths)
        }
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
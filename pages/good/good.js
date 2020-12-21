// pages/good.js
var app = getApp();
Page({
    data: {
      goodslist:[],
      is_ready: false
    },
    go_good_detail(res){
        app.globalData.now_list = this.data.goodslist
        app.globalData.id  = res.currentTarget.dataset.id
        wx.navigateTo({
        url: "../good_detail/good_detail"
        })
    },
    onShow: function () 
    {
        var that = this
            wx.cloud.init();
            var db = wx.cloud.database() 
            var GD = db.collection('GOODs')
            GD.where({issell:0}).orderBy('count','desc').get().then(res=>{this.setData(
                {goodslist : res.data, is_ready: true}
            );})
    },
    // 加入购物车
    addcart:function(e){
        this.setData({
            toastHidden:false
        });
        // 遍历列表 与 购物车列表
        for (var i in this.data.goodslist){
            // 列表中某一项item的id == 点击事件传递过来的id。则是被点击的项
            if(this.data.goodslist[i].id == e.target.id){
                // 给goodsList数组的当前项添加count元素，值为1，用于记录添加到购物车的数量
                this.data.goodslist[i].count = 1;
                // 获取购物车的缓存数组（没有数据，则赋予一个空数组）
                var arr = wx.getStorageSync('cart') || [];
                // 如果购物车有数据
                if(arr.length>0){
                    // 遍历购物车数组
                    for(var j in arr){
                        // 判断购物车内的item的id，和事件传递过来的id，是否相等
                        if(arr[j].id == e.target.id){
                            // 相等的话，给count+1（即再次添加入购物车，数量+1）
                            arr[j].count = arr[j].count + 1;
                            // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）
                            try {
                                wx.setStorageSync('cart', arr)
                            } catch (e) {
                                console.log(e)
                            }
                            // 返回（在if内使用return，跳出循环节约运算，节约性能）
                            return;
                        }
                    }
                    // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组
                    arr.push(this.data.goodslist[i]);
                }
                // 购物车没有数据，把item项push放入当前数据（第一次存放时）
                else{
                    arr.push(this.data.goodslist[i]);
                }
                // 最后，把购物车数据，存放入缓存
                try {
                    wx.setStorageSync('cart', arr)
                    // 返回（在if内使用return，跳出循环节约运算，节约性能）
                    return;
                } catch (e) {
                    console.log(e)
                }
            }
        }
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
    this.data.is_ready=false
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
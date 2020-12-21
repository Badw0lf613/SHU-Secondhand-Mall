// 1 导入js文件
import showDetail from "../../modules/showDetail";
const app=getApp();

Page({
  data:
  {
    hotKeys:[], 
    per_wor:["都可以","1~3成","4~6成","7~9成"],
    index:0,
    tipKeys:[],
    goods_list:[],
    search_list:[],
    is_hidden:true,
    search_word:'', 
    is_ready: false,
    tep: ''
  },
  contact_methodPickerChange: function (e) 
  {
    this.setData({index: e.detail.value})
    app.globalData.per_wor = this.data.index
    console.log('app.globalData.per_wor'+app.globalData.per_wor)
  },
  
  Get_word: function(e){
    this.setData({
      search_word: e.detail.value
    })
    app.globalData.search_tag = this.data.search_word
    console.log(app.globalData.search_tag )
  },

  wxSearchConfirm: function(e){
    wx.navigateTo({
      url: '/pages/good_copy/good',
    })
  },

  hotKeysTap:function(e) 
  {
    app.globalData.search_tag = e.target.dataset.key
    wx.navigateTo({url: '/pages/good_copy/good'})
  },
  onLoad:function () {
    // 2 搜索栏初始化
    var that = this
    wx.cloud.init();
    var db = wx.cloud.database() 
    var GD = db.collection('GOODs')
    const _= db.command 
    var k = app.globalData.per_wor
    var ss = []
    var temp = {}
    that.data.goods_list = []
    GD.where({issell:0}).orderBy('count','desc').get(
    {
        complete:function(res)
        {temp=res.data},
    })
    setTimeout(()=>{
      var ll = 0
      if (temp.length > 8){ll = 8} 
      else{ll = temp.length}
      for(var i = 0 ; i < ll; i++)
      {
        var kk = {"name" : temp[i].goods_tag, "isSelected" : false}
        ss.push(kk)
      }
    },3000)
    setTimeout(()=>{
    this.setData({hotKeys:ss, is_ready:true})},5000)
  },
  onShow: function(){
    this.setData({
      tep:''
    })
  }
})
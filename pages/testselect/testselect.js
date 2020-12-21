//testselect.js
//获取应用实例
const app = getApp()

Page({
  data: {
    applyList:[
      {Item_id: "10", Item_Name: "公司", isSelect: false},
      {Item_id: "11", Item_Name: "职务", isSelect: false},
      {Item_id: "12", Item_Name: "行业", isSelect: false},
      {Item_id: "13", Item_Name: "家庭住址", isSelect: false}
    ]
  },
  selectApply:function(e){
    var index = e.currentTarget.dataset.index;
    console.log('e:'+e)
    console.log('index:'+index)
    var item = this.data.applyList[index];
    item.isSelect = !item.isSelect;
    this.setData({
      applyList: this.data.applyList,
    });
  }
})
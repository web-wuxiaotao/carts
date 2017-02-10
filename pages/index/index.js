//index.js
//获取应用实例
Page({
  data:{
    cars: [
      {cid:1008,title:'Zippo打火机',image:'https://img12.360buyimg.com/n7/jfs/t2584/348/1423193442/572601/ae464607/573d5eb3N45589898.jpg',num:'1',price:'198.0',sum:'198.0',selected:true},
      {cid:1012,title:'iPhone7 Plus',image:'https://img13.360buyimg.com/n7/jfs/t3235/100/1618018440/139400/44fd706e/57d11c33N5cd57490.jpg',num:'1',price:'7188.0',sum:'7188.0',selected:true},
      {cid:1031,title:'得力订书机',image:'https://img10.360buyimg.com/n7/jfs/t2005/172/380624319/93846/b51b5345/5604bc5eN956aa615.jpg',num:'3',price:'15.0',sum:'45.0',selected:false},
      {cid:1054,title:'康师傅妙芙蛋糕',image:'https://img14.360buyimg.com/n7/jfs/t2614/323/914471624/300618/d60b89b6/572af106Nea021684.jpg',num:'2',price:'15.2',sum:'30.4',selected:false},
      {cid:1063,title:'英雄钢笔',image:'https://img10.360buyimg.com/n7/jfs/t1636/60/1264801432/53355/bb6a3fd1/55c180ddNbe50ad4a.jpg',num:'1',price:'122.0',sum:'122.0',selected:true}
    ],
    flag: false,
    zong: 0
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.price()
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
   
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  //数量加减
  add:function(e){
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.cars[index].num;
    num++;
    if(num>=100){
      num==99
    }
    var cars=this.data.cars
    cars[index].num=num
    this.setData({
      cars: cars
    });
    this.price()
  },
  jian:function(e){
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.cars[index].num;
    if(num>1){
      num--
    }
    var cars=this.data.cars
    cars[index].num=num
    this.setData({
      cars: cars
    });
    this.price()
  },
  bindFalse:function(e){
    var index = parseInt(e.currentTarget.dataset.index);
    var selected = this.data.cars[index].selected;
    var cars=this.data.cars
    cars[index].selected=!selected
    this.setData({
      cars: cars
    })
    this.price()
    this.bindF()
  },
  bindF:function() {
    var cars = this.data.cars
    var flag = this.data.flag
    for (var i = 0; i < cars.length; i++) {
      cars[i].selected != true
      flag = false
    }
    this.setData({
      flag: flag
    })
  },
  bindBox:function(){
    var flag=this.data.flag
    flag=!flag
    var cars=this.data.cars
    for(var i=0;i<cars.length;i++){
      cars[i].selected=flag
    }
    this.setData({
      cars: cars,
      flag: flag
    })
    this.price()
  },
  price:function(){
    //价格计算函数
    var cars=this.data.cars
    var zong=0
    for(var i=0;i<cars.length;i++){
      if(cars[i].selected){
        zong += cars[i].num * cars[i].price;
      }
    }
    this.setData({
      zong: zong
    })
  },
  over:function(){
    var cars=this.data.cars
    var zong=this.data.zong
    for(var i=0;i<cars.length;i++){
      if(cars[i].selected==true){
        wx.showActionSheet({
          itemList:["微信支付"],
          success:function(res){
            if(res.tapIndex==undefined){
              return
            }else{
              wx.showModal({
                title: "确认支付￥"+zong+"?",
                mask: true,
                success:function(res){
                  if(res.confirm) {
                    wx.showToast({
                      title: "支付成功",
                      mask:true,
                      icon: "success"
                    })
                  }else{
                    wx.showToast({
                      title: "支付失败",
                      mask:true,
                      icon:"success"
                    })
                  }
                }
              })
            }
          }
        })
      }
    }
  }
})

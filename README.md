# carts
## 最近研究微信小程序，在研究过程中简单实现了一下购物车的效果。下面是具体：
### 首先是配置文件app
* app.js中没有内容，只是小程序必备的东西

        App({
          onLaunch: function () {

          },
          onShow: function () {

          },
          onHide: function () {

          },
          onError: function (msg) {

          }
        })

* 在app.json中进行了小程序的全局配置

        {
          "pages":[
            "pages/index/index"
          ],
          "window":{
            "backgroundTextStyle":"light",
            "navigationBarBackgroundColor": "#fff",
            "navigationBarTitleText": "购物车",
            "navigationBarTextStyle":"black"
          }
        }
        
### 之后就是页面的具体内容
* 首先进行页面的布局
  * 从网上获取数据，写入index.js中cars中
  
          cars: [
            {cid:1008,title:'Zippo打火机',image:'https://img12.360buyimg.com/n7/jfs/t2584/348/1423193442/572601/ae464607/573d5eb3N45589898.jpg',num:'1',price:'198.0',sum:'198.0',selected:true},
            {cid:1012,title:'iPhone7 Plus',image:'https://img13.360buyimg.com/n7/jfs/t3235/100/1618018440/139400/44fd706e/57d11c33N5cd57490.jpg',num:'1',price:'7188.0',sum:'7188.0',selected:true},
            {cid:1031,title:'得力订书机',image:'https://img10.360buyimg.com/n7/jfs/t2005/172/380624319/93846/b51b5345/5604bc5eN956aa615.jpg',num:'3',price:'15.0',sum:'45.0',selected:false},
            {cid:1054,title:'康师傅妙芙蛋糕',image:'https://img14.360buyimg.com/n7/jfs/t2614/323/914471624/300618/d60b89b6/572af106Nea021684.jpg',num:'2',price:'15.2',sum:'30.4',selected:false},
            {cid:1063,title:'英雄钢笔',image:'https://img10.360buyimg.com/n7/jfs/t1636/60/1264801432/53355/bb6a3fd1/55c180ddNbe50ad4a.jpg',num:'1',price:'122.0',sum:'122.0',selected:true}
          ]
          
  * 在页面中利用wx:for 循环创建出来
          
          <view class="content">
              <view class="item" wx:for="{{cars}}">
                  <view class="img">
                      <image class="image" src="{{item.image}}"/>
                  </view>
                  <view class="text">
                      <text class="title">{{item.title}}</text>
                      <view class="subtitle">
                          <text class="price">{{item.price}}</text>
                          <view class="st">
                              <view class="disabled" data-index="{{index}}" bindtap="jian">-</view>
                              <input type="number" value="{{item.num}}" class="number"/>
                              <view class="normal" bindtap="add" data-index="{{index}}">+</view>
                          </view>
                      </view>
                  </view>
              </view>
          </view>
          
          
 * 写入wxss样式
            
           .content{
              width: 100%;
              font-family: "Microsoft YaHei UI";
              padding-bottom: 80rpx;
            }
            .content .item{
              width: 90%;
              margin: 0 auto;
              height: 240rpx;
              /*border: 1px solid red;*/
            }
            .content .item .img{
              width: 200rpx;
              height: 200rpx;
              float: left;
              margin-top: 20rpx;
            }
            .content .item .img .image{
              width: 200rpx;
              height: 200rpx;
            }
            .text{
              height: 200rpx;
              float: left;
              margin-left: 20rpx;
              margin-top: 20rpx;
            }
            .text .title{
              font-size: 42rpx;
              color: #333333;
              line-height: 90rpx;
            }
            .text .subtitle{
              height: 80rpx;
              margin-top: 30rpx;
            }
            .text .subtitle .price{
              font-size: 36rpx;
              color: indianred;
              line-height: 80rpx;
              float: left;
              width: 80rpx;
            }
            .text .subtitle .st{
              height: 80rpx;
              color: #aaaaaa;
              float: left;
              margin-left: 100rpx;
              margin-top: 20rpx;
            }
            .text .subtitle .st .disabled,.text .subtitle .st .normal{
              float: left;
              width: 36rpx;
              font-size: 32rpx;
              height: 1.4em;
              line-height: 1.4em;
              text-align: center;
              border: 2px solid #eee;
            }
            .text .subtitle .st .number{
              float: left;
              width: 60rpx;
              font-size: 32rpx;
              height: 1.4em;
              border: 0;
              text-align: center;
              line-height: 1.4em;
              color: #333;
              padding: 0;
            }   
 
 * 然后对数量加减进行处理
            
            //数量加减
            add:function(e){
              var index = parseInt(e.currentTarget.dataset.index);
              var num = this.data.cars[index].num;
              num++;
              //最多99件
              if(num>=100){
                num==99
              }
              var cars=this.data.cars
              cars[index].num=num
              this.setData({
                cars: cars
              });
            },
            jian:function(e){
              var index = parseInt(e.currentTarget.dataset.index);
              var num = this.data.cars[index].num;
              //只有大于一件的时候才能减少
              if(num>1){
                num--
              }
              var cars=this.data.cars
              cars[index].num=num
              this.setData({
                cars: cars
              });
            },
            
  ####这样就可以进行数量的加减了
 
 * 之后就可以加入右边点击选中事件了 
            
           <!--wxml-->
           <icon wx:if="{{item.selected}}" type="success_circle" size="20" bindtap="bindFalse" data-index="{{index}}"/>
           <icon wx:else type="circle" size="20" bindtap="bindFalse" data-index="{{index}}"/>
           放在循环创建后图片前面
           /*wxss*/
          .item icon {
            float: left;
            margin-top: 60rpx;
            margin-right: 20rpx;
          }
          
  ### 点击选中或未选中
    * 在获取的内容中有一个selected值，可以通过改变selected值来判断是否选中，值为true即选中
          
            bindFalse:function(e){
              var index = parseInt(e.currentTarget.dataset.index);
              var selected = this.data.cars[index].selected;
              var cars=this.data.cars
              cars[index].selected=!selected
              this.setData({
                cars: cars
              })
            },
            
 * 最后加入底部的内容，包括结算，金额等
            
            <!--wxml-->
            <view class="zongjia">
                <view class="p" bindtap="bindBox">
                    <icon wx:if="{{flag}}" type="success_circle" size="20"/>
                    <icon wx:else type="circle" size="20"/>
                    <text>全选￥</text>
                    <text class="m">{{zong}}</text>
                </view>
                <view class="o" bindtap="over">
                    立即结算
                </view>
            </view>
            
            <!--wxss-->
            .zongjia{
              width: 90%;
              height: 80rpx;
              position: fixed;
              bottom: 0;
              left: 5%;
              z-index: 20;
              background: #ffffff;
            }
            .p{
              float: left;
              font-size: 38rpx;
              font-family: "Microsoft YaHei UI";
              /*width: 300rpx;*/
              height: 80rpx;
              line-height: 80rpx;
            }
            .p icon{
              float: left;
              margin-top: 20rpx;
              margin-right: 20rpx;
            }
            .p text{
              color: #333;
            }
            .p .m{
              color: indianred;
            }

            .o{
              float: right;
              width: 240rpx;
              height: 80rpx;
              color: #fafafa;
              font-size: 42rpx;
              text-align: center;
              line-height: 80rpx;
              background: orange;
            }

    #### 点击全选事件
        * 先定义一个对象，如：flag: false,通过点击改变flag的值来判断是否全选
      
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
              },
    
    #### 点击全选之后再点击单个商品就会去掉全选
                  
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
                    
     #### 然后将其在bindFalse中运行
     
 * 最重要的当然是金额的计算
    #### 通过获取selected值为true的商品及num值进行计算，然后赋值给预先设置的对象
          
          zong: 0

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
                
    #### 将这个函数在add、jian、bindFalse、bindBox中运行即可              
            
 * 至于结算支付，由于做的时候没加小程序ID，不能调用微信支付，只是利用API做了个简易效果
 
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
            
  ### 这样，这个购物车就基本实现了
  
  ### 最后，由于时间关系，对这个购物车还有一些不完善的地方，如直接输入商品数量，还有对每个商品都进行选中后下面的全选按钮会自动全选等，有时间会继续完善。
            
            
            
            
            

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    navselected:0,
    lists:[],
    hidden:true,
    scrollHeight:0,
    scrollTop:0
  },
  swiperChange(event){
    console.log(event);
    this.setData({
      navselected:event.detail.current
    })
  },
  changeNav(event){
    this.setData({
      navselected:event.target.dataset.navidx
    })
  },
    onShow:function(){
    //   在页面展示之后先获取一次数据
      this.showToast();
        //在这里调用获取数据
        this.getData(this);
  },
  onLoad(){
    var that=this;
    wx.getSystemInfo({
          success:function(res){
              console.info(res);
              that.setData({
                  scrollHeight:res.windowHeight-122
              });
          }
      });
},
 // 请求数据
  getData(that){
    that.setData({
    hidden:false
  });
    //微信中发送请求
    wx.request({
      url: app.globalData.globalUrl + '/api/list',
      data: {},
      method: 'GET',
      success: function(res){
        console.log(res);
      var list = that.data.lists;
      for(var i = 0; i < res.data.lists.length; i++){
        list.push(res.data.lists[i]);
      }
        //将获取的数据放入lists数组中
        that.setData({
          lists:list
        })
        //数据加载完成就让消息提示框消失
        wx.hideLoading();
         that.setData({
          hidden:true
        });
        //将获取到的数据本地缓存到指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。
        // wx.setStorage({
        //   key:"lists",
        //   data:res.data.lists
        // })
      }
    })
  },
  showToast(){//显示加载中提示框
    wx.showToast({
      title:"加载中...",
      icon:"loading",
      mask:true
    })
    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个信息提示弹窗',
    //   success: function(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
    
  },
 //页面滑动到底部
 bindDownLoad:function(){  
   this.getData(this);
 },
//  scroll:function(event){
//   //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
//    this.setData({
//      scrollTop : event.detail.scrollTop
//    });
//  },
 topLoad:function(event){
  //  该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
   page = 0;
   this.setData({
     lists : [],
     scrollTop : 0
   });
   this.getData(this);
 }

})

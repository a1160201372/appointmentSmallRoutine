const app = getApp()
Page({

  onShow: function () {
    console.log("遇见")
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    },

  data: { 
    user:[
      [],
    ],



    user:[ 
      {
      urlImage: "cloud://ceshi-fdybb.6365-ceshi-fdybb-1302833646/ouFO65Ypkw2b-YDuoJ7tl3sKXV_gHead.png",
      name: "程序员",
      age: 34,
      height: 168,
      education: "本科",
      income: "五千到一万"
    },
    {
      urlImage: "cloud://ceshi-fdybb.6365-ceshi-fdybb-1302833646/ouFO65Ypkw2b-YDuoJ7tl3sKXV_gHead.png",
      name: "程序员",
      age: 34,
      height: 168,
      education: "本科",
      income: "五千到一万"
    }
    
  ],
    imgUrls: [//推荐栏图片
      'https:////res.wx.qq.com/wxdoc/dist/assets/img/iconList1.81fb9326.jpg',
      'https:////res.wx.qq.com/wxdoc/dist/assets/img/iconList1.81fb9326.jpg',
      'https:////res.wx.qq.com/wxdoc/dist/assets/img/iconList1.81fb9326.jpg',
      'https:////res.wx.qq.com/wxdoc/dist/assets/img/iconList1.81fb9326.jpg',
    ],

    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s

    arr:[]
  },
  //刷新次数
  //赋值
   onReady: function () {
    const arr = []
    for (let i = 0; i < 100; i++) arr.push(i)
    this.setData({
      arr
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  scrolltolower : function () {
    console.log("从在",9)
  },
  onReachBottom:function() {
    var that = this;
    var userTmp=this.data.user;
    var userServer=[
      {
        urlImage: "cloud://ceshi-fdybb.6365-ceshi-fdybb-1302833646/ouFO65Ypkw2b-YDuoJ7tl3sKXV_gHead.png",
        name: "程序员",
        age: 34,
        height: 168,
        education: "本科",
        income: "五千到一万"
      }
    ]
    console.log(userTmp)
    wx.showLoading({
      title: '玩命加载中...',
    });
    setTimeout(function () {
      wx.hideLoading()

      userTmp=userTmp.concat(userServer)
      that.setData({
        user:userTmp
      })

    }, 1000)
  },
  ceshi:function(){
    wx.navigateTo({
      url: '../blindCard/index',
    })
  }
})

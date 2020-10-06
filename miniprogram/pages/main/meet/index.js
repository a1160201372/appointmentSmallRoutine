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
    eductionArry:["初中","高中","大专","本科","硕士","博士"],
    inComeArry:["1千以下","1~2千","2~3千","3~4千","4~8千","8千~1万","1~2万","2~5万","五万以上"],
    user:[
    ],
    userID:[],
/*
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
    
  ],*/
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
  onLoad:function(){
    wx.showLoading({
      title: '加载中',
    })
//读取数据库中的通过审核的ID号
this.readID()
  },
  onShow:function(){
 
      //设置底部导航栏
     if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    
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
    /*
    wx.navigateTo({
      url: '../blindCard/index',
    })*/
  },
  //读取ID号
  readID:function(){
    var that=this
    var start=[0,"通过审核"]
    var ID=[]
      const db = wx.cloud.database()
      db.collection("userID").where({
     /*   review: {
          0:1,
          1:"通过审核"
        }*/
      }).get({
        success:function(res){
        console.log("通过审核",res.data[0].ID)
        console.log("通过审核1",res.data)

        for(var i=0;i<res.data.length;i++)
        {
          ID[i]=res.data[i].ID
        }
        console.log("通过审核11",ID)
        that.setData({
          userID:ID
        })
      //显示信息
        that.initialSetInfo(ID)
      
        },
        fail:function(e){
          console.log("数据库加载失败",e)
        }
      })
  },
  //初始赋值，文字信息
  initialSetInfo:function(ID){
    console.log("用户信息",ID)
    var that=this
    var userTmp=[]
    var IDTmp=ID
    var i=0
    const db = wx.cloud.database()
    for(;i<ID.length;i++){
    
      db.collection('userInfo').where({
        ID:ID[i]
      }).get({
        success:function(res){
          var Tmp={
            ID:0,
            urlImage: "",
            name: "",
            age: 0,
            height: 0,
            education: "",
            income: ""
          }
          var age=res.data[0].education
          var myDate = new Date();//获取系统当前时间
          Tmp.height=res.data[0].height//身高
          Tmp.name=res.data[0].vocation//职业
          Tmp.age=myDate.getFullYear()-res.data[0].bathday[0]//年龄
          Tmp.education=that.data.eductionArry[res.data[0].education]//学历
          Tmp.income=that.data.inComeArry[res.data[0].inCome]//收入
          Tmp.ID=res.data[0].ID//身高
          console.log("ID号",i)
          that.readImage(res.data[0].ID,Tmp)
          userTmp.push(Tmp)
          console.log("临时数据",Tmp)
          setTimeout(function () {
            wx.hideLoading()
            that.setData({
              user:userTmp
            })
          }, 2000)
        },
        fail:function(e){
          console.log("数据库加载失败",e)
        }
      })
      
   }
   console.log("最终数据0",userTmp)
   
  
  },
  //读取用户头像
  readImage:function(ID,Tmp){
    var that=this
    var user=this.data.user
    console.log("图片",user) 
      const db = wx.cloud.database()
      db.collection('userPhotos').where({
        ID: ID
      }).get({
        success:function(res){
          console.log("自我介绍",res.data.length)
          if(res.data.length==0){//没有用户ID
            console.log("无图片") 
          }
          else{//已经存在 
          console.log("图片界面",res.data[0].fileID) 
            
            Tmp.urlImage="cloud://ceshi-fdybb.6365-ceshi-fdybb-1302833646/"+res.data[0].fileID[0]
            console.log("用户信息",user) 
          }
        },
        fail:function(e){
          console.log("数据库加载失败",e)
        }
      })
  },
  jumpBindCard:function(e){
    var user=this.data.user
    console.log("进入",e.currentTarget.dataset.index)
    wx.navigateTo({
      url: '../blindCard/index?id='+user[e.currentTarget.dataset.index].ID
    });
  }

})

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
    userNum:2,
    eductionArry:["初中","高中","大专","本科","硕士","博士"],
    inComeArry:["1千以下","1~2千","2~3千","3~4千","4~8千","8千~1万","1~2万","2~5万","五万以上"],
    user:[
    ],
    userID:[],
    mineID:0,
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
this.readMineID()
  },
  onShow:function(){
    console.log("我的ID", app.globalData.mineID)
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
   
    var idArry=this.data.userID
    var num=this.data.userNum
    console.log("刷新",num)
    
    wx.showLoading({
      title: '玩命加载中...',
    });

    //this.initialSetInfo(1002)

    
    if(this.data.userNum<this.data.userID.length)
    {
      this.initialSetInfo(idArry[this.data.userNum])
      this.data.userNum++
    }else{
      setTimeout(function () {
      wx.showToast({
        title: '没有更多用户了',
        icon: 'none',
        duration: 2000
      })
    }, 2000)
    }
  },
  ceshi:function(){
    console.log("测试")
    wx.request({
      url: 'http://quan.suning.com/getSysTime.do', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log("时间格式",res.data.sysTime2)
        console.log("时间戳",Number(res.data.sysTime1))
      }
    })
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

      //显示信息(默认显示一个)
      for(var i=0;i<2;i++){
        console.log("进行显示",ID[i])
        that.initialSetInfo(ID[i])
      }
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
    var userTmp=this.data.user
    var IDTmp=ID
    var i=0
    const db = wx.cloud.database()
    
    
      db.collection('userInfo').where({
        ID:ID
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
          that.data.user=userTmp
          
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
  //读取自己的ID号
  readMineID:function(){
    var that=this
      const db = wx.cloud.database()
      db.collection('userInfo').where({
        _openid: '{openid}'
      }).get({
        success:function(res){
          console.log("自我介绍",res.data.length)
          if(res.data.length==0){//没有用户ID
            console.log("无图片") 
          }
          else{//已经存在 
          console.log("图片界面",res.data[0].fileID) 
            that.data.mineID=res.data[0].ID
           
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
    var id=[0,0]
    id[0]=user[e.currentTarget.dataset.index].ID
    id[1]=this.data.mineID
    console.log("进入",id)
    wx.navigateTo({
      url: '../blindCard/index?userID='+user[e.currentTarget.dataset.index].ID+'&mineID='+this.data.mineID
    });
  }

})

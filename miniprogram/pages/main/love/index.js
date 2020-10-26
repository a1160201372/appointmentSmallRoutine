const dbF = require('./function.js');//调用功能JS
Page({
  data: {
    widHeight:"10px",
    loveMeHeight:1000,
    tabsFlag:1,
    eductionArry:["初中","高中","大专","本科","硕士","博士"],
    mineID:null,
    tabs: [],
    activeTab: null,
    myLoveID:[],
    //图片
    loveMeImg:[],
    myLoveImg:[],
    //信息
    loveMeInfo:[
      [],
      [],  
    ],//喜欢我的
    myLoveInfo:[],//我喜欢的
  
  //  tabFlag:0,//状态
  },

  onLoad: function (options) {

    wx.showLoading({
      title: '加载中',
    })
    //  初始化关注值
    this.readID("loveMe",1)
    this.readID("myLove",0)

    console.log("携带",options.id)
    var tabsFlag=Number(options.id)
    this.setData({
      activeTab:tabsFlag
    })

    

    const titles = ['我喜欢的', '喜欢我的']
    const tabs = titles.map(item => ({title: item}))
    this.setData({tabs})

   
   // this.readID("loveMe")
  },

  onTabCLick(e) {
    const index = e.detail.index
    this.setData({activeTab: index})
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({activeTab: index})
  },

ceshi:function(){
  //console.log("函数",  dbF.readID("myLove"))
 //this.readID("myLove",0)
 //console.log("函数", Math.ceil(Math.random()*99992363))

 /*
 var map=this.data.loveMeInfo
  //读取符合条件的ID号

 map.forEach(element => {//直接操作数组//遍历
  console.log("遍历",element)
  element.name=element.id
  
 });

 map[0].name="woed"
  console.log("测试",map)*/
},

 //读取ID号
 readID:function(table,flag){
  var that=this

  var ID=[]
    const db = wx.cloud.database()
    db.collection(table).where({
      _openid: '{openid}'
    }).get({
      success:function(res){
        console.log("喜欢",res.data[0].myLove)
        that.data.mineID=res.data[0].ID
        ID=res.data[0].myLove
    
      console.log("进行显示11",ID)
    //显示信息(默认显示一个)
    if(res.data[0].myLove.length!=0)
    {
      for(var i=0;i<res.data[0].myLove.length;i++){
          console.log("进行显示",ID[i])
          that.initialSetInfo(ID[i],flag)
        }
    }else{

    }
    
   

      },
      fail:function(e){
        console.log("数据库加载失败",e)
      }
    })
},
//初始赋值，文字信息
initialSetInfo:function(ID,flag){
  console.log("用户信息",ID)
  var that=this
  var userTmp=this.data.loveMeInfo
  var IDTmp=ID
  var i=0
  const db = wx.cloud.database()
  
  
    db.collection('userInfo').where({
      ID:ID
    }).get({
      success:function(res){
       var place=""
        var Tmp={
          id:null,
        Info:"",
        place:"",
        ed:""
        }
     
      
        var age=res.data[0].education
        var myDate = new Date();//获取系统当前时间
        console.log("读取信息",res.data[0])
        /*
        Tmp.height=res.data[0].height//身高
        Tmp.name=res.data[0].vocation//职业
        Tmp.age=myDate.getFullYear()-res.data[0].bathday[0]//年龄
        Tmp.education=that.data.eductionArry[res.data[0].education]//学历
        Tmp.income=that.data.inComeArry[res.data[0].inCome]//收入
        Tmp.ID=res.data[0].ID//身高
        */
     

       Tmp.id=res.data[0].ID
       Tmp.Info=res.data[0].vocation//职业
       Tmp.place=res.data[0].workPlace[1].name+"-"+res.data[0].workPlace[2].name
       Tmp.ed=that.data.eductionArry[res.data[0].education]//学历
    
       
         that.readImage(res.data[0].ID,Tmp,userTmp,flag)
    
    
    /*
        setTimeout(function () {
          wx.hideLoading()
          that.setData({
            loveMeInfo:userTmp
          })
        }, 2000)*/
      },
      fail:function(e){
        console.log("数据库加载失败",e)
      }
    })
},
//读取用户头像
readImage:function(ID,Tmp,userTmp,flag){
  var that=this
  console.log("原始数据0",ID)
  console.log("原始数据1",Tmp)
  console.log("原始数据2",userTmp)
    const db = wx.cloud.database()
    db.collection('userPhotos').where({
      ID: ID
    }).get({
      success:function(res){
        console.log("自我介绍",res.data.length)
        if(res.data.length==0){//没有用户ID
          console.log("无图片") 
        //  userTmp.push(Tmp)
        }
        else{//已经存在 
        console.log("图片界面",res.data[0].fileID) 
          
        Tmp.urlImage="cloud://ceshi-fdybb.6365-ceshi-fdybb-1302833646/"+res.data[0].fileID[0]
        console.log("最终tmp数据",Tmp)
         userTmp[flag].push(Tmp)
         console.log("最终userTmp数据",userTmp)

         console.log("高度",Math.floor((userTmp[flag].length+1)/2)*550+20)
          wx.hideLoading()
         that.setData({
          loveMeInfo:userTmp,
          loveMeHeight:Math.floor((userTmp[flag].length+1)/2)*550+20
         })
          console.log("用户信息111",Tmp) 
        }
      },
      fail:function(e){
        console.log("数据库加载失败",e)
      }
    })
},
myLovefu:function(e){
  var user=this.data.loveMeInfo
  var num=e.currentTarget.dataset.index
  console.log("跳转数值",e.currentTarget.dataset.index)
  console.log("跳转",user[0][num].id)

  /*
  var id=[0,0]
  id[0]=user[e.currentTarget.dataset.index].ID
  id[1]=this.data.mineID
  console.log("进入",id)*/
  wx.navigateTo({
    url: '../blindCard/index?userID='+user[0][num].id+'&mineID='+this.data.mineID
  });

},
seeMe:function(e){
  var user=this.data.loveMeInfo
  var num=e.currentTarget.dataset.index
  console.log("跳转数值",e.currentTarget.dataset.index)
  console.log("跳转",user[0][num].id)

  /*
  var id=[0,0]
  id[0]=user[e.currentTarget.dataset.index].ID
  id[1]=this.data.mineID
  console.log("进入",id)*/
  wx.navigateTo({
    url: '../blindCard/index?userID='+user[1][num].id+'&mineID='+this.data.mineID
  });

}



})

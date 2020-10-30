// miniprogram/pages/main/mine/index.js
var app = getApp();
Page({

  like:function(){
    wx.navigateTo({
      url: '../love/index?id=0',
    })
  },
  likeed:function(){
    wx.navigateTo({
      url: '../love/index?id=1',
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    urlImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600925623275&di=60db5f6f6b0d18ba0f3cfa416dd51e9e&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F03%2F57%2F11%2F9857a013261b7b6.jpg",//头像
    loveMeNum:[null,null],//我喜欢的人数,喜欢我的
   
    nickName:"空白",
    examineStatus:2,
    myAccount: ["微信号", "手机号", "意见反馈"],
    set:["手机认证","实名认证"],
    pickFunction:["meFunction"],
    mineID:null
  },
  //修改个人资料
  modilyFunction:function(){
    console.log("修改")
    wx.navigateTo({
      url: '../setMe/index',
    })
  },
  meFunction:function(e){
    console.log(e.currentTarget.dataset.index)
    var flag=parseInt(e.currentTarget.dataset.index);
    switch(flag){
      case 0:
        console.log("本人")
        wx.startSoterAuthentication({
          requestAuthModes: ['fingerPrint'],
          challenge: '123456',
          authContent: '请用指纹解锁',
          success(res) {
            console.log("生物认证",res)
          }
       })
        break;
      case 1:
        console.log("择偶")
        wx.navigateTo({
          url: '../../certification/realname/nameNum/index',
        })
        break;
        case 2:
          console.log("设置")
          wx.navigateTo({
            url: '../setLoverRequest/index',
          })
          break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.readExamineStatus("userID")
    this.readMineID()
  },
readLove:function(mineID){
  const that=this
  const db = wx.cloud.database()
  const watcher = db.collection('myLove').where({ID:mineID}).watch({
    onChange: function(snapshot) {
      var numTmp= that.data.loveMeNum

      console.log("喜欢数量",snapshot.docs[0].myLove.length)
      numTmp[0]=snapshot.docs[0].myLove.length
      
        that.setData({
          loveMeNum:numTmp
        })
    },
    onError: function(err) {
      console.error('the watch closed because of error', err)
    }
  })
  const watcher1 = db.collection('loveMe').where({ID:mineID}).watch({
    onChange: function(snapshot) {
      var numTmp= that.data.loveMeNum
      console.log("喜欢数量",snapshot.docs[0].myLove.length)
      numTmp[1]=snapshot.docs[0].myLove.length
        that.setData({
          loveMeNum:numTmp
        })
    },
    onError: function(err) {
      console.error('the watch closed because of error', err)
    }
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    this.readImage("userPhotos")
    //设置头像以及审核状态
   // this.readExamineStatus("userID")
   // this.readImage("userPhotos")
    //读取数量
    //this.readLoveNum("myLove",0)
    //this.readLoveNum("loveMe",1)
    //设置底部导航栏
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 2
    })
  }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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

  },
  //读取头像
  readImage:function(Database){
   var that=this
    const db = wx.cloud.database()
 
    db.collection(Database).where({
      _openid: '{openid}'
    }).get({
      success:function(res){
        var Img=res.data[0].fileID[0]
        console.log("头像",Img)
        that.setData({
          urlImage:Img
        })
        console.log("数据库里的数据",res.data[0].timeStamp)
      },
      fail:function(e){
        console.log("数据库加载失败",e)
      }
    })
  },
  //点击用户头像
  seeMe:function(){
    console.log("看我")
    //读取ID号
    wx.showLoading({
      title: '加载中...',
    })
    this.readuserID("userID")
  },

  readExamineStatus:function(Database){
    var that=this
     const db = wx.cloud.database()
  
     db.collection(Database).where({
       _openid: '{openid}'
     }).get({
       success:function(res){
       
        that.setData({
          examineStatus:res.data[0].review[0]
         })
         console.log("数据库里的数据",res.data[0].review[0])
       },
       fail:function(e){
         console.log("数据库加载失败",e)
       }
     })
   },
  //读取自己的ID号
  readMineID:function(){
    const that=this
    try {
      var value = wx.getStorageSync('MineID')
      if (value) {
        // Do something with return value
        that.data.mineID= value
        that.readLove(Number(value))
       console.log("读取本地MineID",value)
      }
      else{
        //读取数据
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
        
              that.data.mineID=res.data[0].ID
             //存储数据
             try {
              wx.setStorageSync('MineID', res.data[0].ID)
              that.data.mineID= res.data[0].ID
              that.readLove(Number(res.data[0].ID))
            } catch (e) {
              console.error("save error：",e) 
             }
             
            }
          },
          fail:function(e){
            console.log("数据库加载失败",e)
          }
        })

        console.log("不存在MineID",value)
      }
    } catch (e) {
      // Do something when catch error
      console.error("读取异常",e)
    }

  },
   readLoveNum:function(Database,flag){
    var that=this
     const db = wx.cloud.database()
     
     db.collection(Database).where({
      _openid: '{openid}'
     }).get({
       success:function(res){
      var numTmp= that.data.loveMeNum

      console.log("喜欢数量",numTmp)
      numTmp[flag]=res.data[0].myLove.length
        console.log("数据库里的数据333",res.data[0].myLove.length)
        that.setData({
          loveMeNum:numTmp
        })

       },
       fail:function(e){
         console.log("数据库加载失败",e)
       }
     })
   },

   readuserID:function(Database){
    var that=this
     const db = wx.cloud.database()
  
     db.collection(Database).where({
       _openid: '{openid}'
     }).get({
       success:function(res){

       wx.hideLoading({

       })
        wx.navigateTo({
          url: '../blindCard/index?userID='+that.data.mineID+'&mineID='+that.data.mineID
        });
       
         console.log("跳转自己ID",res.data[0].ID)
       },
       fail:function(e){
         console.log("数据库加载失败",e)
       }
     })
   },


})
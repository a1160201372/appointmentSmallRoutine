// miniprogram/pages/chat/im/index.js
Page({

  /**
   * 页面的初始数据
   */
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

    ],//喜欢我的
    myLoveInfo:[],//我喜欢的

    gotoFlag:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.readMineID("userID")

    

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
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 1
    })
  }
  this.data.gotoFlag=0
  
  },
  myLovefu:function(e){
    console.log("测试",e.currentTarget.dataset.index)
 
    //跳转聊天信息
    if(this.data.gotoFlag==0)
    this.readImageTo(Number(this.data.mineID),Number(this.data.loveMeInfo[e.currentTarget.dataset.index]._id)
      ,"13",this.data.loveMeInfo[e.currentTarget.dataset.index].urlImage)

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

  ceshi:function(){
  
 
    
    this.sendTimeFuction()
    
      
   
       


      
      },
      readNew:function(mineID){
        const that=this
        const db = wx.cloud.database()
        const watcher = db.collection('new').where({ID:mineID}).watch({
          onChange: function(snapshot) {
            console.log('snapshot', snapshot.docs[0].myLove)
            var tmp=snapshot.docs[0].myLove
            for(var i=0;i<tmp.length;i++){
              that.show(tmp[i],tmp[i]._id,i,tmp.length)
              that.readInfo(tmp[i])
            }
            setTimeout(function () {
              wx.hideLoading({})
              that.setData({
                loveMeInfo:tmp
              })
            }, 1000)
          
    
          },
          onError: function(err) {
            console.error('the watch closed because of error', err)
          }
        })
      },
      //读取自己ID
      readMineID:function(dbtab){
        const that=this
        try {
          var value = wx.getStorageSync('MineID')
          if (value) {
            // Do something with return value
            that.data.mineID= value
            that.readNew(Number(value))
           console.log("读取本地MineID",value)
          }
          else{
            //读取数据
            const db = wx.cloud.database()
            db.collection(dbtab).where({
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
                 //存储数据
                 try {
                  wx.setStorageSync('MineID', res.data[0].ID)
                  that.data.mineID= res.data[0].ID
                  that.readNew(Number(res.data[0].ID))
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
       //聊天用户
       readInfo:function(mineID){
        const db = wx.cloud.database()
        const _ = db.command
        const that=this
        console.log("聊天信息11",mineID)
        const openID = []
        openID[0]=mineID
        const initList= db.collection('new').where({
          ID: mineID
        }).get({//.orderBy('sendTimeTS', 'desc').
          success:function(res){

          console.log("聊天信息",res.data[0].myLove)
            var tmp=res.data[0].myLove  
            //读取头像
            for(var i=0;i<tmp.length;i++){
              that.show(tmp[i],tmp[i]._id,i,tmp.length)
            }
            setTimeout(function () {
              that.setData({
                loveMeInfo:tmp
              })
            }, 1500)
          },
          fail: console.error
        })
       },
        show:function(arry,ID,i,iMax){
        console.log("i值",i)
        console.log("iMax值",iMax)
        const db = wx.cloud.database()
        const _ = db.command
       // const that_1=that
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
                  arry.urlImage=res.data[0].fileID[0]
                  console.log("图片信息",arry)
                }
              },
              fail:function(e){
                console.log("数据库加载失败",e)
              }
            })

            db.collection('userInfo').where({
              ID: ID
            }).get({
              success:function(res){
                console.log("自我介绍",res.data.length)
                if(res.data.length==0){//没有用户ID
                  console.log("无图片") 
                }
                else{//已经存在 
                  arry.ed=res.data[0].vocation
                  console.log("图片信息",arry)
                }
              },
              fail:function(e){
                console.log("数据库加载失败",e)
              }
            })
      },
      //读取自己的聊天信息
       showInfo:function(){

       },
       ceshi1:function(){
         console.log("测试")
         wx.navigateTo({
          url: '../../chat/room/room?userID='+this.data.userID+'&mineID='+this.data.mineID
        });
       },
            //读取用户图片,用于跳转
      readImageTo:function(ID,userID,mineImg,userImg){
        var that=this
        var openid=this.data.openid
        console.log("图片",this.data.openid) 
          const db = wx.cloud.database()
          db.collection('userPhotos').where({
            ID: ID
          }).get({
            success:function(res){
              var tmp
              console.log("自我介绍",res.data.length)
              if(res.data.length==0){//没有用户ID
                console.log("无图片") 
              }
              else{//已经存在 
              console.log("图片界面",res.data[0].fileID) 
                tmp=res.data[0].fileID[0]
              
                console.log("图片界面sss",tmp) 
              }
              wx.navigateTo({
                url: '../../chat/room/room?userID='+userID//别人ID
                            +'&mineID='+ID//自己ID
                            +'&nickName='+"测试"//昵称
                            +'&userImgOther='+userImg//自己头像
                            +'&userImg='+tmp//别人头像
              });
            },
            fail:function(e){
              console.log("数据库加载失败",e)
            }
          })
     },
})
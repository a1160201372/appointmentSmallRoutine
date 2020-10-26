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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    //this.readMineID("userID")
    const that=this
    const db = wx.cloud.database()
    const watcher = db.collection('new').where({ID:11329}).watch({
      onChange: function(snapshot) {
        console.log('snapshot', snapshot.docs[0].myLove)
        var tmp=snapshot.docs[0].myLove
        for(var i=0;i<tmp.length;i++){
            
          that.show(tmp[i],tmp[i]._id,i,tmp.length)
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
 
  
  },
  myLovefu:function(e){
    console.log("测试",e.currentTarget.dataset.index)
    //跳转聊天信息
    this.readImageTo(this.data.mineID,Number(this.data.loveMeInfo[e.currentTarget.dataset.index]._id)
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
  //阅读发过消息的
  readInfo:function(){

  },
  ceshi:function(){
  
 
    
    this.sendTimeFuction()
    
      
   
       


      
      },
      //读取自己ID
      readMineID:function(Database){
        var that=this
         const db = wx.cloud.database()
      
         db.collection(Database).where({
           _openid: '{openid}'
         }).get({
           success:function(res){
    
             that.data.mineID=res.data[0].ID
             that.readInfo(res.data[0].ID)
            // that.readInfo(res.data[0].ID)
         
             console.log("数据库里的数据",res.data[0])
           },
           fail:function(e){
             console.log("数据库加载失败",e)
           }
         })
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
            }, 500)
          
    
    
          //  that.data.mineID=res.data[0].ID

          //  that.readInfo(res.data[0].ID)
        
           
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
                  arry.urlImage="cloud://ceshi-fdybb.6365-ceshi-fdybb-1302833646/"+res.data[0].fileID[0]
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
                tmp=res.data[0].fileID
                for(var i=0;i<res.data[0].fileID.length;i++)
                {
                  tmp[i]="cloud://ceshi-fdybb.6365-ceshi-fdybb-1302833646/"+res.data[0].fileID[i]
                }
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
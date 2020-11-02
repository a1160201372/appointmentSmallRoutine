const app = getApp()
Page({
  ceshi:function(){
    console.log("测试")
    this.upDataID()
  },
  data: {
    title:"请上传您的正面照",
    headImg:"../../../images/add.png",
    //文件名
    upHeadImg:"",//临时地址
    HeadImgMane:"",//上传文件名
  },
  back:function(){//下一步
    wx.redirectTo({//跳转
      url: '../loverRequest/index'
    })
  },
  //按键进入
  upImg:function(){
   const that=this;
    //选择图片
    that.doChooseHeadImg();
    console.log('选择',  this.data.upHeadImg)
  },
    UpHeadImg:function(){
  },
  //选择图片
  doChooseHeadImg:function(){
    const that=this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        console.log(tempFilePaths);
        that.data.upHeadImg=tempFilePaths

        that.setData({
          headImg:tempFilePaths
        })
        wx.showLoading({
          title: '保存中',
        })
      //上传图片
       var timestamp = Date.parse(new Date());
       var fileName = [  "123"+"/"+"ini"+Math.ceil(Math.random()*99992363)+"_"+ Math.ceil(Math.random()*99992363) +timestamp+"_0.png"]
       that.doUpHeadImg(tempFilePaths,fileName[0])
      }
    })
  },
  doUpHeadImg:function(FilePath,name){
    var that=this
    console.log('上传1',FilePath)
    console.log('上传2', name)
    wx.cloud.uploadFile({
      cloudPath: name,
      filePath: FilePath, // 文件路径
    }).then(res => {
      var fileName=[]
    fileName[0]=res.fileID
      console.log("文件ID",res.fileID)
      that.upDataGande(fileName)
      that.upDataID()
      wx.hideLoading()
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      })
      
    /*  setTimeout(function () {
        wx.switchTab({
          url: '../../main/mine/index'
        })
      }, 2200)*/
      // get resource ID
      console.log(res.fileID)
    }).catch(error => {
      // handle error
      wx.hideLoading()

      wx.showToast({
        title: '保存失败',
        icon: 'loading',
        duration: 2000
      })
    })
  },
  upDataGande:function(fileName){
    var that=this
    console.log("函数")
    console.log("数据")
    const db = wx.cloud.database()
    db.collection('userPhotos').where({
      _openid: '{openid}'
    }).get({
      success:function(res){
       
       
        console.log("数据",fileName)
        if(res.data.length==0){
          
          console.log("函数1")
          db.collection('userPhotos').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              num:1,
              createTime: db.serverDate(),
              fileID:fileName,
            },
            success: function(res) {
              console.log("成功",res)
              
              that.subscribe()
                  
                
            },
            fail: function(res) {
              console.log("失败")
            }
          })
         
        }
        else{//已经存在
        
          console.log("进入")
          db.collection('userPhotos').doc(res.data[0]._id).update({
            data: {
              num:1,
              fileID:fileName,
              createTime: db.serverDate(),
            },
            success: function(res) {
              console.log("成功上传",res)
              that.subscribe()
            },
            fail: function(res) {
              console.log("失败")
            }
          })
          
        }
      },
      fail:function(){
        console.log("数据库加载失败")
      }
    })
  },
  upDataID:function(){
var that=this
    const db = wx.cloud.database()
    const _ = db.command;  
    db.collection('userID').where({
     
    }).get({
      success:function(res){
        var tmp=res.data.length+1000
        console.log("外面tmp",tmp)
        var arry=res.data
        var Arry=[]
        var i=0
       //var tmp=1001
        console.log("openID测试",tmp)
        for(var i=0;i<res.data.length;i++){
          Arry[i]=res.data[i].ID
        }
        Arry.sort((a, b) => a - b);

        console.log("排序",Arry)
        var flag=0
        while(flag!=-1){
          var tmp =Number((Math.random()*(90000-10000+1)+10000).toFixed(0))
    
          flag=find(Arry,tmp)
          
          if(flag==-1){
            console.log("存储ID",tmp)
            that.upDataIDNum("userID",tmp) //用户ID信息
            that.upDataIDNum("userInfo",tmp)//用户基本信息
            that.upDataIDNum("userIntroduce",tmp)//用户自我介绍
            that.upDataIDNum("userOther",tmp)//用户择偶要求
            that.upDataIDNum("userPhotos",tmp)//用户照片
            that.upDataIDNum("userImportant",tmp)//用户的隐私信息（姓名，身份证号）
            that.upDataIDNum("userPayInfo",tmp)//用户支付信息

            
            that.upDataIDNumLove("loveMe",tmp)//关注我的
            that.upDataIDNumLove("myLove",tmp)//我关注的
            that.upDataIDNumLove("new",tmp)//聊天记录

            //广场相关
          }
          
            
        }

        

        //生成ID信息
/*
          that.upDataIDNum("userID",tmp)
          that.upDataIDNum("userInfo",tmp)
          that.upDataIDNum("userIntroduce",tmp)
          that.upDataIDNum("userOther",tmp)
          that.upDataIDNum("userPhotos",tmp)

          that.upDataIDNumLove("loveMe",tmp)
          that.upDataIDNumLove("myLove",tmp)
*/
         //查重
        /* while(randomNum()){

         }*/
          function find(arry,num) {
            var start = 0;
            var flag=0;
            var end =arry.length-1;
            while(start<=end) {//当查找完成时，结束位置会小于起始位置
              //先定义中间值
              var middle = Math.floor((start+end)/2);
              if(num<arry[middle]) {
                //如果要查找的数小于等于中间数则取前半部分
                end = middle-1;
              }else if(num>arry[middle]){
                //如果要查找大于中间数则取后半部分
                start = middle+1;
              }else{
              console.log("你要找的在第"+middle+"号位置");
              flag=middle;
        
                break;
              }
            }
            if(start>end) {
              console.log("该数组中没有您要找的数");
              flag=-1;
            }
            return flag
          }
      },
      fail:function(){
        console.log("数据库加载失败")
        wx.hideLoading()
        wx.showToast({
          icon:none,
          title: '数据库加载失败,请稍后重试',
        })
      }
    })
  },
  upDataIDNum:function(table,ID){
    var that=this
    const db = wx.cloud.database()
    db.collection(table).where({
      _openid: '{openid}'
    }).get({
      success:function(res){
        if(res.data.length==0){
          db.collection(table).add({
            // data 字段表示需新增的 JSON 数据
            data: {
              ID:ID,
            },
            success: function(res) {
              
              console.log("成功",res)
                //
            },
            fail: function(res) {
              console.error("失败",res)
              wx.hideLoading()
              wx.showToast({
                icon:none,
                title: '保存失败,请稍后重试',
              })
            }
          })
        }
        else{//已经存在
          console.log("进入222",res.data[0]._id)
          console.log("进入2dsdsd22",ID)
          db.collection(table).doc(res.data[0]._id).update({
            data: {
              ID:ID,
            },
            success: function(res) {
              console.log("成功上传",res)
            },
            fail: function(res) {
              console.error("失败")
              wx.hideLoading()
              wx.showToast({
                icon:none,
                title: '保存失败,请稍后重试',
              })
            }
          })
        }
      },
      fail:function(){
        console.error("数据库加载失败",table)
        wx.hideLoading()
        wx.showToast({
          icon:none,
          title: '数据库加载失败,请稍后重试',
        })
      }
    })
  },
  upDataIDNumLove:function(table,ID){

    var that=this
    const db = wx.cloud.database()
    db.collection(table).where({
      _openid: '{openid}'
    }).get({
      success:function(res){

        if(res.data.length==0){
          db.collection(table).add({
            // data 字段表示需新增的 JSON 数据
            data: {
              ID:ID,
              myLove:[]
            },
            success: function(res) {
              console.log("成功",res)
                //
            },
            fail: function(res) {
              console.error("失败",res)
              wx.hideLoading()
              wx.showToast({
                icon:none,
                title: '保存失败,请稍后重试',
              })
            }
          })
        }
        else{//已经存在
          console.log("进入222",res.data[0]._id)
          console.log("进入2dsdsd22",ID)
          db.collection(table).doc(res.data[0]._id).update({
            data: {
              ID:ID,
              myLove:[]
            },
            success: function(res) {
              console.log("成功上传",res)
            },
            fail: function(res) {
              console.error("失败")
              wx.hideLoading()
              wx.showToast({
                icon:none,
                title: '保存失败,请稍后重试',
              })
            }
          })
        }
      },
      fail:function(){
        console.error("数据库加载失败")
        wx.hideLoading()
        wx.showToast({
          icon:none,
          title: '数据库加载失败,请稍后重试',
        })
      }
    })
  },
  subscribe:function(){
    wx.showModal({
      title: '温馨提示',
      content: '为更好的促进您与买家的交流，服务号需要在您的书籍成交时向您发送消息',
      confirmText:"同意",
      cancelText:"拒绝",
      success: function (res) {
          if (res.confirm) {
             //调用订阅消息
              console.log('用户点击确定');
              
              //调用订阅
              requestSubscribe();
          } else if (res.cancel) {
              console.log('用户点击取消');
              ///显示第二个弹说明一下
              wx.showModal({
                title: '温馨提示',
                content: '拒绝后您将无法获取实时的与卖家（买家）的交易消息',
                confirmText:"知道了",
                showCancel:false,
                success: function (res) {
                  ///点击知道了的后续操作 
                    setTimeout(function () {
                    wx.switchTab({
                      url: '../../main/mine/index'
                    })
                  }, 1000)
                  ///如跳转首页面 
                }
            });
          }
      }
  })
  function requestSubscribe(){
    console.log("查询权限")
    wx.getSetting({
      withSubscriptions: true,
      success (res) {
        console.log("查询权限1",res)
        if(res.subscriptionsSetting.mainSwitch==false){
          openMySetting()
        }else{
          requestSubscribe()
        }
      }
    })
//没有开启订阅时
  function openMySetting(){
    wx.showModal({
      title: '检测到您没有开启消息订阅，是否前去开启',
    //  content: '为更好的促进您与买家的交流，服务号需要在您的书籍成交时向您发送消息',
      confirmText:"确定",
      cancelText:"取消",
      success: function (res) {
          if (res.confirm) {
             //调用订阅消息
              console.log('用户点击确定');
              wx.openSetting({})        //打开设置界面   
          } else if (res.cancel) {
              console.log('用户点击取消');
              ///显示第二个弹说明一下
              wx.showModal({
                title: '温馨提示',
                content: '拒绝后您将无法获取实时的与卖家（买家）的交易消息',
                confirmText:"知道了",
                showCancel:false,
                success: function (res) {
                  ///点击知道了的后续操作 
                  setTimeout(function () {
                    wx.switchTab({
                      url: '../../main/mine/index'
                    })
                  }, 1000)
                  ///如跳转首页面 
                }
            });
          }
      }
    });
  }
   //添加订阅消息
   function requestSubscribe(){
    wx.requestSubscribeMessage({
      tmplIds: ["nmhJ_6jdqSN3BnSdsosluxTTSaXhpmwupVpd3bPhyRY"],
      success (res) {  
        setTimeout(function () {
        wx.switchTab({
          url: '../../main/mine/index'
        })
      }, 1000) }
    })
  }
  
  }
  },
})
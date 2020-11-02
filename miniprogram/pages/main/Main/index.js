
Page({


  onLoad:function(){
   //this.upDataGande()
  // this.subscribe()
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
                  ///如跳转首页面 
                }
            });
          }
      }
  });
  function requestSubscribe(){
    wx.getSetting({
      withSubscriptions: true,
      success (res) {
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
    })
  }
  
  }
  },
  ceshi:function(){
    wx.cloud.callFunction({
      name: 'sub',
      data: {
        title: "通过审核",
        time: "2019年10月1日",
        content:"个人信息"
      }
    }).then(console.log)

  },
  ceshi1:function(){
    wx.requestSubscribeMessage({
      tmplIds: ["nmhJ_6jdqSN3BnSdsosluxTTSaXhpmwupVpd3bPhyRY"],
      success (res) {  
      }
    })
  },
    //读取数据库，是否完成注册
    upDataGande:function(){
      const db = wx.cloud.database()
      db.collection('userID').where({
        _openid: '{openid}'
      }).get({
        success:function(res){
    
          console.log(res.data.length)
          if(res.data.length==0){
            console.log("未注册完成")
            wx.redirectTo({//跳转
                url: '../../Start/grande/index'
            })
          }
          else{//已经存在
            console.log("已经注册完成")
          wx.switchTab({
              url: '../../main/mine/index'
            })
          }
        },
        fail:function(e){
          console.log("数据库加载失败",e)
          wx.showToast({
            title: '数据库加载错误',
          })
        }
      })
    }
})
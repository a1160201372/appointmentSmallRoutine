//app.js
App({
  globalData:{
    headImage:'1',
    globalGrande:null,
    openid: null
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    this.upDataGande()
    this.globalData = {}
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
       /*    wx.redirectTo({//跳转
              url: '../grande/index'
          })*/
        }
        else{//已经存在
          console.log("已经注册完成")
        /* wx.switchTab({
            url: '../../main/mine/index'
          })*/
        }
      },
      fail:function(){
        console.log("数据库加载失败")
      }
    })
  }

})

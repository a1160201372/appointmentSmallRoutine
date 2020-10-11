Page({
  
  onLoad:function(){
   this.upDataGande()
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
        fail:function(){
          console.log("数据库加载失败")
        }
      })
    }
})
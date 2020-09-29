const app = getApp()
Page({
  data: {
    option:["未婚","离异","丧偶"],
    img:"",
  },
  onLoad:function(){
    if(app.globalData.globalGrande==1){
    this.setData({
      img:"../../../images/marryMan.png"
    })
    }
    else{
      this.setData({
        img:"../../../images/marryWoman.png"
      })
    }
    


  },
  back:function(){//下一步
    wx.redirectTo({//跳转
      url: '../birthday/index'
    })
  },
  flag1:function(e){//女性
    console.log(e.target.dataset.index)

    this.upDataGande(e.target.dataset.index)
   /* wx.redirectTo({//跳转
      url: '../marryTime/index'
    })*/
},

upDataGande:function(flag){
  const db = wx.cloud.database()
  db.collection('userInfo').where({
    _openid: '{openid}'
  }).get({
    success:function(res){

      console.log(res.data.length)
      if(res.data.length==0){
     
        console.log("失败")
      }
      else{//已经存在
        console.log("进入")
        db.collection('userInfo').doc(res.data[0]._id).update({
          data:{
            marryStatus:flag
          },
          success: function(res) {
            console.log("成功",res)
             wx.redirectTo({//跳转
              url: '../marryTime/index'
            })
          },
          fail: function(res) {
            console.log("失败1")
          }
        })
      }
    },
    fail:function(){
      console.log("数据库加载失败")
    }
  })
}
})
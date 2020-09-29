const app = getApp()
Page({
  data: {
    option:["随时","半年内","一年内","两年内","三年内"],
    img:""
  },
  onLoad:function(){
    if(app.globalData.globalGrande==1){
      this.setData({
        img:"../../../images/marryTimeMan.png"
      })
      }
      else{
        this.setData({
          img:"../../../images/marryTimeWoman.png"
        })
      }
  },
  flag1:function(e){

    console.log(e.target.dataset.index)

    this.upDataGande(e.target.dataset.index)
   /* wx.redirectTo({//跳转
      url: '../workPlace/index'
    })*/
},
back:function(){//上一步
  wx.redirectTo({//跳转
    url: '../maritalStatus/index'
  })
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
            marryTime:flag
          },
          success: function(res) {
            console.log("成功",res)
             wx.redirectTo({//跳转
              url: '../workPlace/index'
            })
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
}
})
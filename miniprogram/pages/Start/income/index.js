const app = getApp()
Page({
  data: {
    title:"选择您的月收入",
    option:["1千以下","1~2千","2~3千","3~4千","4~8千","8千~1万","1~2万","2~5万","五万以上"],
    img:"",
  },
  onLoad:function(){
    if(app.globalData.globalGrande==1)
    {
    this.setData({
      img:"../../../images/incomeMan.png"
    })
    }
    else{
      this.setData({
        img:"../../../images/incomeWoman.png"
      })
    }
  },
  flag1:function(e){//
    console.log(e.target.dataset.index)
    this.upDataGande(e.target.dataset.index)
   /* wx.redirectTo({//跳转
      url: '../houseCondition/index'
    })*/
},
back:function(){//下一步
  wx.redirectTo({//跳转
    url: '../vocation/index'
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
            inCome:flag
          },
          success: function(res) {
            console.log("成功",res)
             wx.redirectTo({//跳转
              url: '../houseCondition/index'
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
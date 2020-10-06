const app = getApp()
Page({
  data: {
    title:"选择您的购车情况",
    option:["无车","已购车-经济型","已购车-中档型","已购车-豪华型","单位用车","需要时购置"],
    img:"",
  },
  onLoad:function(){
    if(app.globalData.globalGrande==1)
    {
    this.setData({
      img:"../../../images/carMan.png"
    })
    }
    else{
      this.setData({
        img:"../../../images/carWoman.png"
      })
    }
  },
  flag1:function(e){//女性
    console.log(e.target.dataset.index)
    wx.showLoading({
      title: '保存中',
    })
    this.upDataGande(e.target.dataset.index)
   /* wx.redirectTo({//跳转
      url: '../loverRequest/index'
    })*/

},
back:function(){//下一步
  wx.redirectTo({//跳转
    url: '../houseCondition/index'
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
        wx.hideLoading()
        wx.showToast({
          icon:none,
          title: '未找到您的数据,请重新注册',
        })
      }
      else{//已经存在
        console.log("进入")
        db.collection('userInfo').doc(res.data[0]._id).update({
          data:{
            car:flag
          },
          success: function(res) {
            console.log("成功",res)
             wx.redirectTo({//跳转
              url: '../loverRequest/index'
            })
          },
          fail: function(res) {
            console.log("失败")
            wx.hideLoading()
            wx.showToast({
              icon:none,
              title: '数据保存失败,请稍后重试',
            })
          }
        })
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
}
})
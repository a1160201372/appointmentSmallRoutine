const app = getApp()
Page({
  data: {
    title:"选择您的购房情况",
    option:["已购房(有贷款)","已购房(无贷款)","有能力购房","无房","无房希望对方解决","无房希望双方解决","与父母同住","独自租房","与人合租","住亲朋家","住单位房"],
    img:"",
  },
  onLoad:function(){
    if(app.globalData.globalGrande==1)
    {
    this.setData({
      img:"../../../images/houseMan.png"
    })
    }
    else{
      this.setData({
        img:"../../../images/houseWoman.png"
      })
    }
  },
  flag1:function(e){//选中
    console.log(e.target.dataset.index)
    wx.showLoading({
      title: '保存中',
    })
    this.upDataGande(e.target.dataset.index)

 /*   wx.redirectTo({//跳转
      url: '../carCondition/index'
    })*/
},
back:function(){//下一步
  wx.redirectTo({//跳转
    url: '../income/index'
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
        wx.hideLoading()
        wx.showToast({
          icon:none,
          title: '未找到您的数据,请稍后重新注册',
        })
        console.log("失败")
      }
      else{//已经存在
        console.log("进入")
        db.collection('userInfo').doc(res.data[0]._id).update({
          data:{
            house:flag
          },
          success: function(res) {
            console.log("成功",res)
             wx.redirectTo({//跳转
              url: '../carCondition/index'
            })
          },
          fail: function(res) {
            console.log("失败1")
            wx.hideLoading()
            wx.showToast({
              icon:none,
              title: '保存数据错误,请稍后重试',
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
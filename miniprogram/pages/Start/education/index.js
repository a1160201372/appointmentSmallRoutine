const app = getApp()
Page({
  data: {
    title:"选择您的学历",
    option:["初中","高中","大专","本科","硕士","博士"],
    img:"",
  },
  onLoad:function(){

    if(app.globalData.globalGrande==1)
    {
    this.setData({
      img:"../../../images/educationMan.png"
    })
    }
    else{
      this.setData({
        img:"../../../images/educationWoman.png"
      })
    }

  },
  flag1:function(e){//下一步
 
    console.log(this.data.option[e.target.dataset.index])
    wx.showLoading({
      title: '保存中',
    })
    this.upDataGande(e.target.dataset.index)

  /*  wx.redirectTo({//跳转
      url: '../heightAndWeight/index'
    })*/
},
back:function(){//上一步
  wx.redirectTo({//跳转
    url: '../workPlace/index'
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
            education:flag
          },
          success: function(res) {
            console.log("成功",res)
             wx.redirectTo({//跳转
              url: '../heightAndWeight/index'
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
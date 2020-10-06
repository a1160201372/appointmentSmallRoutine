const app = getApp()
Page({
  data: {
    title:"您的体重（Kg）：",
    column:[40,41,42,43,44],//列
    row:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],//行
    img:"",
  },
  onLoad:function(){//图片
    if(app.globalData.globalGrande==1)
    {
    this.setData({
      img:"../../../images/weightMan.png"
    })
    }
    else{
      this.setData({
        img:"../../../images/weightWoman.png"
      })
    }
  },
  flag1:function(e){
    var that=this
    var id = e.currentTarget.dataset.id;
 /*   var  tmp="您选择的身高为："+id+"Kg\n"
    wx.showModal({
      title: '是否保存',
      content: tmp,
      confirmText:"保存",
      success (res) {
        if (res.confirm) {//保存
        
          console.log("点击",id);*/
          wx.showLoading({
            title: '保存中',
          })
          that.upDataGande(id)

/*
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })*/
  },
  back:function(){//下一步
    wx.redirectTo({//跳转
      url: '../education/index'
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
              weight:flag
            },
            success: function(res) {
              console.log("成功",res)
               wx.redirectTo({//跳转
                url: '../vocation/index'
              })
            },
            fail: function(res) {
              console.log("失败")
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
        console.log("数据库加载失败")
        wx.hideLoading()
        wx.showToast({
          icon:none,
          title: '数据库加载失败,请稍后重试',
        })
      }
    })
  },
})
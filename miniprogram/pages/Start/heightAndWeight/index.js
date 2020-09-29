const app = getApp()
Page({
  data: {
    title:"您的身高（cm）：",
    column:[140,141,142,143,144],//列
    row:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],//行
    img:"",
  },
  onLoad:function(){
    if(app.globalData.globalGrande==1)
    {
    this.setData({
      img:"../../../images/heightMan.png"
    })
    }
    else{
      this.setData({
        img:"../../../images/heightWoman.png"
      })
    }
  },
  flag1:function(e){
    var that=this
    var id = e.currentTarget.dataset.id;
    var  tmp="您选择的身高为："+id+"cm\n"
    wx.showModal({
      title: '是否保存',
      content: tmp,
      confirmText:"保存",
      success (res) {
        if (res.confirm) {//保存
        
          console.log("点击",id);
          that.upDataGande(id)


        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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
       
          console.log("失败")
        }
        else{//已经存在
          console.log("进入")
          db.collection('userInfo').doc(res.data[0]._id).update({
            data:{
              height:flag
            },
            success: function(res) {
              console.log("成功",res)
               wx.redirectTo({//跳转
                url: '../vocation/index'
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
  },
})
const app = getApp()
Page({
	data: {
			citySelectOnShow: false,
			img:""
	},
	onLoad:function(){
    if(app.globalData.globalGrande==1){
      this.setData({
        img:"../../../images/workPlaceMan.png"
      })
      }
      else{
        this.setData({
          img:"../../../images/workPlaceWoman.png"
        })
      }
  },
	citySelectData(e) {
      console.log("测试",e.detail);
    this.upDataGande(e.detail.data)

      /*
		  wx.redirectTo({//跳转
				url: '../education/index'
			})*/
	},
	back:function(){//下一步
    wx.redirectTo({//跳转
      url: '../marryTime/index'
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
              workPlace:flag
            },
            success: function(res) {
              console.log("成功",res)
               wx.redirectTo({//跳转
                url: '../education/index'
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
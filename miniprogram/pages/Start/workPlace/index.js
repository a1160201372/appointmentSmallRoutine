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
		  wx.redirectTo({//跳转
				url: '../education/index'
			})
	},
	back:function(){//下一步
    wx.redirectTo({//跳转
      url: '../marryTime/index'
    })
  },
})
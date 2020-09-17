Page({
	data: {
			citySelectOnShow: false
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
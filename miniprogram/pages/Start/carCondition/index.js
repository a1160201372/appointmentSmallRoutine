const app = getApp()
Page({
  data: {
    title:"选择您的购车情况",
    option:["无车","已购车-经济型","已购车-中档型","已购车-豪华型","单位用车","需要时购置"]
  },
  flag1:function(){//女性
    console.log('123');
    wx.redirectTo({//跳转
      url: '../loverRequest/index'
    })
},
back:function(){//下一步
  wx.redirectTo({//跳转
    url: '../houseCondition/index'
  })
},
})
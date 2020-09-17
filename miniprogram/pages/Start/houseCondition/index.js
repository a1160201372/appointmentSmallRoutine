const app = getApp()
Page({
  data: {
    title:"选择您的购房情况",
    option:["已购房{有贷款}","已购房{无贷款}","有能力购房","无房","无房希望对方解决","无房希望双方解决","与父母同住","独自租房","与人合租","住亲朋家","住单位房"],
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
  flag1:function(){//女性
    console.log('123');
    var onOff = this.data.onOff;
    this.setData({text:"hello",onOff:!onOff});
    wx.redirectTo({//跳转
      url: '../carCondition/index'
    })
},
back:function(){//下一步
  wx.redirectTo({//跳转
    url: '../income/index'
  })
},
})
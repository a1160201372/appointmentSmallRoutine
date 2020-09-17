const app = getApp()
Page({
  data: {
    text: "你好",
    onOff: false,
    option:["随时","半年内","一年内","两年内","三年内"],
    img:""
  },
  onLoad:function(){
    this.setData({
      img:"../../../images/marryTimeMan.png"
    })
  },
  flag1:function(){//女性
    console.log('123');
    var onOff = this.data.onOff;
    this.setData({text:"hello",onOff:!onOff});
    wx.redirectTo({//跳转
      url: '../workPlace/index'
    })
},
back:function(){//下一步
  wx.redirectTo({//跳转
    url: '../maritalStatus/index'
  })
},
})
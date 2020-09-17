const app = getApp()
Page({
  data: {
    text: "你好",
    onOff: false,
    option:["随时","半年内","一年内","两年内","三年内"],
    img:""
  },
  onLoad:function(){
    if(app.globalData.globalGrande==1){
      this.setData({
        img:"../../../images/marryTimeMan.png"
      })
      }
      else{
        this.setData({
          img:"../../../images/marryTimeWoman.png"
        })
      }
  },
  flag1:function(){
    console.log('123');

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
const app = getApp()
Page({
  data: {
    title:"选择您的月收入",
    option:["1千以下","1~2千","2~3千","3~4千","4~8千","8千~1万","1~2万","2~5万","五万以上"],
    img:"",
  },
  onLoad:function(){
    if(app.globalData.globalGrande==1)
    {
    this.setData({
      img:"../../../images/incomeMan.png"
    })
    }
    else{
      this.setData({
        img:"../../../images/incomeWoman.png"
      })
    }
  },
  flag1:function(){//
    console.log('123');
    var onOff = this.data.onOff;
    this.setData({text:"hello",onOff:!onOff});
    wx.redirectTo({//跳转
      url: '../houseCondition/index'
    })
},
back:function(){//下一步
  wx.redirectTo({//跳转
    url: '../vocation/index'
  })
},
})
const app = getApp()
Page({
  data: {
    title:"选择您的学历",
    option:["初中","高中","大专","本科","硕士","博士"],
    img:"",
  },
  onLoad:function(){

    if(app.globalData.globalGrande==1)
    {
    this.setData({
      img:"../../../images/educationMan.png"
    })
    }
    else{
      this.setData({
        img:"../../../images/educationWoman.png"
      })
    }

  },
  flag1:function(){//女性
    console.log('123');
    var onOff = this.data.onOff;
    this.setData({text:"hello",onOff:!onOff});
    wx.redirectTo({//跳转
      url: '../heightAndWeight/index'
    })
},
back:function(){//下一步
  wx.redirectTo({//跳转
    url: '../workPlace/index'
  })
},
})
const app = getApp()
Page({
  data: {
    text: "你好",
    onOff: false,
    option:["未婚","离异","丧偶"],
    img:"",
  },
  onLoad:function(){
    if(app.globalData.globalGrande==1){
    this.setData({
      img:"../../../images/marryMan.png"
    })
    }
    else{
      this.setData({
        img:"../../../images/marryWoman.png"
      })
    }
    


  },
  back:function(){//下一步
    wx.redirectTo({//跳转
      url: '../birthday/index'
    })
  },
  flag1:function(){//女性
    console.log('123');
    var onOff = this.data.onOff;
    this.setData({text:"hello",onOff:!onOff});
    wx.redirectTo({//跳转
      url: '../marryTime/index'
    })
}
})
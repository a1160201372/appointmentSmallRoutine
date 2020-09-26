const app = getApp()

Page({
  data: {
    text: "你好",
    onOff: false,
    timer:'',//定义定时器形参，为空字符在这里插入代码片
  },
  onLoad:function(){
 
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {

        console.error('[云函数] [login] 调用失败', err)
     
      }
    })
  },

  onHide: function () { 
    var that = this;
    clearInterval(that.data.timer); //页面跳转到其它页面后,为隐藏状态，需要清除定时器
  },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      var that=this;
      clearInterval(that.data.timer); //页面未加载时，需要清除定时器
    },
       /**
     * 定时器函数--每隔一秒循环执行函数体
     */
    loop: function(e) {
        var that = this;
        var count = 0
        var i = setInterval(function() {
            count++
            if (count >= 0) {
            console.log(count)
            }
            if (count >= 6) {
            clearInterval(i)
            }
        }, 1000) //定时器每秒执行一次
        that.setData({timer:i})//给定时器赋值,在该页面跳转到其它页面后,在onHide和onUnload中清除该值
      },
  man:function(){//男性
      console.log('123');
      var onOff = this.data.onOff;
      this.setData({text:"hello",onOff:!onOff});
      app.globalData.globalGrande=1
      wx.redirectTo({//跳转
        url: '../birthday/index'
      })
  },
 

    
    
  woman:function(){//女性
    console.log('123');
    var onOff = this.data.onOff;
    this.setData({text:"hello",onOff:!onOff});
    app.globalData.globalGrande=2
    wx.redirectTo({//跳转
      url: '../birthday/index'
    })
}
})
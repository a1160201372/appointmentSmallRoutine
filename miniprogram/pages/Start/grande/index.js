const app = getApp()
Page({
  data: {
    timer:'',//定义定时器形参，为空字符在这里插入代码片
  },
  //直接显示
  onShow: function () {
  /*  wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.showModal({
          showCancel:false,
          title: '提示',
          content:"读取用户信息错误，请检查您的网络状态。"
        })
      }
    })*/
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
  man:function(){//男性
      console.log('男性');
      var onOff = this.data.onOff;
     
      app.globalData.globalGrande=1
      this.upDataGande(0)
      wx.redirectTo({//跳转
        url: '../birthday/index'
      })
  },
  woman:function(){//女性
    console.log('女性');
    var onOff = this.data.onOff;
 
    app.globalData.globalGrande=2
    this.upDataGande(1)
    wx.redirectTo({//跳转
      url: '../birthday/index'
    })
},

upDataGande:function(sex){
  console.log("函数")
  const db = wx.cloud.database()
  db.collection('userInfo').where({
    _openid: '{openid}'
  }).get({
    success:function(res){

      console.log(res.data.length)
      if(res.data.length==0){
        console.log("函数1")
        db.collection('userInfo').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            grande:sex,
          }
        })
      }
      else{//已经存在
        console.log("进入",res.data[0]._id)
        app.globalData.openid = res.data[0]._openid
        db.collection('userInfo').doc(res.data[0]._id).update({
          data:{
            grande:sex
          },
          success: function(res) {
            console.log("成功",res)
          },
          fail: function(res) {
            console.log("失败",res)
          }
        })
      }
    },
    fail:function(e){
      console.log("数据库加载失败",e)
    }
  })
}
})
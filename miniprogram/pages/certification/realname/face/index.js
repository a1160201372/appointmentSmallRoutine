// miniprogram/pages/certification/realname/nameNum/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tital:"请点击“开始验证”按钮",
    countdown:false,
    countdownNum:3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  startFace:function(){
    console.log("开始验证")
    this.setData({
      countdown:true
    })
    this.countdown()
  },
  countdown:function(){
    var that=this
    that.setData({
      countdownNum:3
    })
    setTimeout(function () {
      that.setData({
        countdownNum:2
      })
    }, 1000)
    setTimeout(function () {
      that.setData({
        countdownNum:1
      })
    }, 2000)
    setTimeout(function () {
      that.setData({
        countdown:false
      })
    }, 3000)
  }
})
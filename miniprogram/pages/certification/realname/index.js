// miniprogram/pages/certification/realname/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  ceshi:function(){
    console.log("测试")
    wx.chooseVideo({
      sourceType: ['camera'],
      maxDuration: 60,
      camera: 'front',
      success(res) {
        console.log(res.tempFilePath)
      }
    })
  },
  upVideo:function(){

  },
  takePhoto() {
    const ctx = wx.createCameraContext()
 
    ctx.startRecord({
 
      timeoutCallback:3,
      success: (res) => {
        console.log("录像正确",res)
      },
      fail: (res) => {
        console.error("录像错误",res)
      }
    })
  },
  error(e) {
    console.log(e.detail)
  }
  

})
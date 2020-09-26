// miniprogram/pages/main/mine/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600925623275&di=60db5f6f6b0d18ba0f3cfa416dd51e9e&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F03%2F57%2F11%2F9857a013261b7b6.jpg",//头像
    loveMeNum:4,//我喜欢的人数
    loveOtherNum:44,//喜欢我的用户
    nickName:"空白",
    examineStatus:false,
    myAccount: ["微信号", "手机号", "意见反馈"],
    set:["手机认证","实名认证"],
    pickFunction:["meFunction"],
  },
  //修改个人资料
  modilyFunction:function(){
    console.log("修改")
    wx.navigateTo({
      url: '../setMe/index',
    })
  },
  meFunction:function(e){
    console.log(e.currentTarget.dataset.index)

    var flag=parseInt(e.currentTarget.dataset.index);
    switch(flag){
      case 0:
        console.log("本人")
      /*  wx.navigateTo({
          url: '../setMe/index',
        })*/
        break;
      case 1:
        console.log("择偶")
      /*  wx.navigateTo({
          url: '../../Start/loverRequest/index',
        })*/
        break;
        case 2:
          console.log("设置")
          wx.navigateTo({
            url: '../setLoverRequest/index',
          })
          break;
    }
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
    //设置头像

console.log(app.globalData); // 调用全局变量
//先给全局变量赋值

    var tmp=app.globalData.headImage
    console.log("tmp",tmp)
    this.setData({
      urlImage:tmp
    })
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 1
    })
  }
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

  }
})
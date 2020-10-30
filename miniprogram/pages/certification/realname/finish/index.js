// miniprogram/pages/certification/realname/nameNum/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[
      ["姓名","身份证号"],
      ["",""]
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("姓名：",options.name)
    console.log("身份证号：",options.IDcard)

    this.dealInfo(options.name,options.IDcard,false)
  },
  dealInfo:function(name,IDcard,Flag){
    var info=this.data.info
    var start=IDcard.slice(0,6)
    var end=IDcard.slice(14)
    const genderID=Number(IDcard[16]%2)
    var grendArry=["女士","先生"]
    if(Flag==false){
      info[1][0]=name[0]+grendArry[genderID]
      info[1][1]=start+"********"+end
    }else{
      info[1][0]=name
      info[1][1]=IDcard
    }
this.setData({
  info
})

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
  bindKeyProfession:function(e){
    this.data.IDcard=e.detail.value
  },
})
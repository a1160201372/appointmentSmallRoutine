// miniprogram/pages/main/setMe/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgbox: [],//选择图片
    fileIDs: [],//上传云存储后的返回值
    examineFlag:1,
    array:['请选择','高中及以下','专科','本科'],
    region: ['山东省', '济南市', '市中心'],
    sex:['男','女'],
    sexFlag:0,
    customItem: '全部',
    date: '1990-01',
    height_array:[],
    height_num:10,
    basicInfo:["性别","年龄","学历","居住地","身高","职业"],
    educationNum:0,
    bindKeyProfession:'',
    imgArray:[],
    imgNum:0,
    userImg:["cloud://ceshi-fdybb.6365-ceshi-fdybb-1302833646/my-image.jpg",""],
    tempFilePaths1:[],
    stampImg:"",
    openID:"",
    type:0,
    head:"",
    pickTmp:["","",""],
    pickFlag:false,
    saveFlag:false,
  },
  //隐藏遮罩
  hideModal: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(400).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
       // animationData: animation.export(),
        type: false
      })
    }.bind(this), 200)
  },
  //点击选项
  pickFunction:function(e){
      console.log(e.currentTarget.dataset.index)
      var flag=parseInt(e.currentTarget.dataset.index);
   
      this.data.saveFlag=false
      this.data.pickFlag=true
    switch(flag){
      case 1:
        //显示
        this.showPopup(1)
     
        console.log("性别");
        break;
        
    }
  },
  //显示遮罩
  showPopup:function(a){
     //设置type
     var tmp=[1,2];

     // 显示遮罩层
     var animation = wx.createAnimation({
       duration: 200,
       timingFunction: "linear",
       delay: 0
     })
     this.animation = animation
     animation.translateY(300).step()
     this.setData({
       animationData: animation.export(),
       type: a,
       row:tmp
     })
 
 
 
 
     setTimeout(function() {
       animation.translateY(0).step()
       this.setData({
         animationData: animation.export()
       })
     }.bind(this), 200)
  },
  //点击保存

  bindPickerChangeEducation:function(e){
    this.setData({
      educationNum:e.detail.value
    })
  },
  
  bindPickerChangeSex:function(e){
    this.setData({
      sexFlag:e.detail.value
    })
  },

  
  bindPickChangeHabitation:function(e){
    this.setData({
      region:e.detail.value
    })
  },
  bindPickChangeBirthday:function(e){
    this.setData({
      date:e.detail.value
    })
  },
  bindPickerChangeHeight:function(e){
    this.setData({
      height_num:e.detail.value
    })
  },
  bindKeyProfession:function(e){
    this.data.bindKeyProfession = e.detail.value;
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
    var tmp=[]
    for(var i=150;i<210;i++)
    {
      tmp=   tmp.concat(i+"cm");
    }
    this.setData({
      height_array:tmp
    })
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
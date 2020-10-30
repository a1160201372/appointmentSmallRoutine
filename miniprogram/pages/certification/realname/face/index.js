// miniprogram/pages/certification/realname/nameNum/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    IDcard:'',
    name:"",
    cameraFlag:true,
    tital:"请点击“开始验证”按钮",
    countdown:false,
    countdownNum:3,
    mainFlag:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ctx = wx.createCameraContext()
    console.log("姓名1",(options.name))
   console.log("身份证号1",(options.IDcard))
   this.data.IDcard=options.IDcard
   this.data.name=options.name

   /*this.data.IDcard="372928199712014411"
   this.data.name="彭升智"*/
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
 
    this.countdown()
  },
  countdown:function(){
    if(this.data.mainFlag==false)
    {
      this.setData({
        countdown:true
      })
      this.data.mainFlag=true
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
          countdown:false,
          tital:"正在采集信息..."
        })
        that.startVideo()
      }, 3000)
      setTimeout(function () {
        that.setData({
          tital:"采集完毕！",
        })
        wx.showLoading({
          title: '正在认证...',
        })
        that.stoptVideo()//停止录像，并上传对比。
      }, 8000)
    }
  },
  //开始录像
  startVideo:function(){
    this.ctx.startRecord({
      success: (res) => {
        console.log("录像正确",res)
      },
      fail: (res) => {
        console.error("录像错误",res)
      }
    })
  },
  //停止录像
  stoptVideo:function(){
    const that=this
    this.ctx.stopRecord({
      success: (res) => {
        console.log("录像正确结束",res.tempVideoPath)
        const Video= wx.getFileSystemManager().readFileSync(res.tempVideoPath,'base64')
        //wx.hideLoading()
      
       that.upRealNameData(Video,that.data.name,that.data.IDcard)
       // that.upRealNameData("Video","彭升智","372928199712014411")
      },
      fail: (res) => {
        console.error("录像错误结束",res)
      }
    })
  },
  //上传对比
  upRealNameData:function(Video,name,IDcard){
    const that=this
    this.setData({
      cameraFlag:false
    })
    setTimeout(function () {
      wx.hideLoading()
      console.log("视频编码",Video)
      console.log("姓名",name)
      console.log("身份证号",IDcard)
      that.saveInfo("userImportant",name,IDcard)
      wx.redirectTo({
        url: '../finish/index?name='+name+'&IDcard='+IDcard
      })
    }, 2000)
  },
  //上传数据库
  saveInfo:function(table,name,IDcard){
    var that=this
    const db = wx.cloud.database()
    db.collection(table).where({
      _openid: '{openid}'
    }).get({
      success:function(res){
        if(res.data.length==0){
          wx.showToast({
            icon:none,
            title: '数据库异常，没有找到您的信息',
          })
        }
        else{//已经存在
          db.collection(table).doc(res.data[0]._id).update({
            data: {
              name:name,
              IDcard:IDcard,
            },
            success: function(res) {
              console.log("成功上传",res)
            },
            fail: function(res) {
              console.error("失败")
              wx.hideLoading()
              wx.showToast({
                icon:none,
                title: '保存失败,请稍后重试',
              })
            }
          })
        }
      },
      fail:function(){
        console.error("数据库加载失败")
        wx.hideLoading()
        wx.showToast({
          icon:none,
          title: '数据库加载失败,请稍后重试',
        })
      }
    })
  },
  //上传认证状态
  
})
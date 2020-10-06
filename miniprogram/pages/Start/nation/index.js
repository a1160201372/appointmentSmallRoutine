// miniprogram/pages/Start/nation/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    years:["汉族","蒙古族","回族","藏族","维吾尔族",
    "苗族","彝族","壮族","布依族","朝鲜族","满族","侗族",
    "瑶族","白族","土家族","哈尼族","哈萨克族","傣族","黎族",
    "傈僳族","佤族","畲族","高山族","拉祜族","水族","东乡族",
    "纳西族","景颇族","柯尔克孜族", "土族","达斡尔族","仫佬族",
    "羌族","布朗族","撒拉族","毛南族","仡佬族","锡伯族","阿昌族",
    "普米族","塔吉克族","怒族", "乌孜别克族","俄罗斯族","鄂温克族",
    "德昂族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族",
    "赫哲族","门巴族","珞巴族","基诺族"],//民族
    nationNum:0,
    pickStart:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(){
    if(app.globalData.globalGrande==1){
      this.setData({
        img:"../../../images/marryTimeMan.png"
      })
      }
      else{
        this.setData({
          img:"../../../images/marryTimeWoman.png"
        })
      }
  },
  bindChange: function (e) {
    const val = e.detail.value
console.log(val)
    this.setData({
      nationNum: val,
      pickStart:false
    })
  },
  pickstartF:function(e){
    this.setData({
      pickStart:true
    })
  },
  picksendF:function(){
    this.setData({
      pickStart:false
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
  next:function(){//下一步
   
  
    if(this.data.pickStart==false){//执行
      //检查是日期是否合法
        //上传数据库
        /*
        wx.showLoading({
          title: '保存中',
        })*/
        wx.showLoading({
          title: '保存中',
        })
     this.upDataGande()

    }
    else{
      wx.showToast({
        title: '你点击太快了',
        icon:'none',
        duration: 2000
      })
    }
  },

  upDataGande:function(){
     
    var flag=false
   

    var that=this
    const db = wx.cloud.database()
    db.collection('userInfo').where({
      _openid: '{openid}'
    }).get({
      success:function(res){
        flag=true
        console.log(res.data.length)
        if(res.data.length==0){
          console.log("数据库异常请重新注册")
          wx.hideLoading()
          wx.showToast({
            icon:none,
            title: '未找到用户数据,请稍后重新注册',
          })
        }
        else{//已经存在
          var nationTmp=that.data.nationNum
          console.log("进入",that.data.nationNum)
          db.collection('userInfo').doc(res.data[0]._id).update({
            data:{
              nation:nationTmp
            },
            success: function(res) {
              console.log("成功",res)   
              wx.hideLoading()
              wx.redirectTo({//跳转
                url: '../maritalStatus/index'
              })
            },
            fail: function() {
              console.log("失败")
              wx.hideLoading()
              wx.showToast({
                icon:none,
                title: '数据保存,请稍后重试',
              })
            }
          })
        }
      },
      fail:function(){
        console.log("数据库加载失败")
        wx.hideLoading()
        wx.showToast({
          icon:none,
          title: '数据库加载失败,请稍后重试',
        })
      }
    }) 
  },
  back:function(){//下一步
    wx.redirectTo({//跳转
      url: '../birthday/index'
    })
  },
})
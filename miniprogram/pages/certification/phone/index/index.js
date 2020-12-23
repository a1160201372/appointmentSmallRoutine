// miniprogram/pages/certification/realname/nameNum/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vocation:'',
    IDcard:'',
    mineID:'',
    name:'',
    telValue:undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.readMineID()
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
  getPhoneNumber (e) { 
    const that =this
    try {
    wx.cloud.callFunction({
      name: 'phone',
      data: {
        phone: wx.cloud.CloudID(e.detail.cloudID), // 这个 CloudID 值到云函数端会被替换
        obj: {
          shareInfo: wx.cloud.CloudID('yyy'), // 非顶层字段的 CloudID 不会被替换，会原样字符串展示
        }
      },
        success: res => {
        console.log('[本地 [login] user openid: ', res.result.phone.data)
      //  console.log('国家代号 ', res.result.phone.data.countryCode)
        if(res.result.phone.data!=undefined){
          console.log("获取成功")
          if(res.result.phone.data.countryCode=="86"){
            //存储
            that.writePhoneNum(res.result.phone.data)
           
          }
          else{
            wx.showToast({
              title: '请使用中国的手机号',
            })
          }
        }else{
          console.log("未获取")
          wx.showToast({
            title: '未获取到手机号',
            icon:"none"
          })
        }

      
        wx.hideLoading({  })
     
      },
   
    })
  }catch (e) {
    // Do something when catch error
    console.error("读取异常",e)
    wx.hideLoading({  })
    wx.showToast({
      title: '认证异常',
    })
  }
  },
  buttonNext:function(e){
    wx.showLoading({
      title: '验证中',
    })
  },
  //读取自己的ID号
  readMineID:function(){
    const that=this
    try {
      var value = wx.getStorageSync('MineID')
      if (value) {
        // Do something with return value
        that.data.mineID= value
       console.log("读取本地MineID成功")
      }
      else{
        //读取数据
        const db = wx.cloud.database()
        db.collection('userInfo').where({
          _openid: '{openid}'
        }).get({
          success:function(res){
  
            if(res.data.length==0){//没有用户ID
              console.error("没有用户ID信息") 
            }
            else{//已经存在 
              that.data.mineID=res.data[0].ID
             //存储数据
             try {
              wx.setStorageSync('MineID', res.data[0].ID)
              that.data.mineID= res.data[0].ID

            } catch (e) {
              console.error("save error：",e) 
             }    
            }
          },
          fail:function(e){
            console.error("数据库加载失败",e)
          }
        })
     
      }
    } catch (e) {
      // Do something when catch error
      console.error("读取异常",e)
    }
  },
   //保存自我介绍
   writePhoneNum:function(
    phoneNum
  ){
  console.log("函数")
  const that = this
  const db = wx.cloud.database()
  try{
    db.collection('userImportant').where({
      ID: this.data.mineID
    }).get({
      success:function(res){
  
        console.log(res.data.length)
        if(res.data.length==0){
  
  
          db.collection('userImportant').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              ID:that.data.mineID,
              phoneNum:phoneNum
            },
            success: function(res) {
              console.log("成功",res)
              wx.showToast({
                title: '认证成功',
              })
            },
          })
        }
        else{//已经存在
          db.collection('userImportant').doc(res.data[0]._id).update({
            data: {
              phoneNum:phoneNum
            },
            success: function(res) {
              console.log("成功",res)
              wx.showToast({
                title: '认证成功',
              })
              setTimeout(function () {
                wx.switchTab({
                  url: '../../../main/mine/index'
                })     
              }, 2000)
            },
          })
        }
      },
    })
  }catch (e) {
    console.error("save error：",e) 
   }    

  },

})
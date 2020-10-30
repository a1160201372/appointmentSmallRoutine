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
  buttonNext:function(){
    //检测与设置的是否相同
    if(this.data.name){
      this.checkMain(this.data.IDcard)
    }else{
      wx.showToast({
        title: '姓名不能为空',
        icon:"none",
        duration:2000,
      })
    }
  },
//检查身份证号的合法性
  checkMain:function(IdNumber){
  
    if(IdNumber.length!=18)
    {
      wx.showToast({
        title: '请输入正确的身份证号',
        icon:"none"
      })
    }else{
      const coefficient=[
        7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2
      ]
      const checkBitArry=[
        '1','0','X','9','8','7','6','5','4','3','2'
      ]
      var checkBitTmp=0
      for(var i=0;i<17;i++){
        checkBitTmp=IdNumber[i]*coefficient[i]+checkBitTmp
      }
      var checkBit=checkBitTmp%11
      if(IdNumber[17]==checkBitArry[checkBit]){
          this.checkBirthday(IdNumber)
     
      }else{
        wx.showToast({
          title: '请输入正确的身份证号',
          icon:"none"
        })
      }
    }
  },
  bindKeyProfessionName:function(e){
    this.data.name=e.detail.value
  },
  checkBirthday:function(IdNumber){
    //分离出年月日7-14
    const yearID=Number(IdNumber[6]+IdNumber[7]+IdNumber[8]+IdNumber[9])
    const monthID=Number(IdNumber[10]+IdNumber[11])
    const dayID=Number(IdNumber[12]+IdNumber[13])
    var genderID=Number(IdNumber[16]%2)
    const that=this
    if(genderID==0){
      genderID=1
    }else if(genderID==1){
      genderID=0
    }else{
      genderID=2
    }
    try {//读取身份信息
      const db = wx.cloud.database()
      db.collection('userInfo').where({
        _openid: '{openid}'
      }).get({
        success:function(res){
          if(res.data.length==0){//没有用户ID
            console.error("未找到您的身份信息，请重新注册") 
            //未找到您的身份信息，请重新注册
          }
          else{//已经存在 
            if(res.data[0].bathday[0]==yearID&&
              res.data[0].bathday[1]==monthID&&
              res.data[0].bathday[2]==dayID&&
              res.data[0].grande==genderID
              ){//下一步,跳转人脸，传递信息。
                wx.redirectTo({
                  url: '../face/index?name='+that.data.name+'&IDcard='+that.data.IDcard
                })
            }else{
              wx.showToast({
                title: '身份信息与您的信息不符，请重新输入，或修改个人信息后再进行验证',
                icon:"none",
                duration:2000,
              })
            }
          }
        },
        fail:function(e){
          console.error("数据库加载失败",e)
        }
      })
    } catch (e) {
      // Do something when catch error
      console.error("读取异常",e)
    }
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
        console.error("不存在MineID",value)
      }
    } catch (e) {
      // Do something when catch error
      console.error("读取异常",e)
    }
  },


})
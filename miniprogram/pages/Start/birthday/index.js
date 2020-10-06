const date = new Date()
const years = []
const months = []
const days = []
var app = getApp()
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 1, 1],
    pickStart:false,
    pickEnd:false,
    bathday:[0,0,0],
  },
  pickstartF:function(e){
    this.setData({
      pickStart:true
    })
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      pickStart:false
    })
  },
  onLoad:function(){
    if(app.globalData.globalGrande==1)
    {
    this.setData({
      img:"../../../images/birthdayman.png"
    })
    }
    else{
      this.setData({
        img:"../../../images/birthdayWoman.png"
      })
    }
  },
  back:function(){//上一步
    wx.redirectTo({//跳转
      url: '../grande/index'
    })
  },

  next:function(){//下一步
   
    console.log(this.checkDate())
    if(this.data.pickStart==false){//执行
      //检查是日期是否合法
      if(this.checkDate()==true){//合法
        //上传数据库
        this.upDataGande()
        wx.showLoading({
          title: '保存中',
        })
      
      }else{
        wx.showToast({
          title: '您输入的日期不正确',
          icon:'none',
          duration: 2000
        })
      }

    }
    else{
      wx.showToast({
        title: '你点击太快了',
        icon:'none',
        duration: 2000
      })
    }
   
 
  },
    //检查年份是否合法
    checkDate:function(){
      var year=this.data.year;
      var month=this.data.month
      var day=this.data.day;

      //判断大月和小月
      if(month==4||month==6||month==9||month==11)
      {
        if(day==31)
          return false
        else
          return true
      }
      else if(month==2)
      {
        if((this.isLeapYear(year)==false)&&(day>28))
          return false
        else if((this.isLeapYear(year)==true)&&(day>29))
          return false
        else
        return true
      }
      else
        return true
    },
    isLeapYear:function(year){
      return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) ;
    },

    upDataGande:function(){
     
      var flag=false
      var bathdayTmp=this.data.bathday
      bathdayTmp[0]=this.data.year
      bathdayTmp[1]=this.data.month
      bathdayTmp[2]=this.data.day


      console.log("函数",bathdayTmp)
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
              title: '数据库异常请重新注册,或截图反馈',
            })
          }
          else{//已经存在
            console.log("进入",res.data[0]._id)
            db.collection('userInfo').doc(res.data[0]._id).update({
              data:{
                bathday:bathdayTmp
              },
              success: function(res) {
                console.log("成功",res)   
                wx.hideLoading()
                wx.redirectTo({//跳转
                  url: '../nation/index'
                })
              },
              fail: function() {
                console.log("失败")
                wx.hideLoading()
                wx.showToast({
                  icon:none,
                  title: '数据保存失败，请稍后重试,或截图反馈',
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
            title: '数据库加载失败,请稍后重试,或截图反馈',
          })
        }
      }) 
    }
})
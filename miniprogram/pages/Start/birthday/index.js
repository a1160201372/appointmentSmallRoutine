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
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
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
    wx.redirectTo({//跳转
      url: '../maritalStatus/index'
    })
  },
    //检查年份是否合法
    checkDate:function(){

    },
})
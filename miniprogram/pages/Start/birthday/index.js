const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1950; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1 ; i <= 12; i++) {
  months.push(i)
}

for (let i = 1 ; i <= 31; i++) {
  days.push(i)
}

Page({
  data: {
    img:"",
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    year: date.getFullYear(),
   
  },
  onLoad:function(){
    this.setData({
      img:"../../../images/birthdayman.png"
    })
  },
  bindChange: function(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  back:function(){//下一步
    wx.redirectTo({//跳转
      url: '../grande/index'
    })
  },
  next:function(){//下一步
    wx.redirectTo({//跳转
      url: '../maritalStatus/index'
    })
  }
})
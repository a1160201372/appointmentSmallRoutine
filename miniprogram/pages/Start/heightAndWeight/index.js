Page({
  data: {
    title:"您的身高（cm）：",
    column:[140,141,142,143,144],//列
    row:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],//行
    img:"",
  },
  onLoad:function(){
    this.setData({
      img:"../../../images/marryTimeMan.png"
    })
  },
  flag1:function(e){
    var id = e.currentTarget.dataset.id;
    var  tmp="您选择的身高为："+id+"cm\n"
    wx.showModal({
      title: '是否保存',
      content: tmp,
      confirmText:"保存",
      success (res) {
        if (res.confirm) {//保存
        
          console.log("点击",id);
          wx.redirectTo({
            url: '../vocation/index'
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  back:function(){//下一步
    wx.redirectTo({//跳转
      url: '../education/index'
    })
  },
})
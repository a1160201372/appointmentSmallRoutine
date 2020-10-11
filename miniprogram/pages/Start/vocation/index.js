
Page({
  data: {
    title:"请问您的职业？",
    vocation:[["市场/销售","医生","律师",],
              ["教师","幼师","设计师"],
              ["程序员","策划推广","客服人员"],
              ["空姐","护士","服务员"],
              ["营业员","导游","记者"],
              ["摄影师","文员/秘书","行政人事"],
              ["其他"]
            ],
    hiddenmodalput:true,
    vocationSave:"",
    column:[0,1,2],//列
    row:[0,1,2,3,4,5,6
          ]//行
  },
  bindinput:function(e){
    this.setData({
      vocationSave: e.detail.value
  });

  },
  confirm:function(e){
    //逻辑操作
    console.log("保存",this.data.vocationSave);
    wx.showLoading({
      title: '保存中',
    })
    this.upDataGande(this.data.vocationSave)
  },
  modalinput:function(e){
    this.setData({
      hiddenmodalput:true
    });
  },
  flag1:function(e){
    var that=this
    var id = e.currentTarget.dataset.id;
    var  tmp="选择的职业为："+id
    if(id=="其他"){
      this.setData({
        hiddenmodalput:false
      });
    }
    
    else{
      wx.showLoading({
        title: '保存中',
      })
      that.upDataGande(id)
  

    }

  },
  back:function(){//下一步
    wx.redirectTo({//跳转
      url: '../heightAndWeight/index'
    })
  },
  upDataGande:function(flag){
    const db = wx.cloud.database()
    db.collection('userInfo').where({
      _openid: '{openid}'
    }).get({
      success:function(res){
  
        console.log(res.data.length)
        if(res.data.length==0){
          wx.hideLoading()
          wx.showToast({
            icon:none,
            title: '未找到您的数据,请稍后重新注册',
          })
          console.log("失败")
        }
        else{//已经存在
          console.log("进入")
          db.collection('userInfo').doc(res.data[0]._id).update({
            data:{
              vocation:flag
            },
            success: function(res) {
              console.log("成功",res)
               wx.redirectTo({//跳转
                url: '../income/index'
              })
            },
            fail: function(res) {
              console.log("失败")
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
        console.log("数据库加载失败")
        wx.hideLoading()
        wx.showToast({
          icon:none,
          title: '数据库加载失败,请稍后重试',
        })
      }
    })
  }
})
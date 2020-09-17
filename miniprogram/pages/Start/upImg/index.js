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

    //跳转
    wx.navigateTo({//跳转
      url: '../income/index'
    })
    console.log("保存",this.data.vocationSave);
  },
  modalinput:function(e){
    this.setData({
      hiddenmodalput:true
    });
  },
  flag1:function(e){
    var id = e.currentTarget.dataset.id;
    var  tmp="选择的职业为："+id
    if(id=="其他"){
      this.setData({
        hiddenmodalput:false
      });
    }
    
    else{
    wx.showModal({
      title: '是否保存',
      content: tmp,
      confirmText:"保存",
      success (res) {
        if (res.confirm) {//保存
        
          console.log("点击",id);

          wx.redirectTo({//跳转
            url: '../income/index'
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

    }

  },
  back:function(){//下一步
    wx.redirectTo({//跳转
      url: '../heightAndWeight/index'
    })
  },
})
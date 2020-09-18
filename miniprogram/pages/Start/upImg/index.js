const app = getApp()
Page({
  data: {
    title:"请上传您的正面照",

    headImg:"../../../images/add.png",

    //文件名
    upHeadImg:"",//临时地址
    HeadImgMane:"",//上传文件名
    
  },
  //按键进入
  upImg:function(){
   const that=this;


    //选择图片3
    that.doChooseHeadImg();
   // this.data.upHeadImg = that.doChooseHeadImg();
    console.log('选择',  this.data.upHeadImg)

   
/*
    console.log('上传', this.upHeadImg)
  
    //上传图片
  wx.showLoading({
    title: '保存中',
  })
  that.doUpHeadImg( this.upHeadImg,app.globalData.openid+"Head.png");
  */
  },


  UpHeadImg:function(){
   
  },

  doChooseHeadImg:function(){
    const that=this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        console.log(tempFilePaths);
        that.data.upHeadImg=tempFilePaths

        that.setData({
          headImg:tempFilePaths
        })
        wx.showLoading({
          title: '保存中',
        })
        that.doUpHeadImg(tempFilePaths,app.globalData.openid+"Head.png")
     
      }
    })
  },
  doUpHeadImg:function(FilePath,name){
    console.log('上传1',FilePath)
    console.log('上传2', name)
    wx.cloud.uploadFile({
      cloudPath: name,
      filePath: FilePath, // 文件路径
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      })
      setTimeout(function () {
        wx.redirectTo({//跳转
          url: '../../main/Main/index'
        })

      }, 2000)
    
      // get resource ID
      console.log(res.fileID)
    }).catch(error => {
      // handle error
      wx.hideLoading()

      wx.showToast({
        title: '保存失败',
        icon: 'loading',
        duration: 2000
      })
    })
  }
})
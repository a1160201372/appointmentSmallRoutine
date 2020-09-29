const app = getApp()
Page({
  data: {
    title:"请上传您的正面照",
    headImg:"../../../images/add.png",
    //文件名
    upHeadImg:"",//临时地址
    HeadImgMane:"",//上传文件名
  },
  back:function(){//下一步
    wx.redirectTo({//跳转
      url: '../loverRequest/index'
    })
  },
  //按键进入
  upImg:function(){
   const that=this;
    //选择图片
    that.doChooseHeadImg();
    console.log('选择',  this.data.upHeadImg)
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
        //存入数据库（时间戳，照片数量）

       that.upDataGande(tempFilePaths)

      }
    })
  },
  doUpHeadImg:function(FilePath,name){
    var that=this
    console.log('上传1',FilePath)
    console.log('上传2', name)
    wx.cloud.uploadFile({
      cloudPath: name,
      filePath: FilePath, // 文件路径
    }).then(res => {
      that.upDataID()
      wx.hideLoading()
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      })
      setTimeout(function () {
        wx.switchTab({
          url: '../../main/mine/index'
        })
      }, 2200)
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
  },
  upDataGande:function(tempFilePaths){
    var that=this
    console.log("函数")
    console.log("数据")
    const db = wx.cloud.database()
    db.collection('userPhotos').where({
      _openid: '{openid}'
    }).get({
      success:function(res){
        var timestamp = Date.parse(new Date());
      //  var fileName =  [app.globalData.openid +timestamp+"_0.png"]
      var fileName = [ "app.globalData.openid" +timestamp+"_0.png"]
       
        console.log("数据",fileName)
        if(res.data.length==0){
          
          console.log("函数1")
          db.collection('userPhotos').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              num:1,
              createTime: db.serverDate(),
              fileID:fileName,
            },
            success: function(res) {
              console.log("成功",res)
              that.doUpHeadImg(tempFilePaths,fileName[0])
            },
            fail: function(res) {
              console.log("失败")
            }
          })
         
        }
        else{//已经存在
        
          console.log("进入")
          db.collection('userPhotos').doc(res.data[0]._id).update({
            data: {
              num:1,
              fileID:fileName,
              createTime: db.serverDate(),
            },
            success: function(res) {
              console.log("成功上传",res)
              that.doUpHeadImg(tempFilePaths,fileName[0])
            },
            fail: function(res) {
              console.log("失败")
            }
          })
          
        }
      },
      fail:function(){
        console.log("数据库加载失败")
      }
    })
  },
  upDataID:function(){

    const db = wx.cloud.database()
    db.collection('userInfo').where({

    }).get({
      success:function(res){
        var tmp=res.data.length+1000
        console.log("tmp",tmp)
          db.collection('userID').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              ID:tmp,
              registrationFlag:0,
              review:[1,"未审核"],
            },
            success:function(res)
            {
              console.log(res)
            },
            fail:function(e){
              console("失败",e)
            }
          })
      

      },
      fail:function(){
        console.log("数据库加载失败")
      }
    })
  }
})
const app = getApp()
Page({
  ceshi:function(){
    console.log("测试")
    this.upDataID()
  },
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
    /*  setTimeout(function () {
        wx.switchTab({
          url: '../../main/mine/index'
        })
      }, 2200)*/
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
      
      var fileName = [  "ini"+Math.ceil(Math.random()*99992363)+"_"+ Math.ceil(Math.random()*99992363) +timestamp+"_0.png"]
       
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
var that=this
    const db = wx.cloud.database()
    const _ = db.command;  
    db.collection('userID').where({
     
    }).get({
      success:function(res){
        var tmp=res.data.length+1000
        console.log("外面tmp",tmp)
        var arry=res.data
        var Arry=[]
        var i=0
       //var tmp=1001
        console.log("openID测试",tmp)
        for(var i=0;i<res.data.length;i++){
          Arry[i]=res.data[i].ID
        }
        Arry.sort((a, b) => a - b);

        console.log("排序",Arry)
        var flag=0
        while(flag!=-1){
          var tmp =Number((Math.random()*(90000-10000+1)+10000).toFixed(0))
    
          flag=find(Arry,tmp)
          
          if(flag==-1){
            console.log("存储ID",tmp)
            that.upDataIDNum("userID",tmp)
            that.upDataIDNum("userInfo",tmp)
            that.upDataIDNum("userIntroduce",tmp)
            that.upDataIDNum("userOther",tmp)
            that.upDataIDNum("userPhotos",tmp)
  
            that.upDataIDNumLove("loveMe",tmp)
            that.upDataIDNumLove("myLove",tmp)
            that.upDataIDNumLove("new",tmp)
          }
          
            
        }

        

        //生成ID信息
/*
          that.upDataIDNum("userID",tmp)
          that.upDataIDNum("userInfo",tmp)
          that.upDataIDNum("userIntroduce",tmp)
          that.upDataIDNum("userOther",tmp)
          that.upDataIDNum("userPhotos",tmp)

          that.upDataIDNumLove("loveMe",tmp)
          that.upDataIDNumLove("myLove",tmp)
*/
         //查重
        /* while(randomNum()){

         }*/
          function find(arry,num) {
            var start = 0;
            var flag=0;
            var end =arry.length-1;
            while(start<=end) {//当查找完成时，结束位置会小于起始位置
              //先定义中间值
              var middle = Math.floor((start+end)/2);
              if(num<arry[middle]) {
                //如果要查找的数小于等于中间数则取前半部分
                end = middle-1;
              }else if(num>arry[middle]){
                //如果要查找大于中间数则取后半部分
                start = middle+1;
              }else{
              console.log("你要找的在第"+middle+"号位置");
              flag=middle;
        
                break;
              }
            }
            if(start>end) {
              console.log("该数组中没有您要找的数");
              flag=-1;
            }
            return flag
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
  },
  upDataIDNum:function(table,ID){

    var that=this
    const db = wx.cloud.database()
    db.collection(table).where({
      _openid: '{openid}'
    }).get({
      success:function(res){

        if(res.data.length==0){
          db.collection(table).add({
            // data 字段表示需新增的 JSON 数据
            data: {
              ID:ID,
            },
            success: function(res) {
              console.log("成功",res)
                //
            },
            fail: function(res) {
              console.error("失败",res)
              wx.hideLoading()
              wx.showToast({
                icon:none,
                title: '保存失败,请稍后重试',
              })
            }
          })
          console.error("错误")
        }
        else{//已经存在
          console.log("进入222",res.data[0]._id)
          console.log("进入2dsdsd22",ID)
          db.collection(table).doc(res.data[0]._id).update({
            data: {
              ID:ID,
            },
            success: function(res) {
              console.log("成功上传",res)
            },
            fail: function(res) {
              console.error("失败")
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
        console.error("数据库加载失败")
        wx.hideLoading()
        wx.showToast({
          icon:none,
          title: '数据库加载失败,请稍后重试',
        })
      }
    })
  },
  upDataIDNumLove:function(table,ID){

    var that=this
    const db = wx.cloud.database()
    db.collection(table).where({
      _openid: '{openid}'
    }).get({
      success:function(res){

        if(res.data.length==0){
          db.collection(table).add({
            // data 字段表示需新增的 JSON 数据
            data: {
              ID:ID,
              myLove:[]
            },
            success: function(res) {
              console.log("成功",res)
                //
            },
            fail: function(res) {
              console.error("失败",res)
              wx.hideLoading()
              wx.showToast({
                icon:none,
                title: '保存失败,请稍后重试',
              })
            }
          })
          console.error("错误")
        }
        else{//已经存在
          console.log("进入222",res.data[0]._id)
          console.log("进入2dsdsd22",ID)
          db.collection(table).doc(res.data[0]._id).update({
            data: {
              ID:ID,
              myLove:[]
            },
            success: function(res) {
              console.log("成功上传",res)
            },
            fail: function(res) {
              console.error("失败")
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
        console.error("数据库加载失败")
        wx.hideLoading()
        wx.showToast({
          icon:none,
          title: '数据库加载失败,请稍后重试',
        })
      }
    })
  },

})
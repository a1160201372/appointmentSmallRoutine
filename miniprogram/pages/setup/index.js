
Page({


  data:{
    imgbox: [],//选择图片
    fileIDs: [],//上传云存储后的返回值
    examineFlag:1,
    array:['请选择','高中及以下','专科','本科'],
    region: ['山东省', '济南市', '市中心'],
    sex:['男','女'],
    sexFlag:0,
    customItem: '全部',
    date: '1990-01',
    height_array:['150cm','151cm','152cm','153cm','154cm','155cm','156cm','157cm','158cm','159cm',
                  '160cm','161cm','162cm','163cm','164cm','165cm','166cm','167cm','168cm','169cm',
                  '170cm','171cm','172cm','173cm','174cm','175cm','176cm','177cm','178cm','179cm',
                  '180cm','181cm','182cm','183cm','184cm','185cm','186cm','187cm','188cm','189cm',],
    height_num:10,
    basicInfo:["性别","年龄","学历","居住地","身高","职业"],
    educationNum:0,
    bindKeyProfession:'',
    imgArray:[],
    imgNum:0,
    userImg:["cloud://ceshi-fdybb.6365-ceshi-fdybb-1302833646/my-image.jpg",""],
    tempFilePaths1:[],
    stampImg:"",
    openID:"",
    head:"",
  },
 

// 删除照片 &&
/*
imgDelete1: function (e) {
  let that = this;
  let index = e.currentTarget.dataset.deindex;
  let imgbox = this.data.imgbox;
  imgbox.splice(index, 1)
  that.setData({
    imgbox: imgbox
  });
},
*/
// 选择图片 &&&
/*
addPic1: function (e) {
  var imgbox = this.data.imgbox;
  console.log(imgbox)
  var that = this;
  var n = 5;
  if (5 > imgbox.length > 0) {
    n = 5 - imgbox.length;
  } else if (imgbox.length == 5) {
    n = 1;
  }
  wx.chooseImage({
    count: n, // 默认9，设置图片张数
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // console.log(res.tempFilePaths)
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths

      if (imgbox.length == 0) {
        imgbox = tempFilePaths
      } else if (5 > imgbox.length) {
        imgbox = imgbox.concat(tempFilePaths);
      }
      that.setData({
        imgbox: imgbox
      });
    }
  })
},
*/
//图片
/*
imgbox: function (e) {
  this.setData({
    imgbox: e.detail.value
  })
},*/

//刷新界面
  bindPickerChangeEducation:function(e){
    this.setData({
      educationNum:e.detail.value
    })
  },
  bindPickerChangeSex:function(e){
    this.setData({
      sexFlag:e.detail.value
    })
  },
  bindPickChangeHabitation:function(e){
    this.setData({
      region:e.detail.value
    })
  },
  bindPickChangeBirthday:function(e){
    this.setData({
      date:e.detail.value
    })
  },
  bindPickerChangeHeight:function(e){
    this.setData({
      height_num:e.detail.value
    })
  },
  bindKeyProfession:function(e){
    this.data.bindKeyProfession = e.detail.value;
  },
  
})

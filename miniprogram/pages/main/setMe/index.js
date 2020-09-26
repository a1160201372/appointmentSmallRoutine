const  app = getApp()
// miniprogram/pages/main/setMe/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photos: [],//生活照片
    headImage:"",
    imgbox: [],//选择图片
    fileIDs: [],//上传云存储后的返回值
    examineFlag:1,
    array:['请选择','高中及以下','专科','本科'],
    region: ['山东省', '济南市', '市中心'],
    sex:['男','女'],
    sexFlag:0,
    customItem: '全部',
    date: '1990-01',
    height_array:[],
    height_num:10,
    weight_array:[],
    weight_num:10,

    basicInfo:["性别","年龄","身高","体重","民族","学历","婚姻情况","居住地","职业"],
    workPlace:["","","",""],
    singlePick:["身高","体重","民族","学历","婚姻状况","月薪","购房情况","购车情况","最低学历","最低月薪"],
    singlePickRange:[
      [],//身高
      [],//体重
      ["未选择","汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族","瑶族","白族","土家族",  
      "哈尼族","哈萨克族","傣族","黎族","傈僳族","佤族","畲族","高山族","拉祜族","水族","东乡族","纳西族","景颇族","柯尔克孜族",  
      "土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族","毛南族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族", "乌孜别克族",  
     "俄罗斯族","鄂温克族","德昂族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族"],//民族
     ["初中","高中","大专","本科","硕士","博士"],//学历
     ["未婚","离异","丧偶"],//婚姻状况
     ["1千以下","1~2千","2~3千","3~4千","4~8千","8千~1万","1~2万","2~5万","五万以上"],//月薪
     ["已购房{有贷款}","已购房{无贷款}","有能力购房","无房","无房希望对方解决","无房希望双方解决","与父母同住","独自租房","与人合租","住亲朋家","住单位房"],//购房情况
     ["无车","已购车-经济型","已购车-中档型","已购车-豪华型","单位用车","需要时购置"],
     ["不限","初中","高中","大专","本科","硕士","博士"],//学历择偶
     ["不限","1千以下","1~2千","2~3千","3~4千","4~8千","8千~1万","1~2万","2~5万","五万以上"],//月薪择偶
    ],

    singlePickChangeFunction:["bindPickerChangeHeight"],
    singlePickFlag:[3,9,0,0,0,0,0,0,0,0],//单项选择器的标志


    PlaceOther:['山东省', '济南市', '市中心'],
    ageArrayOther:[[],[]],
    ageFlagOther: [0, 0],

    heightArrayOther:[[],[]],
    heightFlagOther: [0, 0],
    Array:[
      [{value:"1",name:'不限',checked:false},{value:"2",name:'离异',checked:false},
      {value:"3",name:'丧偶',checked:false},{value:"4",name:'未婚',checked:false}],

      [{value:"1",name:'不限',checked:false},
      {value:"2",name:'已购房-有贷款',checked:false},{value:"3",name:'已购房-无贷款',checked:false},
      {value:"4",name:'有能力购房',checked:false},{value:"5",name:'希望对方解决',checked:false},
      {value:"6",name:'希望双方解决',checked:false},{value:"7",name:'与父母同住',checked:false},
     {value:"8",name:'与人合租',checked:false},
      {value:"9",name:'住亲朋家',checked:false},{value:"10",name:'住单位房',checked:false},
       {value:"11",name:'独自租房',checked:false},],

      [  {value:"1",name:'不限',checked:false},
        {value:"2",name:'已购车-经济型',checked:false}, 
        {value:"3",name:'已购车-中档型',checked:false},{value:"4",name:'已购车-豪华型',checked:false},
         {value:"5",name:'单位用车',checked:false}, {value:"6",name:'需要时购置',checked:false}, 
         {value:"7",name:'无车',checked:false},
      
      ]
    ],
    marryIndex:[1,2,3,4,5,6,7,8,9,10,11,12,13],
    typeTile:["婚况","房子","车子"],//前面名字
    checkTile:["婚况(随时保存)","房子（随时保存）","车子（随时保存）"],//标题
    typebind:[["bindMarry","bindHouse","bindCar"],//点击选项
    ["checkMarry","checkHouse","checkCar",],//改变函数
    ["unButtonMarry","unButtonHouse","unButtonCar",]//不限函数
  ],
  typeInfo:[["未填写"],["未填写"],["未填写"],
    ],//后面的数组名字
    column:[0,1],//列
    row:[],//行  js赋值


    educationNum:0,
    bindKeyProfession:'',
    imgArray:[],
    imgNum:0,
    //userImg:["cloud://ceshi-fdybb.6365-ceshi-fdybb-1302833646/my-image.jpg",""],
    tempFilePaths1:[],
    stampImg:"",
    openID:"",
    head:"",
 
  },
  bindinputMyself:function(e){
    console.log(e.detail)
  },
  //年龄范围（前）
  bindMultiPickerChange(e) {
    console.log('前',e);
    if(e.detail.value[0]>e.detail.value[1])
    {
      wx.showModal({
        title: '警告',
        content: '年龄范围不正确',
        showCancel:false,
      })
    }else{
    this.setData({
      ageFlagOther: e.detail.value
    })
  }
  },
   /**
     * 上传图片
     */
    chooseImage:function(){
    
      var that = this;
      var items = that.data.photos;
      wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths;
              console.log(that.data.photos.length)
  

              for (var i = 0; i < tempFilePaths.length; i++) {
                  items.push(
                      tempFilePaths[i]
                  );
              }

              that.setData({
                  photos:items
              });
          }
      })
  },
  //点击图片预览
  previewImage:function(e){
    if (this.endTime - this.startTime < 350) {
      console.log("点击");
      var current = e.target.dataset.src
      console.log(current)
      
      console.log(this.data.photos)
              wx.previewImage({
                  current: current,
                  urls: this.data.photos
              })
    }

  },
  //长按删除图片
  deleteImage:function(e){
console.log("长按")
wx.showModal({
  title: '是否删除图片？',
  content: "注意图片删除后无法恢复",
  success (res) {
    if (res.confirm) {
      console.log('用户点击确定')
      //删除图片
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})
  },
  // @手指触摸开始(不会触发)
  // @请勿删除代码
  handleTouchStart: function(e) {
    this.startTime = e.timeStamp;
  },
  // @手指触摸结束(不会触发)
  // @请勿删除代码
  handleTouchEnd: function(e) {
    this.endTime = e.timeStamp;
  },

  //身高范围
  bindMultiPickerChangeHeight(e) {
    console.log('前',e);
    if(e.detail.value[0]>e.detail.value[1])
    {
      wx.showModal({
        title: '警告',
        content: '身高范围不正确',
        showCancel:false,
      })
    }else{
    this.setData({
      heightFlagOther: e.detail.value
    })
  }
},
//点击婚况
bindMarry: function() {
  //设置type
  var tmp=[1,2];
console.log("婚况")
  // 显示遮罩层
  var animation = wx.createAnimation({
    duration: 200,
    timingFunction: "linear",
    delay: 0
  })
  this.animation = animation
  animation.translateY(300).step()
  this.setData({
    animationData: animation.export(),
    type: 1,
    row:tmp
  })




  setTimeout(function() {
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export()
    })
  }.bind(this), 200)




}, 
//点击房子
 bindHouse: function() {
  //设置type
var tmp=[0,1,2,3,4,5] 

  // 显示遮罩层
  var animation = wx.createAnimation({
    duration: 200,
    timingFunction: "linear",
    delay: 0
  })
  this.animation = animation
  animation.translateY(300).step()
  this.setData({
    animationData: animation.export(),
    type: 2,
    row:tmp
  })
  setTimeout(function() {
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export()
    })
  }.bind(this), 200)
},
bindCar: function() {
  //设置type
  var tmp=[0,1,2] 

  // 显示遮罩层
  var animation = wx.createAnimation({
    duration: 200,
    timingFunction: "linear",
    delay: 0
  })
  this.animation = animation
  animation.translateY(300).step()
  this.setData({
    animationData: animation.export(),
    type: 3,
    row:tmp
  })
  setTimeout(function() {
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export()
    })
  }.bind(this), 200)
},
//改变
checkMarry:function(e){
  
  var items = this.data.Array[0]
  var all = this.data.Array
  const values = e.detail.value
  var Info = this.data.typeInfo



  for (let i = 0, lenI = items.length; i < lenI; ++i) {
    items[i].checked = false

    for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
      if (items[i].value === values[j]) {
        items[i].checked = true
        console.log('numm',i);
        break
      }
    }
  }
    var j =0;
    Info[0]=""
  for(let i=0;i<4;i++){
    console.log('items',all[0][i].checked);

    if(all[0][i].checked==true){
      //Info[0][j]=all[0][i].name
      if(Info[0].length!=0)
       Info[0]=Info[0].concat('，')
      Info[0]=Info[0].concat(all[0][i].name)
      console.log('concat',Info[0]);
      j++
    }
  }
  
  console.log('items',Info[0]);
  this.setData({
    Array:all,
    typeInfo:Info
  })
  console.log('测试',values[0]);
  if(all[0][0].checked==true){
   this.unlimitedButton(e,4,0) 
   //显示提醒
   if(values[0]==1&&values.length>1)
   {
    wx.showToast({
      title:  '请去掉“不限”后，再选其他项',
      icon: 'none',
      duration: 2000
    })
   }
  
  }
 
  
},
checkHouse:function(e){
  var items = this.data.Array[1]
  var all = this.data.Array
  const values = e.detail.value
  var Info = this.data.typeInfo



  for (let i = 0, lenI = items.length; i < lenI; ++i) {
    items[i].checked = false

    for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
      if (items[i].value === values[j]) {
        items[i].checked = true
        console.log('numm',i);
        break
      }
    }
  }
  var j =0;
  Info[1]=""
for(let i=0;i<11;i++){
  console.log('items',all[1][i].checked);

  if(all[1][i].checked==true){
    //Info[0][j]=all[0][i].name
    if(Info[1].length!=0)
      Info[1]=Info[1].concat('，')
    Info[1]=Info[1].concat(all[1][i].name)
    console.log('concat',Info[1]);
    j++
  }
}
console.log('items',Info[1]);
this.setData({
  Array:all,
  typeInfo:Info
})
console.log('测试',values[1]);
if(all[1][0].checked==true){
 this.unlimitedButton(e,11,1) 
 //显示提醒
 if(values[0]==1&&values.length>1)
 {
  wx.showToast({
    title:  '请去掉“不限”后，再选其他项',
    icon: 'none',
    duration: 2000
  })
 }
}


},
checkCar:function(e){

  var items = this.data.Array[2]
  var all = this.data.Array
  const values = e.detail.value
  var Info = this.data.typeInfo


  console.log('items1',items);
  console.log('values1',values);

  for (let i = 0, lenI = items.length; i < lenI; ++i) {
    items[i].checked = false

    for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
      if (items[i].value === values[j]) {
        items[i].checked = true
        break
      }
    }
  }
  var j =0;
    Info[2]=""
  for(let i=0;i<6;i++){
    
   // if()
    
    if(all[2][i].checked==true){

      if(Info[2].length!=0)
        Info[2]=Info[2].concat('，')
      Info[2]=Info[2].concat(all[2][i].name)

      console.log('concat',Info[2]);
      j++
    }
  }
  console.log('items',Info[1]);
  this.setData({
    Array:all,
    typeInfo:Info
  })
  console.log('测试',values[1]);
  if(all[2][0].checked==true){
   this.unlimitedButton(e,6,2) 
   //显示提醒
   if(values[0]==1&&values.length>1)
   {
    wx.showToast({
      title: '请去掉“不限”后，再选其他项',
      icon: 'none',
      duration: 2000
    })
   }
  }

},
//不限函数
unButtonMarry:function(e){
  this.hideModal()
},
unButtonHouse:function(e){
  this.hideModal()
},
unButtonCar:function(e){ 
  this.hideModal()
},
  //处理不限按钮的函数
  unlimitedButton:function(e,arrayNum,Falg){
    //读取变量
    var items = this.data.Array[Falg]//
    var all = this.data.Array
    const values = e.detail.value
    var Info = this.data.typeInfo
    console.log('次数',arrayNum);
  //处理变量
    for(let i=1;i<arrayNum;i++){
      items[i].checked = false
    }
    Info[Falg]='不限'
    all[Falg]=items
    //渲染变量
    this.setData({
      Array:all,
      typeInfo:Info
    })
   
  },
  //隐藏遮罩
  hideModal: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(400).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
       // animationData: animation.export(),
        type1: false,
        type: false
      })
    }.bind(this), 200)
  },
  //点击选项
  pickFunction:function(e){
      console.log(e.currentTarget.dataset.index)
      var flag=parseInt(e.currentTarget.dataset.index);
   
      this.data.saveFlag=false
      this.data.pickFlag=true
    switch(flag){
      case 1:
        //显示
        this.showPopup(1)
     
        console.log("性别");
        break;
        
    }
  },
  //显示遮罩
  showPopup:function(a){
     //设置type
     var tmp=[1,2];

     // 显示遮罩层
     var animation = wx.createAnimation({
       duration: 200,
       timingFunction: "linear",
       delay: 0
     })
     this.animation = animation
     animation.translateY(300).step()
     this.setData({
       animationData: animation.export(),
       type1: a,
       row:tmp
     })
 
 
 
 
     setTimeout(function() {
       animation.translateY(0).step()
       this.setData({
         animationData: animation.export()
       })
     }.bind(this), 200)
  },
  //点击保存

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
  bindPickChangePlaceOther:function(e){
    this.setData({
      PlaceOther:e.detail.value
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

  singlePickChangeFunction:function(e){

  },

  bindPickerChangeHeight:function(e){
    console.log(e.currentTarget.dataset.index)

    var num=e.currentTarget.dataset.index
    var tmp=this.data.singlePickFlag

    tmp[num]=e.detail.value

    this.setData({
      singlePickFlag:tmp
    })
  },
  bindPickerChangeWeight:function(e){
    this.setData({
      weight_num:e.detail.value
    })
  },
  bindKeyProfession:function(e){
    console.log(e)
    console.log("ID",e.target.dataset.index)

    this.data.bindKeyProfession = e.detail.value;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(app)
    var tmp=this.data.singlePickRange;

    var age=[[],[]]
    var height=[[],[]]
    for(var i=18;i<90;i++)
    {
      age[0]=age[0].concat(i+"岁");
      age[1]=age[1].concat(i+1+"岁");
    }
    for(var i=140;i<210;i++)
    {
      height[0]=height[0].concat(i+"cm");
      height[1]=height[1].concat(i+1+"cm");
    }

    for(var i=150;i<210;i++)
    {
      tmp[0]= tmp[0].concat(i+"cm");
    }
    for(var i=40;i<150;i++)
    {
      tmp[1]= tmp[1].concat(i+"Kg");
    }
    this.setData({
      singlePickRange:tmp,
      ageArrayOther:age,
      heightArrayOther:height
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //居住地
  placeFunction:function(e){
    this.showPopup(e)
  },
  //保存按钮
  formSubmit:function(e){
    console.log(e)
    wx.showLoading({title: '保存中', mask: true});
    app.globalData.headImage = this.data.photos[0]
    setTimeout(function () {
      wx.hideLoading()
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      })
    }, 2000)
  },
  citySelectData(e) {
    console.log("测试",e.detail.data);
    var tmp=["","","",""]
    //tmp[0]=
    this.setData({
      workPlace:e.detail.data
    })
    this.hideModal()
  },
})
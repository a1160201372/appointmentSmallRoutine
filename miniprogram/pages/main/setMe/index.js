// miniprogram/pages/main/setMe/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    singlePick:["身高","体重","民族","学历","婚姻状况","月薪","购房情况","购车情况"],
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

    ],

    singlePickChangeFunction:["bindPickerChangeHeight"],
    singlePickFlag:[3,9,0,0,0,0,0,0],//单项选择器的标志
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
       type: a,
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
    console.log(e.detail.value)
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
    var tmp=this.data.singlePickRange;

    for(var i=150;i<210;i++)
    {
      tmp[0]= tmp[0].concat(i+"cm");
    }
    for(var i=40;i<150;i++)
    {
      tmp[1]= tmp[1].concat(i+"Kg");
    }
    this.setData({
      singlePickRange:tmp
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
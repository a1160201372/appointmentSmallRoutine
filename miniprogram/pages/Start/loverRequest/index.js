const app = getApp()
Page({
  data: {
    title:"设置您的择偶要求",
    region: ['山东省', '济南市', '市中区'],//居住地
   
    animationData: '',
    salaryArray: [],
    salaryIndex: [0, 0],
    education:["不限","初中","高中","大专","本科","硕士","博士"],
    heightArray: [],
    pickName:["婚况","最低学历","最低月薪","房子","车子"],
    heightIndex: [0, 0],
    //婚况 房子 车子
    typebind:[["bindMarry","bindHouse","bindCar"],//点击选项
              ["checkMarry","checkHouse","checkCar",],//改变函数
              ["unButtonMarry","unButtonHouse","unButtonCar",]//不限函数
            ],

    typeTile:["婚况","房子","车子"],//前面名字
    typeInfo:["不限","不限","不限"],//后面的数组名字
    checkTile:["婚况(随时保存)","房子（随时保存）","车子（随时保存）"],//前面名字

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

    educationArray:["不限","初中","高中","大专","本科","硕士","博士"],//学历
    educationIndex:0,
    incomeArray:["不限","1千以下","1~2千","2~3千","3~4千","4~8千","8千~1万","1~2万","2~5万","五万以上"],//月薪
    incomeIndex:0,

    column:[0,1],//列
    row:[],//行  js赋值
    type:0,


    seleted : "",
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
  unButtonMarry:function(e){
    this.hideModal()
  },
  unButtonHouse:function(e){
    this.hideModal()
  },
  unButtonCar:function(e){ 
    this.hideModal()
  },
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
  bindPickerChangeIncome:function(e){
    this.setData({
      incomeIndex:e.detail.value
    })
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
 
  hideModal: function () {
    
    this.setData({
      type: false,
    })
    //显示出来
  
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    let value = e.detail.value;
    this.setData({
      seleted : "选中的value：" + value
    })
  },
  onLoad: function(options) {
    const _this = this;
    let salaryStart = [],
      salaryEnd = [],
      salaryArray = [];
    for (let i = 18; i < 100; i++) {
      salaryStart.push(`${i}岁`);
      salaryEnd.push(`${i+1}岁`)
    }
    salaryArray.push(salaryStart);
    salaryArray.push(salaryEnd);
    _this.setData({
      salaryArray: salaryArray
    })

    let heightStart = [],
    heightEnd = [],
    heightArray = [];
  for (let i = 140; i < 215; i++) {
    heightStart.push(`${i}cm`);
    heightEnd.push(`${i+1}cm`)
  }
  heightArray.push(heightStart);
  heightArray.push(heightEnd);
  _this.setData({
    heightArray: heightArray
  })
  },

  

  bindPickChangeHabitation:function(e){// 工作地点
    this.setData({
      region:e.detail.value
    })
  },
//多列选择器
  //确定时触发该事件
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
      salaryIndex: e.detail.value
    })
  }
  },//滑动列时触发该事件
  bindMultiPickerColumnChange(e) {
 
  },
  bindPickerChangeEducation:function(e) {
    this.setData({
      educationIndex:e.detail.value
    })
  },
   //确定时触发该事件
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
        heightIndex: e.detail.value
      })
    }
  },//滑动列时触发该事件
   bindMultiPickerColumnChangeHeight(e) {/*
      let currentColunm = e.detail.column; 
      var currentClounmIndex = e.detail.value; 
      let data = {
        salaryArray: this.data.salaryArray, 
        salaryIndex: this.data.salaryIndex 
      }
      
      if(currentColunm==0)
      {
        console.log('前', currentClounmIndex, '后', this.data.salaryIndex[1]);
        if(currentClounmIndex>this.data.salaryIndex[1])//需要修改2列
        {
         
          data.salaryIndex[currentColunm] = currentClounmIndex
          data.salaryIndex[1] = currentClounmIndex;
          this.setData(data)
        }
        else{
          this.setData({    
            salaryIndex:[currentClounmIndex,data.salaryIndex[1]]
          })
        }
      }
      if(currentColunm==1)
      {
        if(currentClounmIndex<this.data.salaryIndex[0])//需要修改2列
        {
          data.salaryIndex[currentColunm] = currentClounmIndex
          data.salaryIndex[0] = currentClounmIndex;
          this.setData(data)
        }
        else{
          this.setData({    
            salaryIndex:[data.salaryIndex[1],currentClounmIndex]
          })
        }
      }
  
      console.log('修改的列为', currentColunm, '，值为', currentClounmIndex);
     */
  },

//点击婚况
  bindMarry: function() {
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
  
  hideModal: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        type: 0
      })
    }.bind(this), 200)
  },

  back:function(){
    wx.redirectTo({//跳转
      url: '../carCondition/index'
    })
  },
  next:function(){

    var age=[0,0];
    var height=[0,0];
    
    age[0]= this.data.salaryIndex[0]+18
    age[1]= this.data.salaryIndex[1]+19
    //heightIndex
    height[0]=this.data.heightIndex[0]+140
    height[1]=this.data.heightIndex[1]+141
//需要保存的数据
    console.log(this.data.region)//工作地点 
    console.log(age)//年龄范围
    console.log(height)//身高范围
    console.log(this.data.educationIndex)//最低学历
    console.log(this.data.incomeIndex)//最低月薪*/
    console.log(this.data.typeInfo[0])//婚况
    console.log(this.data.typeInfo[1])//房子
    console.log(this.data.typeInfo[2])//车子

    this.upDataGande(
      this.data.region,age,height,this.data.educationIndex,
      this.data.incomeIndex,this.data.typeInfo[0],
      this.data.typeInfo[1],this.data.typeInfo[2]
    )


  
  },

  upDataGande:function(work,age,height,ed,inCome,marry,house,car){
    const db = wx.cloud.database()
    db.collection('userOther').where({
      _openid: '{openid}'
    }).get({
      success:function(res){
        //app.globalData.openid = res.data[0]._openid
       // console.log("OPENID",res.data[0]._openid)
        if(res.data.length==0){
       
          db.collection('userOther').add({
            // data 字段表示需新增的 JSON 数据
            data:{
              //work,age,height,ed,inCome,marry,house,car
              workPlace:work,
              age:age,
              height:height,
              ed:ed,
              inCome:inCome,
              marry:marry,
              house:house,
              car:car
            },
            success: function(res) {
              console.log("成功",res)
               wx.redirectTo({//跳转
                url: '../upImg/index'
              })
            },
            fail: function(res) {
              console.log("失败")
            }
          })
        }
        else{//已经存在
          console.log("进入")
          db.collection('userOther').doc(res.data[0]._id).update({
            data:{
              //work,age,height,ed,inCome,marry,house,car
              workPlace:work,
              age:age,
              height:height,
              ed:ed,
              inCome:inCome,
              marry:marry,
              house:house,
              car:car
            },
            success: function(res) {
              console.log("成功",res)
               wx.redirectTo({//跳转
                url: '../upImg/index'
              })
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
  }
})
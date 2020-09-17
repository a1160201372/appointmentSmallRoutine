Page({
  data: {
    title:"设置您的择偶要求",
    region: ['山东省', '济南市', '市中区'],//居住地
   
    animationData: '',
    salaryArray: [],
    salaryIndex: [0, 0],
    education:["初中","高中","大专","本科","硕士","博士"],
    heightArray: [],
    pickName:["婚况","最低学历","最低月薪","房子","车子"],
    heightIndex: [0, 0],
    //婚况 房子 车子
    typebind:[["bindMarry","bindHouse","bindCar"],
              ["checkMarry","checkHouse","checkCar",]],//点击函数
    typeTile:["婚况","房子","车子"],//前面名字
    typeInfo:["未填写","未填写","未填写"],//后面的数组名字

    Array:[
      [{value:"1",name:'未婚',checked:false},{value:"2",name:'离异',checked:false},
      {value:"3",name:'丧偶',checked:false}],

      [{value:"1",name:'已购房{有贷款}',checked:false},{value:"2",name:'已购房{无贷款}',checked:false},
      {value:"3",name:'有能力购房',checked:false},{value:"4",name:'无房希望对方解决',checked:false},
      {value:"5",name:'无房希望双方解决',checked:false},{value:"6",name:'与父母同住',checked:false},
      {value:"7",name:'独自租房',checked:false},{value:"8",name:'与人合租',checked:false},
      {value:"9",name:'住亲朋家',checked:false},{value:"10",name:'住单位房',checked:false},],

      [
        {value:"1",name:'无车',checked:false}, {value:"2",name:'已购车-经济型',checked:false}, 
        {value:"3",name:'已购车-中档型',checked:false},{value:"4",name:'已购车-豪华型',checked:false},
         {value:"5",name:'单位用车',checked:false}, {value:"6",name:'需要时购置',checked:false},
      ]
    ],
  

    marryIndex:[1,2,3,4,5,6,7,8,9,10,11,12,13],

    educationArray:["初中","高中","大专","本科","硕士","博士"],//学历
    educationIndex:0,
    incomeArray:["1千以下","1~2千","2~3千","3~4千","4~8千","8千~1万","1~2万","2~5万","五万以上"],//月薪
    incomeIndex:0,

    column:[0,1],//列
    row:[],//行  js赋值
    type:0,


    seleted : "",
  },
  checkMarry:function(e){
  
    var items = this.data.Array[0]
    var all = this.data.Array
    const values = e.detail.value
    var Info = this.data.typeInfo
    if(values.length==0)
    {
      Info[0]="未填写"
        this.setData({
          typeInfo:Info
        })
    }
    else{

    console.log('items1',items);
    console.log('values1',values);
  
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

    for(let i=0;i<3;i++){
      all[0]=items
    }
    console.log('items',all);
    Info[0]="已填写"
    this.setData({
      Array:all,
      typeInfo:Info
    })
  }
  },
  checkHouse:function(e){
  
    var items = this.data.Array[1]
    var all = this.data.Array
    const values = e.detail.value
    var Info = this.data.typeInfo

    if(values.length==0)
    {
      Info[1]="未填写"
        this.setData({
          typeInfo:Info
        })
    }
    else{

    console.log('items1',items);
    console.log('values1',values);
  
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

    for(let i=0;i<10;i++){
      all[1]=items
    }
    console.log('items',all);
    Info[1]="已填写"
    this.setData({
      Array:all,
      typeInfo:Info
    })
  }
  },
  checkCar:function(e){
  
    var items = this.data.Array[2]
    var all = this.data.Array
    const values = e.detail.value
    var Info = this.data.typeInfo
    if(values.length==0)
    {
      Info[2]="未填写"
        this.setData({
          typeInfo:Info
        })
    }
    else{

    console.log('items1',items);
    console.log('values1',values);
  
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

    for(let i=0;i<3;i++){
      all[2]=items
    }
    console.log('items',all);
    Info[2]="已填写"
    this.setData({
      Array:all,
      typeInfo:Info
    })
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
  bindMultiPickerColumnChange(e) {/*
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

  save:function(e){
var tmp=this.data.tmpMarry;
var all=this.data.Array;






  
    console.log('items',items);
/*
    for(;i<3;i++)//检测是否为零
    {
      if((i+1)==tmp[j])
      {
        console.log('tmp'+'_'+i,tmp[j]);
        console.log('i',i);
        console.log('all',all[0][tmp[j]-1]);
      
        all[0][tmp[j]-1].checked=false
        j++;
      }
      else{
        console.log('tmp',tmp[j]);
        console.log('i',i);
        console.log('all',all[0][tmp[j]-1]);
        all[0][tmp[j]-1]=false
      }
     
      
      
      //if()
     

    }
  */
    this.setData({
      Array:all
    })
  },
  back:function(){
    wx.redirectTo({//跳转
      url: '../carCondition/index'
    })
  },
  next:function(){
   
  }
  

})
Page({
  data: {


    widHeight:"10px",
    loveMeHeight:0,



    urlImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600925623275&di=60db5f6f6b0d18ba0f3cfa416dd51e9e&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F03%2F57%2F11%2F9857a013261b7b6.jpg",//头像
    tabs: [],
    activeTab: 0,

    //图片
    loveMeImg:[],
    myLoveImg:[],
    //信息
    loveMeInfo:[
      {
        id:1001,
        Info:"sdsd"
      },
      {
        id:1002,
        Info:"好的"
      },
      {
        id:1003,
        Info:"坏的"
      },
     
      

    ],//喜欢我的

    myLoveInfo:[],//我喜欢的


   
    //tabFlag//状态
  },

  onLoad() {
    
    const titles = ['我喜欢的', '喜欢我的']
    const tabs = titles.map(item => ({title: item}))
    this.setData({tabs})


    this.setData({
      loveMeHeight:Math.floor((this.data.loveMeInfo.length+1)/2)*550
    })

  },

  onTabCLick(e) {
    const index = e.detail.index
    this.setData({activeTab: index})
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({activeTab: index})
  },
ceshi:function(){
 
 var map=this.data.loveMeInfo
  //读取符合条件的ID号
  

 map.forEach(element => {//直接操作数组//遍历
  console.log("遍历",element)
  element.name=element.id
  
 });

 map[0].name="woed"
  console.log("测试",map)
}
})

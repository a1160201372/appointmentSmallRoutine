// miniprogram/pages/chat/im/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    widHeight:"10px",
    loveMeHeight:1000,
    tabsFlag:1,
    eductionArry:["初中","高中","大专","本科","硕士","博士"],
    mineID:null,
    tabs: [],
    activeTab: null,
    myLoveID:[],
    //图片
    loveMeImg:[],
    myLoveImg:[],
    //信息
    loveMeInfo:[
      [ 
        {urlImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600937008483&di=5e1b3955e3b522a0b221616ee4dfda6c&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd000baa1cd11728bb8fb7eb7c8fcc3cec2fd2c55.jpg",
      Info:"sdds",
      ed:"你好"},
      {urlImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600937008483&di=5e1b3955e3b522a0b221616ee4dfda6c&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd000baa1cd11728bb8fb7eb7c8fcc3cec2fd2c55.jpg",
      Info:"sdds",
      ed:"你好"
    },
    {urlImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600937008483&di=5e1b3955e3b522a0b221616ee4dfda6c&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd000baa1cd11728bb8fb7eb7c8fcc3cec2fd2c55.jpg",
    Info:"sdds",
    ed:"你好"},
    {urlImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600937008483&di=5e1b3955e3b522a0b221616ee4dfda6c&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd000baa1cd11728bb8fb7eb7c8fcc3cec2fd2c55.jpg",
    Info:"sdds",
    ed:"你好"
  },
  {urlImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600937008483&di=5e1b3955e3b522a0b221616ee4dfda6c&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd000baa1cd11728bb8fb7eb7c8fcc3cec2fd2c55.jpg",
  Info:"sdds",
  ed:"你好"},
  {urlImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600937008483&di=5e1b3955e3b522a0b221616ee4dfda6c&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd000baa1cd11728bb8fb7eb7c8fcc3cec2fd2c55.jpg",
  Info:"sdds",
  ed:"你好"
},
{urlImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600937008483&di=5e1b3955e3b522a0b221616ee4dfda6c&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd000baa1cd11728bb8fb7eb7c8fcc3cec2fd2c55.jpg",
Info:"sdds",
ed:"你好"},
{urlImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600937008483&di=5e1b3955e3b522a0b221616ee4dfda6c&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd000baa1cd11728bb8fb7eb7c8fcc3cec2fd2c55.jpg",
Info:"sdds",
ed:"你好"
},
{urlImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600937008483&di=5e1b3955e3b522a0b221616ee4dfda6c&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd000baa1cd11728bb8fb7eb7c8fcc3cec2fd2c55.jpg",
Info:"sdds",
ed:"你好"},
{urlImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600937008483&di=5e1b3955e3b522a0b221616ee4dfda6c&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd000baa1cd11728bb8fb7eb7c8fcc3cec2fd2c55.jpg",
Info:"sdds",
ed:"你好"
},
{urlImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600937008483&di=5e1b3955e3b522a0b221616ee4dfda6c&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd000baa1cd11728bb8fb7eb7c8fcc3cec2fd2c55.jpg",
Info:"sdds",
ed:"你好"},
{urlImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600937008483&di=5e1b3955e3b522a0b221616ee4dfda6c&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd000baa1cd11728bb8fb7eb7c8fcc3cec2fd2c55.jpg",
Info:"sdds",
ed:"你好"
},
{urlImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600937008483&di=5e1b3955e3b522a0b221616ee4dfda6c&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd000baa1cd11728bb8fb7eb7c8fcc3cec2fd2c55.jpg",
Info:"sdds",
ed:"你好"},
{urlImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600937008483&di=5e1b3955e3b522a0b221616ee4dfda6c&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd000baa1cd11728bb8fb7eb7c8fcc3cec2fd2c55.jpg",
Info:"sdds",
ed:"你好"
},
{urlImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600937008483&di=5e1b3955e3b522a0b221616ee4dfda6c&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd000baa1cd11728bb8fb7eb7c8fcc3cec2fd2c55.jpg",
Info:"sdds",
ed:"你好"},
{urlImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600937008483&di=5e1b3955e3b522a0b221616ee4dfda6c&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd000baa1cd11728bb8fb7eb7c8fcc3cec2fd2c55.jpg",
Info:"sdds",
ed:"你好"
},
    
    ],
     
        
      [],  
    ],//喜欢我的
    myLoveInfo:[],//我喜欢的
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
  //阅读发过消息的
  readInfo:function(){

  },
  ceshi:function(){
  

      
    const db = wx.cloud.database()
        const _ = db.command

       
        const openID = [123,321]
        const initList= db.collection('chatroom').where({
          groupId: _.in([123])
        }).get({
          success: console.log,
          fail: console.error
        })

       
/*
        this.setData({
          chats: initList.reverse(),
          scrollTop: 10000,
        })*/

      
      },
  

})
const app = getApp()

Page({
  data: {
    nickName:"ceshi",
    userImg:"",
    userImgOther:"",
    avatarUrl: './user-unlogin.png',
    userInfo: null,
    logged: false,
    takeSession: false,
    requestResult: '',
    // chatRoomEnvId: 'release-f8415a',
    chatRoomCollection: 'chatroom',
    chatRoomGroupId: [123,321],
    chatRoomGroupName: '聊天室',

    // functions for used in chatroom components
    onGetUserInfo: null,
    getOpenID: null,

    //ID号

    mineID:null,
    userID:null
  },

  onLoad: function(e) {

    var groupId=[]
    var nickName=e.nickName
    var userImg=e.userImg
    var userImgOther=e.userImgOther
    groupId[0]=Number(e.userID)
    groupId[1]=Number(e.mineID)
    
   // groupId[0]=Number(74798)
    //groupId[1]=Number(74798)
    groupId.sort((a, b) => a - b);
    console.log("标志0",groupId)
    console.log("标志1",nickName)
    console.log("标志2",userImg)

    this.setData({
      mineID:e.mineID,
      userID:e.userID,
      chatRoomGroupId:groupId,
      nickName:nickName,
      userImg:userImg,
      userImgOther:userImgOther
    /* userImg: " http://pic.rmb.bdstatic.com/9619bd4b6f54160c5c81c6525f35f88b.jpeg",
     userImgOther:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600937008483&di=5e1b3955e3b522a0b221616ee4dfda6c&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd000baa1cd11728bb8fb7eb7c8fcc3cec2fd2c55.jpg"*/
    })
  


    // 获取用户信息
   /* wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("调用",res.userInfo)
              this.setData({
                avatarUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600937008483&di=5e1b3955e3b522a0b221616ee4dfda6c&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd000baa1cd11728bb8fb7eb7c8fcc3cec2fd2c55.jpg",
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })*/

    this.setData({
      onGetUserInfo: this.onGetUserInfo,
      getOpenID: this.getOpenID,
    })

    wx.getSystemInfo({
      success: res => {
        console.log('system info', res)
        if (res.safeArea) {
          const { top, bottom } = res.safeArea
          this.setData({
            containerStyle: `padding-top: ${(/ios/i.test(res.system) ? 10 : 20) + top}px; padding-bottom: ${20 + res.windowHeight - bottom}px`,
          })
        }
      },
    })

    

  },

  getOpenID: async function() {
    if (this.openid) {
      return this.openid
    }

    const { result } = await wx.cloud.callFunction({
      name: 'login',
    })

    return result.openid
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onShareAppMessage() {
   /* return {
      title: '即时通信 Demo',
      path: '/pages/im/room/room',
    }*/
  },
})

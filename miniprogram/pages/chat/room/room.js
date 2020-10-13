const app = getApp()

Page({
  data: {
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
  },

  onLoad: function(e) {

    var groupId=[]
    groupId[0]=Number(e.userID)
    groupId[1]=Number(e.mineID)
    groupId.sort((a, b) => a - b);
    console.log("标志",groupId)

    this.setData({
      chatRoomGroupId:groupId
      
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

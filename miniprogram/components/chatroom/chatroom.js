const FATAL_REBUILD_TOLERANCE = 10
const SETDATA_SCROLL_TO_BOTTOM = {
  scrollTop: 100000,
  scrollWithAnimation: true,
}

Component({
  properties: {
    envId: String,
    collection: String,
    groupId: Array,
    groupName: String,
    userInfo: Object,
    onGetUserInfo: {
      type: Function,
    },
    getOpenID: {
      type: Function,
    },
    nickName:String,
    nickUrl:String,
    
    mineID:String,
    userID:String,
    nickUrlOther:String,
  },

  data: {
    chats: [],
    textInputValue: '',
    openId: '',
    scrollTop: 0,
    scrollToMessage: '',
    hasKeyboard: false,
    date :""
  },

  methods: {
    onGetUserInfo(e) {
      this.properties.onGetUserInfo(e)
    },

    getOpenID() { 
      return this.properties.getOpenID() 
    },

    mergeCommonCriteria(criteria) {
      return {
        groupId: this.data.groupId,
        ...criteria,
      }
    },
     formatTime:function(date) {
     // var publishTime = parseInt(string),//必须对传入的字符串做格式化，否则getDate将无法转换数据
        //    date = getDate(publishTime), //转化为标准时间格式：Thu Sep 06 2018 18:47:00 GMT+0800 (中国标准时间）
          var  Y = date.getFullYear();
          var  M = date.getMonth() + 1;
          var D = date.getDate();
          var H = date.getHours();
          var m = date.getMinutes();
          var s = date.getSeconds();
         // 获取date 中的 年 月 日 时 分 秒
      // 对 月 日 时 分 秒 小于10时, 加0显示 例如: 09-09 09:01
      if (M < 10) {
            M = '0' + M;
      }
      if (D < 10) {
            D = '0' + D;
      }
      if (H < 10) {
            H = '0' + H;
      }
      if (m < 10) {
            m = '0' + m;
      }
      if (s < 10) {
            s = '0' + s;
      }
      
       return Y+'-'+M+'-'+D+' '+H+':'+m
},

    async initRoom() {
      //初始化
      this.try(async () => {
      //  await this.initOpenID()

        const { envId, collection } = this.properties
        const db = this.db = wx.cloud.database({
          env: envId,
        })
        const _ = db.command

        const { data: initList } = await db.collection(collection).where(this.mergeCommonCriteria()).orderBy('sendTimeTS', 'desc').get()
        for(var i=0;i<initList.length;i++){
          initList[i].data=this.formatTime(initList[i].sendTime)

        }
        console.log('init query chats', initList)

        this.setData({
          chats: initList.reverse(),
          scrollTop: 10000,
        })

        this.initWatch(initList.length ? {
          sendTimeTS: _.gt(initList[initList.length - 1].sendTimeTS),
        } : {})
      }, '初始化失败')
    },

   /* async initOpenID() {
      return this.try(async () => {
        const openId = await this.getOpenID()

        this.setData({
          openId,
        })
      }, '初始化 openId 失败')
    },
*/
    async initWatch(criteria) {
      this.try(() => {
        const { collection } = this.properties
        const db = this.db
        const _ = db.command

        console.warn(`开始监听`, criteria)
        this.messageListener = db.collection(collection).where(this.mergeCommonCriteria(criteria)).watch({
          onChange: this.onRealtimeMessageSnapshot.bind(this),
          onError: e => {
            if (!this.inited || this.fatalRebuildCount >= FATAL_REBUILD_TOLERANCE) {
              this.showError(this.inited ? '监听错误，已断开' : '初始化监听失败', e, '重连', () => {
                this.initWatch(this.data.chats.length ? {
                  sendTimeTS: _.gt(this.data.chats[this.data.chats.length - 1].sendTimeTS),
                } : {})
              })
            } else {
              this.initWatch(this.data.chats.length ? {
                sendTimeTS: _.gt(this.data.chats[this.data.chats.length - 1].sendTimeTS),
              } : {})
            }
          },
        })
      }, '初始化监听失败')
    },

    onRealtimeMessageSnapshot(snapshot) {
      console.warn(`收到消息`, snapshot)

      if (snapshot.type === 'init') {
        this.setData({
          chats: [
            ...this.data.chats,
            ...[...snapshot.docs].sort((x, y) => x.sendTimeTS - y.sendTimeTS),
          ],
        })
        this.scrollToBottom()
        this.inited = true
      } else {
        let hasNewMessage = false
        let hasOthersMessage = false
        const chats = [...this.data.chats]
        for (const docChange of snapshot.docChanges) {
          switch (docChange.queueType) {
            case 'enqueue': {
              hasOthersMessage = docChange.doc._openid !== this.data.openId
              const ind = chats.findIndex(chat => chat._id === docChange.doc._id)
              if (ind > -1) {
                if (chats[ind].msgType === 'image' && chats[ind].tempFilePath) {
                  chats.splice(ind, 1, {
                    ...docChange.doc,
                    tempFilePath: chats[ind].tempFilePath,
                  })
                } else chats.splice(ind, 1, docChange.doc)
              } else {
                hasNewMessage = true
                chats.push(docChange.doc)
              }
              break
            }
          }
        }
        this.setData({
          chats: chats.sort((x, y) => x.sendTimeTS - y.sendTimeTS),
        })
        if (hasOthersMessage || hasNewMessage) {
          this.scrollToBottom()
        }
      }
    },
//发送文字

    async onConfirmSendText(e) {
      this.try(async () => {
        if (!e.detail.value) {
          return
        }

        const { collection } = this.properties
        const db = this.db
        const _ = db.command
        const chatMineID=Number(this.data.mineID) 
        const chatUserID=Number(this.data.userID)

        const doc = {
          _id: `${Math.random()}_${Date.now()}`,
          ID:chatMineID,
          groupId: this.data.groupId,
          avatar: this.data.nickUrl,
          nickName: this.data.nickName,
          msgType: 'text',
          textContent: e.detail.value,
          sendTime: db.serverDate(),
          sendTimeTS: Date.now(), // fallback
        }   
        this.setData({
          textInputValue: '',
          chats: [
            ...this.data.chats,
            {
              ...doc,
              _openid: this.data.openId,
              writeStatus: 'pending',
            },
          ],
        })
        this.scrollToBottom(true)

        await db.collection(collection).add({
          data: doc,
        })
        console.log("己方ID",chatMineID)
        console.log("对方ID",chatUserID)
//纪录己方通讯时间
        await db.collection("new").where({
          ID: chatMineID,
        }).get({
          success: function(res) {
            console.log("纪录己方通讯时间文",res)
            var myLove=res.data[0].myLove
            var _id1=res.data[0]._id
            //console.error("传入数组ID", _id)
            const docMine = {
              _id: chatUserID,//纪录对方ID
              msgType: 'text',
              textContent: e.detail.value,
              sendTime: db.serverDate(),
              sendTimeTS: Date.now(), // fallback
            }

            const myLoveNew=abc(myLove,docMine,chatUserID);//生成myLove数组
            
            console.log("函数返回值",myLoveNew)
             
             save("new",_id1,myLoveNew,chatMineID)//上传

          }
        })

        function abc(myLove,Adddoc,ID){
        var flag=find(myLove,ID)
        console.log("函数返回值11",flag)
        switch(flag){
          case -1://不存在
         //排序
            break;
          default://存在，取消关注
          myLove.splice(flag,1)
         
            console.log("存在",myLove)
            break;
        }
        myLove.push(Adddoc)
        console.log("函数返回值",myLove)
        return myLove
        }

        function save(table,doc_id,myLove,mineID){
          //初始化
          const db = wx.cloud.database()
          const _ = db.command
          console.log("保存函数1", table)
          console.log("保存函数2", doc_id)
          console.log("保存函数3", myLove)
          db.collection(table).doc(doc_id).set({
            data:{
              ID:mineID,
              myLove:myLove,
            },
           
            success: function(res) {
              console.log("更新成功",res.data)
            }
          })
        }
        //查询数据
        function find(arry,num) {
          console.log("查找数组",arry);
          var flag=-1;

          for(var i=0;i<arry.length;i++){
            console.log("查询数组",arry[i]._id)
            if(arry[i]._id==num)
              flag=i
        }
        return flag
        }


        this.setData({
          chats: this.data.chats.map(chat => {
            if (chat._id === doc._id) {
              return {
                ...chat,
                writeStatus: 'written',
              }
            } else return chat
          }),
        })
      }, '发送文字失败')
    },
//发送图片
    async onChooseImage(e) {
      const db = this.db
      const _ = db.command
 
      const chatMineID=Number(this.data.mineID) 
      const chatUserID=Number(this.data.userID)
      wx.chooseImage({
        count: 1,
        sourceType: ['album', 'camera'],
        success: async res => {
          const { envId, collection } = this.properties
          const doc = {
            _id: `${Math.random()}_${Date.now()}`,
            groupId: this.data.groupId,
            avatar: this.data.nickUrl,
            nickName: this.data.nickName,//设置人物昵称
            msgType: 'image',
            sendTime:db.serverDate(),
            sendTimeTS: Date.now(), // fallback
          }

          this.setData({
            chats: [
              ...this.data.chats,
              {
                ...doc,
                _openid: this.data.openId,
                tempFilePath: res.tempFilePaths[0],
                writeStatus: 0,
              },
            ]
          })
          this.scrollToBottom(true)

          //纪录己方通讯时间
        await db.collection("new").where({
          ID: chatMineID,
        }).get({
          success: function(res) {
            console.log("纪录己方通讯时间图",res)
            var myLove=res.data[0].myLove
            var _id1=res.data[0]._id
            //console.error("传入数组ID", _id)
            const docMine = {
              _id: chatUserID,//纪录对方ID
              msgType: 'image',
              textContent:"[图片]",
              sendTime: db.serverDate(),
              sendTimeTS: Date.now(), // fallback
            }

            const myLoveNew=abc(myLove,docMine,chatUserID);//生成myLove数组
            
            console.log("函数返回值",myLoveNew)
             
             save("new",_id1,myLoveNew,chatMineID)//上传

          }
        })

        function abc(myLove,Adddoc,ID){
        var flag=find(myLove,ID)
        console.log("函数返回值11",flag)
        switch(flag){
          case -1://不存在
         //排序
            break;
          default://存在，取消关注
          myLove.splice(flag,1)
         
            console.log("存在",myLove)
            break;
        }
        myLove.push(Adddoc)
        console.log("函数返回值",myLove)
        return myLove
        }

        function save(table,doc_id,myLove,mineID){
          //初始化
          const db = wx.cloud.database()
          const _ = db.command
          console.log("保存函数1", table)
          console.log("保存函数2", doc_id)
          console.log("保存函数3", myLove)
          db.collection(table).doc(doc_id).set({
            data:{
              ID:mineID,
              myLove:myLove,
            },
           
            success: function(res) {
              console.log("更新成功",res.data)
            }
          })
        }
        //查询数据
        function find(arry,num) {
          console.log("查找数组",arry);
          var flag=-1;

          for(var i=0;i<arry.length;i++){
            console.log("查询数组",arry[i]._id)
            if(arry[i]._id==num)
              flag=i
        }
        return flag
        }
          const uploadTask = wx.cloud.uploadFile({
            cloudPath: `${this.data.groupId}/${Math.random()}_${Date.now()}.${res.tempFilePaths[0].match(/\.(\w+)$/)[1]}`,
            filePath: res.tempFilePaths[0],
            config: {
              env: envId,
            },
            success: res => {
              this.try(async () => {
                await this.db.collection(collection).add({
                  data: {
                    ...doc,
                    imgFileID: res.fileID,
                  },
                })
              }, '发送图片失败')
            },
            fail: e => {
              this.showError('发送图片失败', e)
            },
          })

          uploadTask.onProgressUpdate(({ progress }) => {
            this.setData({
              chats: this.data.chats.map(chat => {
                if (chat._id === doc._id) {
                  return {
                    ...chat,
                    writeStatus: progress,
                  }
                } else return chat
              })
            })
          })
        },
      })
    },

    onMessageImageTap(e) {
      wx.previewImage({
        urls: [e.target.dataset.fileid],
      })
    },

    scrollToBottom(force) {
      if (force) {
        console.log('force scroll to bottom')
        this.setData(SETDATA_SCROLL_TO_BOTTOM)
        return
      }

      this.createSelectorQuery().select('.body').boundingClientRect(bodyRect => {
        this.createSelectorQuery().select(`.body`).scrollOffset(scroll => {
          if (scroll.scrollTop + bodyRect.height * 3 > scroll.scrollHeight) {
            console.log('should scroll to bottom')
            this.setData(SETDATA_SCROLL_TO_BOTTOM)
          }
        }).exec()
      }).exec()
    },
    async onScrollToUpper() {
      if (this.db && this.data.chats.length) {
        const { collection } = this.properties
        const _ = this.db.command
        const { data } = await this.db.collection(collection).where(this.mergeCommonCriteria({
          sendTimeTS: _.lt(this.data.chats[0].sendTimeTS),
        })).orderBy('sendTimeTS', 'desc').get()
        this.data.chats.unshift(...data.reverse())
        this.setData({
          chats: this.data.chats,
          scrollToMessage: `item-${data.length}`,
          scrollWithAnimation: false,
        })
      }
    },

    async try(fn, title) {
      try {
        await fn()
      } catch (e) {
        this.showError(title, e)
      }
    },

    showError(title, content, confirmText, confirmCallback) {
      console.error(title, content)
      wx.showModal({
        title,
        content: content.toString(),
        showCancel: confirmText ? true : false,
        confirmText,
        success: res => {
          res.confirm && confirmCallback()
        },
      })
    },
  },

  ready() {
    global.chatroom = this
    this.initRoom()
    this.fatalRebuildCount = 0
  },

})

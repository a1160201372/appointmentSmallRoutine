const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  title=event.title
  time=event.time
  content=event.content
  console.log("云函数",context)
  try {
    const result = await cloud.openapi.subscribeMessage.send({
        touser: 'ouFO65Ypkw2b-YDuoJ7tl3sKXV_g',
        page: 'index',
        lang: 'zh_CN',
        data: {
          phrase2: {
            value: title
          },
          time3: {
            value: time
          },
          thing1: {
            value: content
          },
   
        },
        templateId: 'nmhJ_6jdqSN3BnSdsosluxTTSaXhpmwupVpd3bPhyRY',
        miniprogramState: 'trial'
      })
    return result
  } catch (err) {
    return err
  }
}
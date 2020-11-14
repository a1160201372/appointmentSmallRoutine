const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  //console.log("云函数",event.result.phone.data)
  //console.log("云函数",context)
  try {
  return event
  } catch (err) {
    return err
  }
}
/*************************
 * 定义变量
 */
var ID=[]




  /***********************************************/
  /*函数功能：读取数据库中的函数
  /*
  /*输入数据：
    table：数据库名称
    
  /*返回数据：
  /*
  /*
  /***********************************************/
  function readID(table){
  var myLove=0
    const db = wx.cloud.database()
    db.collection(table).where({
      _openid: '{openid}'
    }).get({
      success:function(res){
        console.log("喜欢",res.data[0].myLove)
        myLove=res.data[0].myLove
        returnValue=res.data[0].myLove
      },
      fail:function(e){
        console.log("数据库加载失败",e)
      }
    })
  };

  function ceshi(){
 
    return 123;
  };
  //暴露接口（否则外部无法接入函数）
  module.exports = {
    readID: readID,//获得接口地址
    IsChinese: ceshi,
  }

// miniprogram/pages/main/blindCard/index.js
const textColorY="#ef4136"
const backColorY="#fffffb"

const textColorN="#130c0e"
const backColorN="#fffffb"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      
     
    ],

    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s

    followBackColor:"f15b6c",
    followColor:"#f15b6c",

    user:"",
    userID:"ID:3365",
    mineID:0,
    userBiceInfo:[],
    loverInfo:[],
    acceptanceSelf:"该用户没有写自我介绍。",
    openid:"",

    inComeArry:["1千以下","1~2千","2~3千","3~4千","4~8千","8千~1万","1~2万","2~5万","五万以上"],
    eductionArry:["初中","高中","大专","本科","硕士","博士"],
    nationArry:["汉族","蒙古族","回族","藏族","维吾尔族",
    "苗族","彝族","壮族","布依族","朝鲜族","满族","侗族",
    "瑶族","白族","土家族","哈尼族","哈萨克族","傣族","黎族",
    "傈僳族","佤族","畲族","高山族","拉祜族","水族","东乡族",
    "纳西族","景颇族","柯尔克孜族", "土族","达斡尔族","仫佬族",
    "羌族","布朗族","撒拉族","毛南族","仡佬族","锡伯族","阿昌族",
    "普米族","塔吉克族","怒族", "乌孜别克族","俄罗斯族","鄂温克族",
    "德昂族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族",
    "赫哲族","门巴族","珞巴族","基诺族"],//民族
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    wx.showLoading({
      title: '加载中',
    })
    */
   console.log("所有0",Number(options.userID))
   console.log("所有1",Number(options.mineID))
   this.data.mineID=Number(options.mineID)
   this.data.userID=Number(options.userID)

    //this.data.userID=options.id
    //this.data.userID=1001//测试
    //this.data.mineID=1001//测试
    //获取用户openid
   // this.readOpenId(Number(options.id))

   
    //读取图片
     this.readImage(Number(options.userID))
    //读取择偶要求
    this.readOther(Number(options.userID))
   //读取用户信息
   this.readUserInfo(Number(options.userID))
  //  读取自我介绍
      this.readIntroduce(Number(options.userID))
      
     //读取关注状态
    this.readFollow("myLove",Number(options.mineID),Number(options.userID))
   //this.readFollow("myLove",this.data.mineID,100)
  },
  follow:function (e) {

    wx.showLoading({
      title: '加载中',
    })
    this.writeMylove("myLove",this.data.mineID,this.data.userID)
    this.writeMylove("loveMe",this.data.userID,this.data.mineID)
   
   
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
  news:function(){
    

    wx.navigateTo({
      url: '../../chat/room/room?userID='+this.data.userID+'&mineID='+this.data.mineID
    });
    



  },
  //读取用户openID
  readOpenId:function(ID){
    var that=this
   
      const db = wx.cloud.database()
      db.collection('userID').where({
        ID: ID
      }).get({
        success:function(res){
          console.log("userID",res.data.length)
          if(res.data.length==0){//没有用户ID
           
          }
          else{//已经存在 
          console.log("userID",res.data[0]._openid) 

            that.setData({
              openid:res.data[0]._openid
            })
          }
        },
        fail:function(e){
          console.log("数据库加载失败",e)
        }
      })
    },
    //读取用户图片
  readImage:function(ID){
      var that=this
      var openid=this.data.openid
      console.log("图片",this.data.openid) 
        const db = wx.cloud.database()
        db.collection('userPhotos').where({
          ID: ID
        }).get({
          success:function(res){
            console.log("自我介绍",res.data.length)
            if(res.data.length==0){//没有用户ID
              console.log("无图片") 
            }
            else{//已经存在 
            console.log("图片界面",res.data[0].fileID) 
              var tmp=res.data[0].fileID
              for(var i=0;i<res.data[0].fileID.length;i++)
              {
                tmp[i]="cloud://ceshi-fdybb.6365-ceshi-fdybb-1302833646/"+res.data[0].fileID[i]
              }
              console.log("图片界面sss",tmp) 
              that.setData({
                imgUrls:tmp
              })
            }
          },
          fail:function(e){
            console.log("数据库加载失败",e)
          }
        })
   },
   //读取用户择偶要求
   readOther:function(ID){
    var that=this
    var openid=this.data.openid
    console.log("图片",this.data.openid) 
      const db = wx.cloud.database()
      db.collection('userOther').where({
        ID: ID
      }).get({
        success:function(res){
          console.log("自我介绍",res.data.length)
          if(res.data.length==0){//没有用户ID
            console.log("无图片") 
          }
          else{//已经存在 
            console.log("择偶要求",res.data[0].age[0]) 
            var Info=that.data.loverInfo
            //年龄
            var age=res.data[0].age[0]+"岁~"+res.data[0].age[1]+"岁"
            var height=res.data[0].height[0]+"cm~"+res.data[0].height[1]+"cm"
            var eduction=that.data.eductionArry[res.data[0].ed]
            var inCome="最低收入："+that.data.inComeArry[0]
            var marry="婚姻情况："+res.data[0].marry
            var workPlay="工作地点："+res.data[0].workPlace[0]+","+res.data[0].workPlace[1]+","+res.data[0].workPlace[2]
            var house="房子情况："+res.data[0].house
            var car="购车情况："+res.data[0].car
            Info[0]=age
            Info[1]=height
            Info[2]=eduction
            Info[3]=inCome
            Info[4]=marry
            Info[5]=workPlay
            Info[6]=house
            Info[7]=car
            console.log("显示择偶要求",Info) 
            that.setData({
              loverInfo:Info
            })

            


           //loverInfo.
          }
        },
        fail:function(e){
          console.log("数据库加载失败",e)
        }
      })
 },
     //读取用户基本信息
     readUserInfo:function(ID){
      var that=this
        const db = wx.cloud.database()
        db.collection('userInfo').where({
          ID: ID
        }).get({
          success:function(res){
            console.log("自我介绍",res.data.length)
            if(res.data.length==0){//没有用户ID
              console.log("无图片") 
              wx.hideLoading()
            }
            else{//已经存在 
            console.log("个人信息",res.data[0].fileID) 
            this.now = new Date();
            this.nowYear = this.now.getFullYear(); //当前年
            var Info=[""];
            var age=this.nowYear-res.data[0].bathday[0]+"岁"//年龄
            var height=res.data[0].height+"cm"//身高
            var nation=that.data.nationArry[res.data[0].nation]//民族
            var weight=res.data[0].weight+"Kg"//体重
            var userHead=res.data[0].vocation+"  \t(ID:"+ID+")"//ID号
            var inCome=that.data.inComeArry[res.data[0].inCome]//收入
            console.log("当前日期",res.data[0].bathday) 
            
          // that.data.vocation()
        
            Info[0]=age
            Info[1]=height
            Info[2]=nation
            Info[3]=weight
            Info[4]=inCome
           
            that.setData({
              userBiceInfo:Info,
              user:userHead
            })
            wx.hideLoading()

            }
          },
          fail:function(e){
            console.log("数据库加载失败",e)
          }
        })
   },
   //读取用户自我介绍
   readIntroduce:function(ID){
 
    var that=this
    const db = wx.cloud.database()
    db.collection('userIntroduce').where({
      ID: ID
    }).get({
      success:function(res){
        console.log("自我介绍",res.data.length)
        if(res.data.length==0){//没有用户ID
          console.log("无图片") 
        }
        else{//已经存在 
        console.log("个人信息",res.data[0].Introduce) 
    
   
       if(res.data[0].Introduce==""){
        that.setData({
          acceptanceSelf:"该用户没有写自我介绍。",
        })
       }else{
        that.setData({
          acceptanceSelf:res.data[0].Introduce,
        })
       }
        
  

        }
      },
      fail:function(e){
        console.log("数据库加载失败",e)
      }
    })
   },
   //读取关注状态
   readFollow:function (table,mineID,userID) {

      var that=this
    const db = wx.cloud.database()
    console.log("0",mineID)
    db.collection(table).where({
      ID: mineID
    }).get({
      success:function(res){

        console.log("自我介绍",res.data)
        if(res.data.length==0){//没有用户ID
          console.log("资料") //添加

          db.collection(table).add({
            // data 字段表示需新增的 JSON 数据
            data: {
              ID:mineID,
              myLove:[],
            },
            success: function(res) {
              console.log("成功",res)
              that.setData({
                followBackColor:backColorY,
                followColor:textColorY,
              })
                //
            },
            fail: function(res) {
              console.log("失败",res)
              wx.hideLoading()
              wx.showToast({
                icon:none,
                title: '创建数据失败,请稍后重新注册',
              })
            }
          })
        }
        else{//已经存在 //遍历查询
          console.log("关注列表",res.data[0].myLove)
          var flag=that.find(res.data[0].myLove,userID)
          switch(flag){
            case -1://不存在
            that.setData({
              followBackColor:backColorN,
              followColor:textColorN,
            })
            break;
              default://存在，取消关注
              that.setData({
                followBackColor:backColorY,
                followColor:textColorY,
              })
              break;
          }
/*
        map.forEach(element => {//直接操作数组//遍历
        console.log("遍历",element)
        element.name=element.id
  
          });*/
  

        }
      },
      fail:function(e){
        console.log("数据库加载失败",e)
      }
    })
   },
   //修改关注
   writeMylove:function (table,mineID,userID) {
    console.log("函数0",table)
    console.log("函数1",mineID)
    console.log("函数2",userID)
    var that=this
    const db = wx.cloud.database()
    db.collection(table).where({
      ID: mineID
    }).get({
      success:function(res){
        var myLove=[]
        var myLoveFlag=null
        console.log("函数3",res.data.length)
        if(res.data.length==0){
          myLove=[userID]
          console.log("添加人数",table)
          console.log("函数ID",userID)
          console.log("函数myLove",myLove)
          db.collection(table).add({
            // data 字段表示需新增的 JSON 数据
            data: {
              ID:mineID,
              myLove:myLove
            },
            success: function(res) {
              console.log("成功",res)
              
            },
            fail: function(res) {
              console.log("失败",res)
              wx.hideLoading()
              wx.showToast({
                icon:none,
                title: '创建数据失败,请检查网络',
              })
            }
          })
        }
        else{//已经存在
           myLove=res.data[0].myLove
          console.log("myLove",res.data[0].myLove)
          var flag=that.find(myLove,userID)
          switch(flag){
            case -1://不存在
           //排序
            myLove.push(userID)
            myLove.sort((a, b) => a - b);
            myLoveFlag=0

              break;
            default://存在，取消关注
            myLove.splice(flag,1)
            myLoveFlag=1
              console.log("存在",myLove)
              break;
          }

            //保存数据
          db.collection(table).doc(res.data[0]._id).update({
            data:{
              myLove:myLove
            },
            success: function(res) {
               wx.hideLoading()
              console.log("成功1",myLove)
              if(mineID==that.data.mineID)
              {
              if(myLoveFlag==0)
              {
                that.setData({
                  followBackColor:backColorY,
                  followColor:textColorY,
                })
                wx.showToast({
                  icon:none,
                  title: '关注成功',
                  duration: 2000,
                })
              }
              else{
                that.setData({
                  followBackColor:backColorN,
                  followColor:textColorN,
                })
                wx.showToast({
                  icon:none,
                  title: '取消成功',
                  duration: 2000,
                })
              }
            }
            
            },
            fail: function(res) {
              console.log("失败",res)
              wx.showToast({
                icon:none,
                title: '数据修改失败,请稍后重新注册',
                duration: 2000,
              })
            }
          })
        
            


        //  Arrays.sort(myLove);//排序存储

      
        
        }
      },
      fail:function(e){
        console.log("数据库加载失败",e)
        wx.hideLoading()
        wx.showToast({
          icon:none,
          title: '数据库加载失败,请稍后重新注册',
        })
      }
    })
   },
   
   find:function(arry,num) {
    var start = 0;
    var flag=0;
		var end =arry.length-1;
		while(start<=end) {//当查找完成时，结束位置会小于起始位置
			//先定义中间值
			var middle = Math.floor((start+end)/2);
			if(num<arry[middle]) {
				//如果要查找的数小于等于中间数则取前半部分
				end = middle-1;
			}else if(num>arry[middle]){
				//如果要查找大于中间数则取后半部分
				start = middle+1;
			}else{
      console.log("你要找的在第"+middle+"号位置");
      flag=middle;

				break;
			}
		}
		if(start>end) {
			console.log("该数组中没有您要找的数");
			flag=-1;
    }
    return flag
	}
   

})
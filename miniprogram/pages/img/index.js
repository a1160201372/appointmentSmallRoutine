var that
Page({
  data: {
    arr1: [0,1,2,3,4,5,6,7,8,9],
    arr2: [0,1,2,3,4,5,6,7,8,9],
    arr3: [0,1,2,3,4,5,6,7,8,9],
    kg: "Kg",
  },
 
  bindChange: function(e) {
    const val = e.detail.value  
    this.setData({
      arr1Value: this.data.arr1[val[0]],
      arr2Value: this.data.arr2[val[1]],
      arr3Value: this.data.arr2[val[2]],
    })
  }
})
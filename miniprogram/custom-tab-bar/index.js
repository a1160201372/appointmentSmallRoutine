Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/main/meet/index",
      iconPath: "/images/tab/icon_component.png",
      selectedIconPath: "/images/tab/icon_component_HL.png",
      text: "遇见"
    }, {
      pagePath: "/pages/main/mine/index",
      iconPath: "/images/tab/icon_API.png",
      selectedIconPath: "/images/tab/icon_API_HL.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
     //console.log(data.index)
      this.setData({
        selected: data.index
      })
    }
  }
})
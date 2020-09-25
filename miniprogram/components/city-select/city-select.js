const QQMapWX = require('./qqmap.js');
import {province} from "./province";

Component({
    created() {
        this.qqmap = new QQMapWX({
            key: "5GIBZ-IO23U-GKGV4-BIEMW-P27HF-Q4B6Q"
        });
    },
    properties: {
        showSelect: {
            type: Boolean,
            value: false
        },
    },
    data: {
        _activeTab: 0,
        _selectList: [province],
        _userSelect: [],
        option:["选择省份","选择城市","选择县区","选择街道"]
    },
    methods: {
        _hideSelect() {
            this.setData({
                showSelect: false
            });
        },
        _refreshSelect(level) {
            let l = this.data._selectList;
            l.splice(level + 1, l.length - level);
            let u = this.data._userSelect;
            u.splice(level, u.length - level);
            this.setData({
                _selectList: l,
                _userSelect: u
            })
        },
        _selectItem(e) {
            wx.showLoading({title: '加载中', mask: true});
            let that = this;
            let regionId = e.target.dataset.id;
            let level = Number(e.target.dataset.level);
           
          //  console.log(level, this.data._userSelect.length);
            if (level !== this.data._userSelect.length) {
                this._refreshSelect(level)
            }
            this.setData({
                _userSelect: that.data._userSelect.concat({
                    id: e.target.dataset.id,
                    name: e.target.dataset.name
                })
            });
            if (regionId.length > 6) {
                wx.hideLoading();
                this.onSelectCommit();
                return false
            }
            this._getRegionData(regionId)
                .then((res) => {
                    that.setData({
                        _selectList: that.data._selectList.concat(res.result),
                        _activeTab: that.data._selectList.length,
                    })
                })

        },
        _getRegionData(regionid) {
            return new Promise((resolve, reject) => {
                this.qqmap.getDistrictByCityId({
                    id: regionid, // 对应城市ID
                    success: function (res) {
                        resolve(res)
                    },
                    fail: function (err) {
                        reject(err)
                    },
                    complete: function (res) {
                        wx.hideLoading()
                    }
                });
            })
        },
        _selectHead(e) {
            let level = e.target.dataset.level;
            this.setData({
                _activeTab: level
            });
            this._refreshSelect(level)
        },
        _tapSwiper(e) {
            let page = e.detail.current;
            this.setData({
                _activeTab: page
            })
        },
        onSelectCommit() {
            this._hideSelect();
            this.triggerEvent('selectCommit', {data: this.data._userSelect})
            this.setData({
                _activeTab: 0,
                _selectList: [province],
                _userSelect: []
            })
        }
    }
})

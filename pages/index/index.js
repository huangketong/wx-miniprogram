//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    price: 140,
    color: 'blue'
  },
  //事件处理函数
  bindViewTap: function() {
    console.log('4545')
    // 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },

  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },

  bindScanCode: function() {
    // 允许从相机和相册扫码
    wx.scanCode({
      success(res) {
        console.log(res)
        wx.showModal({
          title: '扫描结果',
          content: JSON.stringify(res),
        })
      }
    })

    // 只允许从相机扫码
    // wx.scanCode({
    //   onlyFromCamera: true,
    //   success(res) {
    //     console.log(res)
    //   }
    // })
  },

  bindCamera: function() {
    wx.navigateTo({
      url: '../camera/camera',
    })
  },

  bindChooseInvoice: function() {
    wx.chooseInvoice({
      success(res) {
        console.log(res)
      }
    })
  },

  bindChooseInvoiceTitle: function(){
    wx.chooseInvoiceTitle({
      success(res) {
        console.log(res)
      }
    })
  },

  bindAddress: function() {
    wx.chooseAddress({
      success(res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  },

  bindGetData: function(){
    console.log(this.data);
    const { price, color } = this.data;
    wx.reportAnalytics('click_test', {
      price,
      color,
    })
    wx.showToast({
      title: '同步数据',
    })
  },

  bindOpenSetting: function(e) {
    wx.openSetting({
      success: (res) => {
        console.log('open', res.authSetting)
      },
      fail: (res) => {
        console.log('openfail', res.errMsg)
      },
    })
  },

  toGetSetting: function(e) {
    console.log("toGetSetting")
    wx.
    wx.authorize({
      scope: 'scope.camera',
      success: (res) => {
        console.log('9999', res)
      }
    })
    // wx.getLocation({
    //   type: 'wgs84',
    //   success(res) {
    //     console.log(res)
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     const speed = res.speed
    //     const accuracy = res.accuracy
    //   }
    // })
  },
  onLoad: function () {
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log('getLocation', res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log('canIUsegetUserInfo', res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log('getUserInfo', res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

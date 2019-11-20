//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    console.log('4545')
    // 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  bindOpenSetting: () => {
    console.log('bindOpenSetting')
    wx.openSetting({
      success: (res) => {
        console.log('open', res.authSetting)
      },
      fail: (res) => {
        console.log('openfail', res.errMsg)
      },
    })
  },
  bindToGetSetting: (e) => {
    console.log(e)
    // wx.authorize({
    //   scope: 'scope.userLocation',
    //   success: (res) => {
    //     // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //     console.log('9999', res)
    //   }
    // })
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

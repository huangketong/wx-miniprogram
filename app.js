//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // https://developers.weixin.qq.com/community/develop/doc/000cea2305cc5047af5733de751008
    // 必须使用事件打开
    // wx.openSetting({
    //   success: (res) => {
    //     console.log('open', res.authSetting)
    //     // res.authSetting = {
    //     //   "scope.userInfo": true,
    //     //   "scope.userLocation": true
    //     // }
    //   },
    //   fail: (res) => {
    //     console.log('openfail', res.errMsg)
    //   },
    //   complete: (res) => {
    //     console.log('opencomplete', res.errMsg)
    //   }
    // })

    wx.checkSession({
      success: () => {
        //session_key 未过期，并且在本生命周期一直有效
        console.log('未过期，并且在本生命周期一直有效')
      },
      fail() {
        console.log('已经失效，需要重新执行登录流程')
        // session_key 已经失效，需要重新执行登录流程
        wx.login() //重新登录
      }
    })

    // 登录
    wx.login({
      success: res => {
        console.log('res', res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://**********/login',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('res-getSetting', res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
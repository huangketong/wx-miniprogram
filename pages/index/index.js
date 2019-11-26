//index.js
//获取应用实例
const app = getApp()

const supportMode = {
  fingerPrint: "指纹识别",
  facial: "人脸识别",
}

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

  supportFace: function(){
    // 检查是否支持生物识别
    wx.checkIsSupportSoterAuthentication({
      success(res) {
        console.log(res)
        // res.supportMode = [] 不具备任何被SOTER支持的生物识别方式
        // res.supportMode = ['fingerPrint'] 只支持指纹识别
        // res.supportMode = ['fingerPrint', 'facial'] 支持指纹识别和人脸识别
        if (res.supportMode.includes('facial')) {
          wx.startSoterAuthentication({
            requestAuthModes: ['facial'],
            challenge: '123456',
            authContent: '请用人脸解锁',
            success(res) {
              console.log('facial-success', res)
            },
            fail(res) {
              console.log('facial-fail', res)
            }
          })
        } else if (res.supportMode.includes("fingerPrint")) {
          wx.startSoterAuthentication({
            requestAuthModes: ['fingerPrint'],
            challenge: '123456',
            authContent: '请用指纹解锁',
            success(res) {
              console.log('facial-success', res)
              wx.showToast({
                title: '指纹识别成功',
              })
            },
            fail(res) {
              console.log('facial-fail', res)
            }
          })
        }
      }
    })
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

  openSetting: function(e) {
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
    // 查看是否授权
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.camera']) {
          wx.authorize({
            scope: 'scope.camera',
            success: (res) => {
              console.log('9999', res)
            }
          })
        }
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

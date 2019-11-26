// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiInfo: '',
  },

  // 调转到map页面
  gotoMap: () => {
    wx.navigateTo({
      url: '../map/map',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  // 调用支付
  bindUsePay: () => {
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success(res) {
        console.log('paySuccessRes')
      },
      fail(res) { 
        console.log('payFailRes', res)
        wx.showModal({
          title: '支付失败',
          content: JSON.stringify(res),
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('监听页面加载')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('初次渲染完成')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('监听页面显示')

    // 写法 1
    const $this = this;
    // wx.request({
    //   url: 'http://30.43.89.206:3000', //仅为示例，并非真实的接口地址
    //   data: {},
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log('res1', res)
    //     console.log('setData')
    //     $this.setData({
    //       apiInfo: res.data
    //     })
    //   }
    // });

    // 写法 2
    wx.showLoading({
      title: '正在请求接口...',
    })
    wx.request({
      url: 'http://30.43.88.246:3000/api/wx-test', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      // 使用箭头函数
      success: (res) => {
        console.log('res2', res)
        console.log('setData')
        this.setData({
          apiInfo: res.data
        })
        wx.hideLoading();
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('监听页面隐藏')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('监听页面卸载')
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

  }
})
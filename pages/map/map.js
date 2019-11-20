// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    markers: [
      // {
      //   id: 0,
      //   latitude: 30.25961,
      //   longitude: 120.13026,
      //   width: 5,
      //   height: 5
      // }
    ],
  },
  // 视野改变时，regionchange 会触发两次，返回的 type 值分别为 begin / end。
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },

  bindpoitap(e) {
    console.log(e)
    const detail = e.detail;
    if(detail) {
      wx.openLocation(detail)
    }
  },

  bindtapMark(e) {
    // console.log(e)
    const detail = e.detail;
    
    // wx.openLocation(detail)
  },

  bindBackLocation: function() {
    // const mapCtx = wx.createMapContext('map')
    this.mapCtx.moveToLocation();
  },

  bindGetCenterLocation: function() {
    // this.mapCtx.getCenterLocation({
    //   success: (res) => {
    //     console.log(res)
    //     wx.showModal({
    //       title: '中心点坐标',
    //       content: `经度: ${res.longitude}, 纬度: ${res.latitude}`,
    //     })
    //   }
    // })
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log(res)
        wx.showModal({
          title: '中心点坐标',
          content: `经度: ${res.longitude}, 纬度: ${res.latitude}, 位置的精确度: ${res.accuracy}, 水平精度: ${res.horizontalAccuracy}m`,
        })
      }
    })
  },

  bindChooseLocation: function() {
    wx.chooseLocation({
      success: (res) => {
        wx.showModal({
          title: '选择的位置',
          content: `经度: ${res.longitude}, 纬度: ${res.latitude}, ${res.address}, ${res.name}`
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('map')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getLocation({
      success: (res) => {
        console.log(res)
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        })
      },
    })
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

  }
})
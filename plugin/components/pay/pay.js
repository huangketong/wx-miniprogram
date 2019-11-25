// plugin/components/pay/pay.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    args: {
      fee: 1,             // 支付金额，单位为分
      paymentArgs: 'A', // 将传递到功能页函数的自定义参数
      currencyType: 'USD' // 货币符号，页面显示货币简写 US$ 
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 支付成功的回调接口
    paymentSuccess: function (e) {
      console.log(e);
      e.detail.extraData.timeStamp // 用 extraData 传递数据，详见下面功能页函数代码
    },
    // 支付失败的回调接口
    paymentFailed: function (e) {
      console.log(e);
    }
  }
})

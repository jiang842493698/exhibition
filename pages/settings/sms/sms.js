// pages/settings/sms/sms.js
let $ = getApp().$
let _this
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    _this.onSelect()
    _this.onSignature()
  },
  onSelect(){
    $.request.SmSAccount().getAccount().then(res => {
      if (res.resCode == 0) {
        let result = res.result[0]
        _this.setData({
          result
        })
      }
    })
  },
  onSignature() {
    $.request.SmsSign().getSmsSign().then(res => {
      if (res.resCode == 0) {
        let result = res.result[0]
        _this.setData({
          SmsSign: result
        })
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
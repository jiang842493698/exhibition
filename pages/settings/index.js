// pages/settings/index.js
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
    this.onselect()
  },
  onselect(){
    let userInfo = wx.getStorageSync("userInfo")
   
    let exInfo = wx.getStorageSync("exInfo")
    
    let startYear = new Date(exInfo.StartTime).getFullYear()
    let endYear = new Date(exInfo.EndTime).getFullYear()
    let startMonth = new Date(exInfo.StartTime).getMonth()+1
    let endMonth = new Date(exInfo.EndTime).getMonth()+1
    let startDate = new Date(exInfo.StartTime).getDate()
    let endDate = new Date(exInfo.EndTime).getDate()
    let time
    if (startMonth != endMonth && startYear != endYear){
      time = startYear + "年" + (startMonth < 10 ? "0" + startMonth : startMonth) + "月" + (startDate < 10 ? "0" + startDate : startDate) + "日-" + (endYear < 10 ? "0" + endYear : endYear) + "年" + (endMonth < 10 ? "0" + endMonth : endMonth) + "月" + (endDate < 10 ? "0" + endDate : endDate) +"日"
    }
    if (startMonth != endMonth && startYear == endYear){
      time = startYear + "年" + (startMonth < 10 ? "0" + startMonth : startMonth) + "月" + (startDate < 10 ? "0" + startDate : startDate) + "日-" + (endMonth < 10 ? "0" + endMonth : endMonth)  + "月" + (endDate < 10 ? "0" + endDate : endDate)  + "日"
    }
    if (startMonth == endMonth && startYear == endYear) {
      time = startYear + "年" + (startMonth < 10 ? "0" + startMonth : startMonth) + "月" + (startDate < 10 ? "0" + startDate : startDate) + "日-" + (endDate < 10 ? "0" + endDate : endDate) + "日"
    }
    userInfo.time = time
    this.setData({
      userInfo,
      exInfo
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
  navhover(){
    wx.clearStorageSync();
    this.onShow()
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
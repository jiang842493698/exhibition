// pages/home/sponsor/write/write.js
let title
let value
let app = getApp();
let $ = getApp().$;
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
  onTitle(e){
    title = e.detail.value
  },
  writeSMS(e){
    value = e.detail.value
  },
  onselect(e){
    let type = e.currentTarget.dataset.type
    let data = {
      Title: title,
      Content : value,
      State : "0",
      LinkInfo : "www.baidu.com",
     
    }
    if(type == 2){
      data.ExhibitorReceiver = "000000000000000000000002"
      data.Type = "4"
      
      // wx.navigateTo({
      //   url : ""
      // })
    }
    if (type == 1){
      data.VisitorReceiver = "000000000000000000000001"
      data.Type = "3"
    }
    $.request.MsgInfo().insert(data).then(res => {
      if (res.resCode == 0) {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
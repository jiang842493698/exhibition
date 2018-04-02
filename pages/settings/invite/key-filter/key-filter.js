// pages/settings/invite/key-filter/key-filter.js
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
    this.onSelect()
  },
  onChoose(e){
    let keyWords = e.currentTarget.dataset.value
    this.setData({
      keyWords
    })
  },
  onSelect() {
    $.request.AutoApprovalInvition().get().then(res => {
      if (res.resCode == 0) {
        let result = res.result[0]
        let KeyWord = result.KeyWord
        _this.setData({
          result,
          KeyWord
        })
      }
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
  onKeywords:function(e){
    let keyWords = e.detail.value;
    this.setData({
      keyWords
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  input(){
    let keyWords = this.data.keyWords
    if (keyWords == "" || keyWords == null){
      wx.showToast({
        title: '关键字不能为空',
        icon : 'loading'
      })
      return
    }
    let keyWordArray = this.data.KeyWord
    keyWordArray.push(keyWords)
    let result = this.data.result
    let data ={
      recordId: result.RecordId,
      setValue:{
        KeyWord: keyWordArray
      }
    }
    $.request.AutoApprovalInvition().put(data).then(res => {
      if (res.resCode == 0 && res.result.nRecordMatched == 1 && res.result.nRecordUpdated == 1){
        _this.onShow()
      }
    })

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
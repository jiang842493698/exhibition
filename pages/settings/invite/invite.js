// pages/settings/invite/invite.js
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
  onSelect(){
    $.request.AutoApprovalInvition().get().then(res=>{
      if(res.resCode == 0){
        let result = res.result[0]
        _this.setData({
          result,
          type: result.isOpen
        })
      }
    })
  },
  switch(e){
    let value = e.detail.value
    let id = this.data.result.RecordId
    let data = {
    }
    if(value==true){
      data = {
        recordId: id,
        setValue:{
          isOpen : "1"
        }
      }
    }
    if (value == false) {
      data = {
        recordId: id,
        setValue: {
          isOpen: "0"
        }
      }
    }
    $.request.AutoApprovalInvition().put(data).then(res => {
      if (res.resCode == 0 && res.result.nRecordMatched == 1 && res.result.nRecordUpdated == 1){
        if (value == false){
            wx.showToast({
              title: '自动审核以关闭',
              icon: 'loading',
              duration : 1000
            })
        }
        if (value == true) {
            wx.showToast({
              title: '自动审核以开启',
              icon: 'loading',
              duration: 1000
            })
          
        }
       
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
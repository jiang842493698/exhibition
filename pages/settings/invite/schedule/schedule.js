// pages/settings/invite/schedule/schedule.js
let $ = getApp().$
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
    this.onSelect()
  },
  onSelect:function(){
    $.request.calendar().post().then(res=>{
      if(res.resCode == 0){
        let result = res.result[0]
        let startDate = result.EStartDate.replace(/-/g, "/")
        let endDate = result.EEndDate.replace(/-/g, "/")
        endDate = endDate.substr(endDate.indexOf("/")+1)
        let startTime = result.EStartTime
        let endTime = result.EEndTime
        let intervalTime = result.IntervalTime
        let LunchStartTime = result.LunchStartTime
        let LunchEndTime = result.LunchEndTime
        console.log(result)
        this.setData({
          result,
          startDate,
          endDate,
          startTime,
          endTime,
          intervalTime,
          LunchStartTime,
          LunchEndTime
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  date(e){
    let date = e.currentTarget.dataset.date
    if (date == "startDate"){
      console.log(e)
      let startDate = e.detail.value.replace(/-/g,"/")
      this.setData({
          startDate
      })
    } 
    if (date == "endDate"){

      let endDates = e.detail.value.replace(/-/g, "/")
      let endDate = endDates.substr(endDates.indexOf("/"))
      this.setData({
          endDate
      })
    }

  },
  time(e){
    let date = e.currentTarget.dataset.date
    if (date == "startTime"){
      let startTime = e.detail.value
      this.setData({
        startTime
      })
    }
    if (date == "endTime") {
      let endTime = e.detail.value
      this.setData({
        endTime
      })
    }
  },
  onIntervalTime(e){
    console.log(e)
    let intervalTimeArray = ["30","40","50","60"]
    let intervalTime = e.detail.value
    console.log(intervalTime)
    this.setData({
      intervalTime :intervalTimeArray[intervalTime]
    })
  },
  onLunchTime(e){
    
    let date = e.currentTarget.dataset.date
    console.log(e)
    if (date == "LunchStartTime") {
      let LunchStartTime = e.detail.value
      console.log(LunchStartTime)
      this.setData({
        LunchStartTime
      })
    }
    if (date == "LunchEndTime") {
      let LunchEndTime = e.detail.value
      console.log(LunchEndTime)
      this.setData({
        LunchEndTime
      })
    }
  },
  onSave(){
    let startDate = this.data.startDate.replace(/\//g,"-")
    let endDate = this.data.endDate.replace(/\//g, "-")
    let startTime = this.data.startTime
    let endTime = this.data.endTime
    let intervalTime = this.data.intervalTime
    let LunchStartTime = this.data.LunchStartTime
    let LunchEndTime = this.data.LunchEndTime
    let result = this.data.result
    
    let data = {
      recordId : result.RecordId,
      setValue:{
        EStartDate: startDate,
        EEndDate: "2018-" + endDate,
        EStartTime: startTime,
        EEndTime: endTime,
        IntervalTime: intervalTime,
        LunchStartTime,
        LunchEndTime
      }
    }
    $.request.calendar().put(data).then(res => {

    })


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
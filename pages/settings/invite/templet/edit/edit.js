// pages/settings/invite/templet/edit/edit.js
let $ = getApp().$
let _this
let content
// let feet = ["ETE","VTE","ETV"]
let feet
Page({

  /**
   * 页面的初始数据
   */
  data: {
    MsgInfo:{
      ETE : "展商发展商",
      ETV :"展商发观众",
      VTE:"观众发展商"
    },
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    feet = options.feet
    if (feet =="ExhibitorSend"){
     this.setData({
       type: "ETE"
     })
    }
    if (feet == "ExhibitorReceive") {
      this.setData({
        type: "VTE"
      })
    }
    if (feet == "Vcode") {
      this.setData({
        type: "验证码模板"
      })
    }
    this.setData({
      feet
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
    this.onSelect()
  },
  onSelect(){

    let data = {
      
    }
    if (feet =="ExhibitorSend"){
      
      data={
        Name: this.data.type
      }
      
      this.onfilter(data);
    }
    if (feet =="ExhibitorReceive"){
      data = {
        Name: this.data.type
      }
      this.onfilter(data);
    }
    if (feet == "Vcode"){
      data = {
        Name: this.data.type
      }
      this.onfilter(data);
    }
    
  },
  onSms(e){
    content = e.detail.value
  },
  onUpdateSmS(){
    let result = this.data.result
    let data = {
      params:{
        recordId: result.RecordId,
        setValue:{
          Content: content
        }
      }
    }
    $.request.SmsTemplate().put(data).then(res=>{
      if(res.resCode == 0){
        this.onShow()
      }
    })
  },
  onSelected(e){
    
    let type = e.currentTarget.dataset.type
    this.setData({
      type
    })
    let data = {
      Name: type
    }
    this.onfilter(data)
    
  },
  onfilter(data){
    $.request.SmsTemplate().get(data).then(res => {
      if (res.resCode == 0) {
        let result = res.result[0]
        _this.setData({
          result
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
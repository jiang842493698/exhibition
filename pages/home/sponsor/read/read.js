// pages/my/invite/invite.js
let id
let $ = getApp().$
let value
let pageIndex = 1
let _this
let type
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_index: "已阅读",
    
    'filter_open': '',
    State:null,
    datas : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("bbbbbbbbbbb")
    id = options.id
    type = options.type
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
    pageIndex=1
    this.onselect()
  },
  onselect(){
    let data = {
      params:{
        recordId: id,
        GroupName: "Group",
        condition: {},
        options : {
          pageIndex: pageIndex,
          pageSize: 12
        }
      }
      
    }
    $.request.MsgInfo().getByName(data).then(res=>{
      if(res.resCode == 0){
        let result = res.result[0]
        let datas = this.data.datas
        for (let r of result.Group){
          console.log(r.UserName)
          if (!datas.includes(r.UserName)){
            console.log("1111111111")
            datas.push(r)
          }
        }123
        console.log(datas)
        _this.setData({
          datas
        })
         
      } 
    })

  },
  onFilterInput(e){
    console.log(e.detail.value)
    value = e.detail.value
    this.setData({
      filter : value
    })
  },
  onTapSearch(){
    
    let data = {
      "params": {
        "Single": { "Group.$": 1 },
        "recordId": id,
        "condition": { "Group.UserName": value }
      }
    }
    let datas = 
    $.request.MsgInfo().getByName(data).then(res => {
      if (res.resCode == 0){
        let result = res.result[0]
        
        _this.setData({
          datas:result.Group
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
    pageIndex++
    this.onselect()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onTabSwitch: function (e) {
    this.setData({
      
    })
  },
})
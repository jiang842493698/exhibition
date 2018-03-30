// pages/examine/index.js
let app = getApp()
let $ = getApp().$
let help = $.wxHelper
let tool = $.tool
let pageIndex = 1
let pageSize = 5
let _this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:-1,
    isShow : true,
    selected :[],
    isSelect : true,
    isTypeCancel : {
      "0": ["不通过","通过"],
      "1": ["审核未通过","通过"],
      "2": ["不通过", "审核已通过"],
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    _this.setData({
      isShow: false
    })
    pageIndex = 1

    _this.setData({
      InvitationInfoExhi: [],
      isShow: false,
      isSelect: true,
      matchVInfo: []
    })
    _this.onInvite()
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
  onInvite: function () {
    
    let inviteArray = []
    let page = {
      pageIndex: pageIndex,
      pageSize: pageSize
    }
    let data = {}
    if(this.data.type==-1){
      data = {
        State: {
          $in: ["0", "1", "2"]
        }
      }
    }else{
      data = {
        State: this.data.type
      }
    }

    $.request.InvitationInfoExhi().getAll(data,page).then(res => {
      console.log("gggggggggggggggggggggg")
      if (res.resCode == 0 || res.resCode == 10000) {
        console.log("/////////////////////////")
        let result = res.result
        let InvitationInfoExhi = (_this.data.InvitationInfoExhi == null ? [] : _this.data.InvitationInfoExhi).concat(result)
       console.log("ooooooooooooooooooooooo")
        for (let i of InvitationInfoExhi) {
          let centent
          if (i.InvitationMsgContent != null && i.InvitationMsgContent!=""){
            centent = i.InvitationMsgContent.replace("${展位号}", i.MeetingPlace)
          }
          
          i.centent = centent
          if (i.CreatedAt != null) {
            let createdAt = i.CreatedAt.replace(/-/g,"/")
            let date = new Date(createdAt)
            let time = help.SmarDate(date)
            i.time = time
          }
        }
        for (let i of InvitationInfoExhi){
          if (i.State==0){
            i.isSelect = _this.data.isSelect
          }
          
        }
        console.log("9999999999999999999999")
        _this.setData({
          InvitationInfoExhi
        })
        
      }
    })
    $.request.matchVInfo().getAll(data,page).then(res => {
      if (res.resCode == 0 || res.resCode == 10000) {
        let result = res.result
        let matchVInfo = (_this.data.matchVInfo == null ? [] : _this.data.matchVInfo).concat(result)
        for (let i of matchVInfo) {
          let centent
          if (i.InvitationMsgContent != null && i.InvitationMsgContent != "") {
            centent = i.InvitationMsgContent.replace("${展位号}", i.MeetingPlace)
          }
          i.centent = centent
          if (i.CreatedAt != null) {
            let createdAt = i.CreatedAt.replace(/-/g,"/")
            let date = new Date(createdAt)
            let time = help.SmarDate(date)
            i.time = time
          }

        }
        for (let i of matchVInfo) {
          if (i.State == 0) {
            i.isSelect = _this.data.isSelect
          }
        }
        _this.setData({
          matchVInfo
        })
        console.log("展商发观众")
        console.log(matchVInfo)
      }
    })

  },
  onStatusAudit(e){
    pageIndex = 1
    let type = e.currentTarget.dataset.type
    this.setData({
      type
    })
    _this.setData({
      matchVInfo:[],
      InvitationInfoExhi:[]
    })
    this.onInvite()
  },
  onAgree(e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    let feet = e.currentTarget.dataset.feet
    let newDate = new Date();
    let date = help.SmarDate(date)
    let data = {
      recordId: id,
      setValue: {
        State: "2",
        ApprovalTime: date
      }
    }
    if (feet == "展商") {
      $.request.InvitationInfoExhi().put(data).then(res => {
        if (res.resCode == 0 /*&& res.result.nRecordMatched == "1" && res.result.nRecordUpdated == "1"*/) {
          console.log("aaaaaaaaaa")
          _this.onLoad()
        }
      })
    }
    if (feet == "观众") {
      $.request.matchVInfo().put(data).then(res => {
        if (res.resCode == 0 /*&& res.result.nRecordMatched == "1" && res.result.nRecordUpdated == "1"*/) {
          console.log("aaaaaaaaaa")
          _this.onLoad()
        }
      })
    }

  },
  onNotBatchCancel(){
    let InvitationInfoExhi = this.data.InvitationInfoExhi
    let matchVInfo = this.data.matchVInfo

    let invitationInfoExhiArray = []
    let matchVInfoArray = []
    let newDate = new Date();
    let date = tool.formatTime(newDate);

    for (let i of InvitationInfoExhi) {
      if (i.isSelect == false) {
        invitationInfoExhiArray.push({
          recordId: i.RecordId,
          setValue: {
            State: "1",
            ApprovalTime: date
          }
        })
      }
    }
    for (let i of matchVInfo) {
      if (i.isSelect == false) {
        matchVInfoArray.push({
          recordId: i.RecordId,
          setValue: {
            State: "1",
            ApprovalTime: date
          }
        })
      }
    }

    $.request.InvitationInfoExhi().putAll(invitationInfoExhiArray).then(res => {
      if (res.resCode == 0) {
        _this.onShow()
      }
    })
    $.request.matchVInfo().putAll(matchVInfoArray).then(res => {
      if (res.resCode == 0) {
        _this.onShow()
      }
    })

  },
  onBatchCancel(){
    let InvitationInfoExhi = this.data.InvitationInfoExhi
    let matchVInfo = this.data.matchVInfo
    
    let invitationInfoExhiArray = []
    let matchVInfoArray = []
    let newDate = new Date();
    let date = tool.formatTime(newDate);

    for (let i of InvitationInfoExhi){
      if(i.isSelect == false){
        invitationInfoExhiArray.push({
          recordId: i.RecordId,
          setValue :{
            State : "2",
            ApprovalTime : date
          }
        })
      }
    }
    for (let i of matchVInfo) {
      if (i.isSelect == false) {
        matchVInfoArray.push({
          recordId: i.RecordId,
          setValue: {
            State: "2",
            ApprovalTime: date
          }
        })
      }
    }
    
    $.request.InvitationInfoExhi().putAll(invitationInfoExhiArray).then(res => {
      if (res.resCode == 0 ) {
        _this.onShow()
      }
    })
    $.request.matchVInfo().putAll(matchVInfoArray).then(res => {
      if (res.resCode == 0) {
        _this.onShow()
      }
    })

  },
  onTick(e){
    let id = e.currentTarget.dataset.id
    
    let feet = e.currentTarget.dataset.feet
    let isShow = this.data.isShow
    if (isShow!=false){
     if (feet == "展商") {
       let InvitationInfoExhi = this.data.InvitationInfoExhi
       for (let i of InvitationInfoExhi) {
         if (i.RecordId == id) {
           if (i.State == 0) {
            i.isSelect = !i.isSelect
           }
         }
       }
       _this.setData({
         InvitationInfoExhi
       })
     }
     if (feet == "观众") {
       let matchVInfo = this.data.matchVInfo
       for (let i of matchVInfo) {
         if (i.RecordId == id) {
           if (i.State == 0) {
             i.isSelect = !i.isSelect
           }
         }
       }
       _this.setData({
         matchVInfo
       })
     }
   }


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
    wx.showNavigationBarLoading()
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      _this.onLoad();
    }, 1500)
  },
  onCancel(e) {
    console.log("bbbbbbbb")
    let id = e.currentTarget.dataset.id
    let feet = e.currentTarget.dataset.feet
    let reject_invite = {
      isShow: true,//是否显示
      value: '',
      list: ['敏感词', '身份不匹配'],
      feet,
      id
    }
    this.setData({ reject_invite });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    pageIndex++
    this.onInvite()
  },
  onBatch:function(){
    let InvitationInfoExhi = this.data.InvitationInfoExhi
    let matchVInfo = this.data.matchVInfo
    for (let m of matchVInfo){
      if(m.State==0){
        m.isSelect = !_this.data.isSelect
      }
      
    }
    for (let m of InvitationInfoExhi) {
      if (m.State == 0) {
        m.isSelect = !_this.data.isSelect
      }
    }
    console.log(matchVInfo)
    console.log(InvitationInfoExhi)
    _this.setData({
      isShow : !this.data.isShow,
      isSelect: !_this.data.isSelect,
      matchVInfo,
      InvitationInfoExhi
    })

  },
  reject_inviteCancel() {
    let reject_invite = this.data.reject_invite;
    reject_invite.isShow = false;
    this.setData({ reject_invite });
    this.onShow()
  },
  reject_inviteConfirm(e) {
    // e.detail = {
    //   value: "身份不匹配",//选择常用（或输入的值）
    //   index: 1,//选择常用实返回
    // }
    let reject_invite = this.data.reject_invite;
    reject_invite.isShow = false;
    this.setData({ reject_invite });
    this.onShow()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
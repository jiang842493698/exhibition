let app = getApp();
let $ = getApp().$;
let MsgInfo = getApp().$.request.MsgInfo()
let MsgInfoCount = getApp().$.request.MsgInfoCount()
let matchVInfo = getApp().$.request.matchVInfo()
let inviteCount = getApp().$.request.inviteCount()
let tool = getApp().$.tool
let help = $.wxHelper
let _this
let pageIndex = 1;
let pageSize = 5;

let show = false
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
    _this= this
    
    _this.setData({
      matchVInfo: [],
      InvitationInfoExhi: []
    })
    _this.ondatas();
    _this.onInvite(pageIndex = 1);
    // _this.ondateTime();
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
  ondateTime(){
    setInterval(_this.ondata, 10000)
  },
  ondatas(){
    if (_this.data.message==null){
      _this.ondata()
    }
  },
  
  onSelect: function () {
    let dataZhuban = {
      $or: [{ "Type": "4" },{"Type": "3" }],
      
    }
    let zhanshangData = {
      Type: "1"
    }
    // let yueqingData = {
    //   type: "5"
    // }
    let huodongData = {
      Type: "6"
    }
    
    let page = {
      pageIndex: 1,
      pageSize: 1
    }

    let organizer = MsgInfo.get(dataZhuban, page)
    let Exhibitors = MsgInfo.get(zhanshangData, page)
    // let yueqing = MsgInfo.get(yueqingData, page)
    let huodong = MsgInfo.get(huodongData, page)

    let aaa = Promise.all([organizer, Exhibitors/*, yueqing*/, huodong])
    return aaa

  },
  ondata: function () {
    _this.onSelect().then(a => {
      let resultArray = a
      let result = []
      console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
      for (let r of resultArray) {
        let dataJsons = {}
        console.log(r)
        let results = r.result
        if (results.length > 0) {
          dataJsons = results[0]
          result.push(dataJsons)
        }

      }

      let countMsgArray = []
      console.log(result)
      for (let re of result) {
        let data = {
          type: re.Type,
          State: "0"
        }

        const [ymd, hms] = re.CreatedAt.split(" ")
        const [year, month, day] = ymd.split('-').map(Number)
        const [hour, minth, second] = hms.split(':').map(Number)
        

        let date = new Date(year, month - 1, day, hour, month, second)

        /**
         * 时间处理有问题
         */
        let times = help.SmarDate(date)
        
        re.time = times
        if (re.Type == 4 || re.Type == 3) {
          re.image = "/assets/images/icon/msg/notice.png"
        }
        if (re.Type == 0 || re.Type == 1 || re.Type == 2) {
          re.image = "/assets/images/icon/msg/settings.png"
        }
        if (re.Type == 5) {
          re.image = "/assets/images/icon/msg/invite.png"
        }
        if (re.Type == 6) {
          re.image = "/assets/images/icon/msg/activity.png"
        }
        MsgInfoCount.get(data).then(e => {
          if (e.resCode == 0) {
            let count = e.result
            let show
            if (count == 0) {
              show = true
            }
            let countJson = {
              count,
              type: re.Type,
              show
            }
            let countArray = []
            countArray.push(countJson)

            let countData = _this.data.count == null ? [] : _this.data.count
            // let countDataArray = countData.concat(countArray)
            // _this.setData({
            //   count: countDataArray
            // })
          }
        })
      }
      _this.setData({
        message: result
      })
    });
  },
  
  onInvite: function (pages) {
    let inviteArray = []
    if (pages != "" && pages != null){
      pageIndex = 1
    }
    let page = {
      pageIndex: pageIndex,
      pageSize: pageSize
    }
    console.log(page)

    $.request.InvitationInfoExhi().get(page).then(res => {
      if (res.resCode == 0 || res.resCode == 10000) {
        let result = res.result
        let InvitationInfoExhi = (_this.data.InvitationInfoExhi == null ? [] : _this.data.InvitationInfoExhi).concat(result)
        console.log("pppppppppppppppppp")
        console.log(InvitationInfoExhi)
        for (let i of InvitationInfoExhi){
          let centent = i.InvitationMsgContent.replace("${展位号}", i.MeetingPlace)
          i.centent = centent
          if (i.CreatedAt!=null){
            let createAt = i.CreatedAt.replace(/-/g,"/")
            let date = new Date(createAt)
            let time = $.wxHelper.SmarDate(date)
            i.time = time
          }

        }
        _this.setData({
          InvitationInfoExhi
        })
      }
    })
    $.request.matchVInfo().get(page).then(res => {
      if (res.resCode == 0 || res.resCode == 10000) {
        let result = res.result
        let matchVInfo = (_this.data.matchVInfo == null ? [] : _this.data.matchVInfo).concat(result)
        for (let i of matchVInfo) {
          let centent = i.InvitationMsgContent.replace("${展位号}", i.MeetingPlace)
          i.centent = centent
          if (i.CreatedAt != null) {
            let createdAt = i.CreatedAt.replace(/-/g, "/")
            let date = new Date(createdAt)
            
            let time = $.wxHelper.SmarDate(date)
            i.time = time
          }

        }
        _this.setData({
          matchVInfo
        })
        console.log(matchVInfo)
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
    wx.showNavigationBarLoading()
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      _this.onLoad();
    }, 1500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    pageIndex++
    this.onInvite()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 通过约请
   */
  onAgree(e) {
    let id = e.currentTarget.dataset.item.RecordId
    let feet = e.currentTarget.dataset.feet
    let date = new Date()
    let newDate = tool.formatTime(date);
    let data ={
      recordId: id,
      setValue:{
        State : "2",
        ApprovalTime: newDate
      }
    }
    if (feet == "展商"){
      $.request.InvitationInfoExhi().put(data).then(res => {
        if (res.resCode == 0 /*&& res.result.nRecordMatched == "1" && res.result.nRecordUpdated == "1"*/) {
          console.log("aaaaaaaaaa")
          _this.onLoad();
        }
      })
    }
    if (feet == "观众"){
      $.request.matchVInfo().put(data).then(res => {
        if (res.resCode == 0 /*&& res.result.nRecordMatched == "1" && res.result.nRecordUpdated == "1"*/){
          console.log("aaaaaaaaaa")
          _this.onLoad();
        }
      })
    }
    
  },
  /**
   * 取消约请
   * 
   * @param {any} e 
   */
  onCancel(e) {
    console.log("bbbbbbbbbbbb")
    console.log(e.currentTarget.dataset.feet)
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.item.RecordId
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

  reject_inviteCancel() {
    let reject_invite = this.data.reject_invite;
    reject_invite.isShow = false;
    this.setData({ reject_invite });
  },
  reject_inviteConfirm(e) {
    // e.detail = {
    //   value: "身份不匹配",//选择常用（或输入的值）
    //   index: 1,//选择常用实返回
    // }
    let reject_invite = this.data.reject_invite;
    reject_invite.isShow = false;
    this.setData({ reject_invite });
  },
})
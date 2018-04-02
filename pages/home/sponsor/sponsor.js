// pages/my/msg/sponsor/sponsor.js
let app = getApp()
let request = getApp().$.request
let $ = getApp().$
let MsgInfo = $.request.MsgInfo()
let pageIndex = 1
let pageSize = 10;
let id
let _this
let tool = $.tool
let inviteArray = []
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
    
    id = options.id
    this.setData({
      type : id
    })
    if (id == 2){
      wx.setNavigationBarTitle({
        title: '系统消息',
      })
    } 
    if (id == 4) {
      wx.setNavigationBarTitle({
        title: '主办消息',
      })
    }
    if (id == 5){
      wx.setNavigationBarTitle({
        title: '约请消息',
      })
    }
    if (id == 6) {
      wx.setNavigationBarTitle({
        title: '活动消息',
      })
    }
    _this = this
  },

  onTouchStart(e) {
    this.startX = e.touches[0].clientX;
  },
  onTouchEnd(e) {
    console.dir(e);
    let endX = e.changedTouches[0].clientX;
    let index = e.currentTarget.dataset.index;
    
    if (this.startX - endX > 80) {
      this.setData({
        delete_index: index,
      })
    } else if (endX - this.startX > 80) {
      
      this.setData({
        delete_index: -1,
      })
    }
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.message.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引

      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

    that.data.message.forEach(function (v, i) {

      v.isTouchMove = false

      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      message: that.data.message
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
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
    pageIndex = 1
    _this.setData({
      message: []
    })
    this.onSelect()
  },


  onSelect: function () {
    let data = {
      
    }
    if(id==3||id==4){
      data ={
        $or: [{ Type: "3" }, { Type: "4" }]
      }
    }else{
      data.Type=id
    }
   
    let page = {
      pageIndex: pageIndex,
      pageSize: pageSize
    }

    MsgInfo.get(data, page).then(res => {

      if (res.resCode == "0" || res.resCode == "10000") {

        let result = res.result
        for (let r of result) {
          let createdAt = r.CreatedAt.replace(/-/g,"/")
          let date = new Date(createdAt)
          let time = $.wxHelper.SmarDate(date)
          r.time = time
        }

        let dataInvite = _this.data.message == null ? [] : _this.data.message
        inviteArray = dataInvite.concat(result)


        _this.setData({
          message: inviteArray
        })
        let updatearrayal = []
        
        for (let r of result) {
          if (r.State == 1) {
            updatearrayal.push({ recordId: r.RecordId, setValue: { State: "0" } })

          }
        }
        let updateData = { updatearrayal }
        MsgInfo.put(updateData).then(ress => {
          if (ress.resCode == "0") {
          }
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
    this.onSelect();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  onDelete(e){
    getApp().$.service.showModal({
      content:'确定删除吗？',
      confirmText:'删除'
    })
  }
})
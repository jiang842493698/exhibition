// import Auth from './../../utils/authorize'
var $ = getApp().$;
var app = getApp();
// let verCode = $.request.verCode();
var _this;
let mob = '';//18651685925
let code;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: '',
    wxUserInfo: null,
    isjy: false,
    isload: false,
    btn_getCode: '获取验证码',
    isExpire: false, //判断项目是否已过期
    isCancelAuth: false//是否取消授权
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.clearStorageSync();
    _this = this;
    if (app.globalData.wxUserInfo) {
      _this.setData({
        wxUserInfo: app.globalData.wxUserInfo
      })
    } else {
      //获取微信用户授权
      wx.getUserInfo({
        success: res => {
          app.globalData.wxUserInfo = res.userInfo
          _this.setData({
            wxUserInfo: res.userInfo,
            isCancelAuth: false
          })
        },
        //如果用户取消授权，则提示授权失败
        fail: function (fail) {
          _this.setData({
            isCancelAuth: true
          })
        }
      })

    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  //手机号输入
  onMobInput: function (e) {
    mob = e.detail.value;
  },
  //验证码输入
  onCodeInput: function (e) {
    code = e.detail.value;
  },
  /**
   * 验证手机号码
   * 
   * @param {any} mob 
   * @returns 
   */
  varMob: (mob) => {
    // var reg = /^1[34578][0-9]{9}$/;
    return reg.test(mob);
  },
  //获取验证码

  onLogin: function () {
    
    let _this = this
    
    let userInfo, exInfo;

    let cellFun = () => {

      if (userInfo || exInfo) {

        // $.request.exLogin().put(userInfo.SignToken, exInfo.RecordId).then(res => {
        //     userInfo = res.Data;
        //     $.service.setStorage({
        //         key: 'userInfo',
        //         data: userInfo
        //     })
        // });
        $.service.switchTab('/pages/home/index')
      }
    }
    $.request.exLogin().post(mob,code).then(res => {
      
      if (res.resCode == 0) {
        
        userInfo = res.result[0];
        wx.setStorage({
          key: 'userInfo',
          data: userInfo
        })
        $.service.setStorage({ key: 'PHONE_NUMBER', data: mob });
        let data = {
          tenantId: userInfo.TenantId,
          params: { condition:{}}
        }
       
        $.request.exInfo().post(data).then(res => {
          res.resCode = 0
          if (res.resCode === 0) {
            exInfo = res.result[0];
            $.service.setStorage({
              key: 'exInfo',
              data: exInfo
            });
            $.service.setStorage({ key: 'PHONE_NUMBER', data: mob });
            cellFun();
          }
        })
      } else {
        wx.showModal({
          content: "用户名不存在",
          icon: "loading"
        });
      }
    })
    let a = wx.getStorage({
      key: 'userInfo'
    })

    

  },
  onShareAppMessage: function (e) {
    return {
      
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功'
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
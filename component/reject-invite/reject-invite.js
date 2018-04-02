// component/reject-invite/reject-invite.js
let app = getApp();
let $ = getApp().$
let matchVInfo = getApp().$.request.matchVInfo()
let InvitationInfoExhi = getApp().$.request.InvitationInfoExhi()
let value
let help = $.wxHelper
let tool = $.tool
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // value: String,//文本框的默认值
    list: Array,//常用敏感词
    feet:String,

    id: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {

    _onInput(e) {
     
      value = e.detail.value;
      this.setData({
        value
      })

    },
    /**
     * 取消按钮
     * 
     */
    _onCancel() {
      this.triggerEvent('cancel');
    },

    /**
     * 完成按钮
     * 
     */
    _onConfirm() {
      this.triggerEvent('confirm', { value: this.data.value });
      let date = new Date()
      
      let newDate = tool.formatTime(date);
      if (this.data.feet=="展商"){
        let data = {
          recordId: this.id,
          setValue: {
            State: "1",
            Remark: value ,
            ApprovalTime: newDate
          }
        }
        InvitationInfoExhi.put(data).then(res => {
          if (res.resCode == 0) {

          }
        })

      } else if (this.data.feet == "观众"){
        let data = {
          recordId: this.id,
          setValue:{
            State: "1",
            Remark: value,
            ApprovalTime: newDate
          }
        }
        matchVInfo.put(data).then(res=>{
          if(res.resCode == 0){
            
          }
        })
      }
      


    },
    _onSelected(e) {
      let index = e.currentTarget.dataset.index;
      let values = e.currentTarget.dataset.value;
   
      value = values
      this.setData({
        value
      })
    }
  }
})

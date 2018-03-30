// component/invite.js
Component({
  /**
   * 组件的属性列表
   * data:{
        type: 0,//0展商 1买家
        companyName: '',//公司名称(type=0)
        links: [{ name: '', job: '' }],//联系人
        addrs: [''],
        times: {
          date: [''],
          morning: [''],
          afternoon: ['']
        },
        content: ''
      }
   */
  properties: {
    data: Object,
    //标题
    title: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show_datetime_picker: false
  },
  ready(e) {
    let data = this.data.data;
    let _init_0 = () => {
      data.links = data.links || [];
      //如果联系人没有设选中 则默认选中第一个
      let selected_link = data.links.filter(f => f.checked);
      if (selected_link.length === 0 && data.links.length > 0) {
        data.links[0].checked = true;
      }
      //如果预约地点没有设选中 则默认选中第一个
      data.addrs = data.addrs || [];
      let selected_addr = data.addrs.filter(f => f.checked);
      let addr = '';
      if (selected_addr.length === 0 && data.addrs.length > 0) {
        data.addrs[0].checked = true;
        addr = data.addrs[0].value;
      } else if (selected_addr.length > 0) {
        addr = selected_addr[0].value;
      }
      //替换通知内容的预约地点
      this.content = this.data.data.content || '';
      let _content = this.content.replace('【ADDR】', addr);
      this.setData({ data, content: _content });
    }


    let _dateTime_init = () => {
      let index = 0;
      data.dateTime.forEach((v, i) => {
        if (v.date.checked) {
          index = i;
          return;
        }
      });
      data.dateTime[index].date.checked = true;
      this.selected_dateTime = data.dateTime[index];
      this.setData({ selected_dateTime: this.selected_dateTime });
    }
    if (this.data.data.type === 0) {
      _init_0();
    }
    _dateTime_init();
  },
  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 取消按钮
     * 
     */
    _onCancel() {
      this.triggerEvent('cancel');
    },

    /**
     * 确定按钮
     * 
     */
    _onConfirm() {

      let data = this.data.data;
      let info = {};
      info.type = data.type;

      let type_0 = () => {
        let link = {};
        data.links.forEach((v, i) => {
          if (v.checked) {
            link.index = i;
            link.value = v;
          }
        })
        info.link = link;

        let addr = {};
        data.addrs.forEach((v, i) => {
          if (v.checked) {
            addr.index = i;
            addr.value = v;
          }
        })
        info.addr = addr;
        info.content = data._content;
      }
      if (info.type === 0) {
        type_0();
      } else {
        info.link = data.link;
        info.addr = data.addr;
        info.content = data.content;
      }
      let dateTime = {};
      dateTime.date = this.selected_dateTime.date.value;
      this.selected_time = this.selected_time || {};
      dateTime.time = this.selected_time.value || '';
      info.dateTime = dateTime;


      this.triggerEvent('confirm', { ...info });
    },

    /**
     * 改变联系人的选中值
     * 
     * @param {any} e 
     */
    _onLink(e) {
      let data = this.data.data;
      let index = e.currentTarget.dataset.index;
      data.links.forEach((v, i) => {
        v.checked = i === index;
      });
      this.setData({ data });
    },
    _onAddr(e) {
      let data = this.data.data;
      let value = e.detail.value;
      data.addrs.forEach(v => {
        v.checked = v.value === value;
      })
      //替换通知内容的预约地点
      this.content = this.data.data.content || '';
      let _content = this.content.replace('【ADDR】', value);
      console.log(_content);
      this.setData({ data, content: _content });
    },
    _onDateSelected(e) {
      let index = e.currentTarget.dataset.index;
      let data = this.data.data;
      data.dateTime.forEach((v, i) => {
        v.date.checked = i === index;
      })
      this.selected_dateTime = data.dateTime[index];

      console.dir(this.selected_dateTime)
      this.selected_dateTime.date.show = true;
      this.setData({ selected_dateTime: this.selected_dateTime, data });
    },
    _onTimeSelected(e) {
      let index = e.currentTarget.dataset.index;
      let type = e.currentTarget.dataset.type;
      let selected_time = this.selected_dateTime.times[type][index];
      this.selected_time = selected_time;
      this.setData({ selected_time, show_datetime_picker: false })
    },
    _onOpenDateTimePicker() {
      this.setData({ show_datetime_picker: true });
    },
    _onCloseDateTimePicker() {
      this.setData({ show_datetime_picker: false });
    }
  }
})

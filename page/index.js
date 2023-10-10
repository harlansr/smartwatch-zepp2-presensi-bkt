import hmUI, { createWidget, widget, prop, anim_status, deleteWidget } from '@zos/ui'
import { log as Logger, px, settings } from '@zos/utils'
import { gettext } from 'i18n'

const logger = Logger.getLogger("fetch_api")
const { messageBuilder, accessToken } = getApp()._options.globalData
let dataPresensiList = {};

const groupList = createWidget(widget.GROUP, {
  x:0,
  y:0,
  w:0,
  h:0,
})

const cardDay = (text, time_1, time_4, cor_y) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let matchDay = new Date(text);
  var dd_f = String(matchDay.getDate()).padStart(2, '0');
  var mm_f = String(matchDay.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy_f = matchDay.getFullYear();
  let text_date = `${dd_f}-${mm_f}-${yyyy_f}`

  groupList.createWidget(widget.TEXT, {
    text: text_date,
    x: 70,
    y: cor_y,
    w: 400,
    h: 100,
    color: 0xffffff,
    text_size: px(28),
    // align_h: hmUI.align.CENTER_H,
    text_style: hmUI.text_style.WRAP
  })

  // Garis Lurus
  groupList.createWidget(widget.FILL_RECT, {
    x: 38,
    y: cor_y + 15,
    w: 5,
    h: 240,
    radius: 2,
    color: 0x592c29
  })

  // Titik
  groupList.createWidget(widget.FILL_RECT, {
    x: 30,
    y: cor_y + 15,
    w: 20,
    h: 20,
    radius: 10,
    color: 0xd13b30
  })

  let cor_card = cor_y + 50

  cardBox(`MASUK   - ${time_1}`, cor_card, text == today)
  cardBox(`PULANG - ${time_4}`, cor_card + 90, text == today)
}

const cardBox = (text, y = 150, today) => {

  let color = 0x2b2b2b
  if (today) {
    color = 0x282e38
  }
  groupList.createWidget(widget.FILL_RECT, {
    x: 60,
    y: y,
    w: 370,
    h: 80,
    radius: 20,
    color: color
  })

  if (today && text == "PULANG - ") {
    groupList.createWidget(widget.TEXT, {
      text: "< BELUM PULANG >",
      x: 48,
      y: y + 17,
      w: 400,
      h: 100,
      color: 0x4d535e,
      text_size: px(26),
      align_h: hmUI.align.CENTER_H,
      text_style: hmUI.text_style.WRAP
    })
  } else {
    groupList.createWidget(widget.TEXT, {
      text: text,
      x: 85,
      y: y + 17,
      w: 400,
      h: 100,
      color: 0xffffff,
      text_size: px(26),
      // align_h: hmUI.align.CENTER_H,
      text_style: hmUI.text_style.WRAP
    })
  }

}

const imgLoading = createWidget(widget.IMG, {
    x: 180,
    y: 180,
    w: px(120),
    h: px(120),
    center_x: 120,
    center_y: 120,
    auto_scale: true,
    src: 'presensi-bkt-c.png'
})

const anim_step3 = {
  anim_rate: 'bounce',
  anim_duration: 1000,
  anim_from: px(0),
  anim_to: px(180),
  anim_prop: prop.Y
}
const anim_step4 = {
  anim_rate: 'linear',
  anim_duration: 600,
  anim_from: 0,
  anim_to: 250,
  anim_prop: prop.ALPHA
}
const animLoading = imgLoading.setProperty(prop.ANIM, {
  anim_steps: [anim_step3, anim_step4],
  anim_fps: 60,
  anim_repeat: 10,
})

const fillData = ()=>{
  const anim_data = {
    anim_rate: 'linear',
    anim_duration: 600,
    anim_from: px(400),
    anim_to: px(0),
    anim_prop: prop.Y
  }
  const anim_data_2 = {
    anim_rate: 'linear',
    anim_duration: 600,
    anim_from: 0,
    anim_to: 250,
    anim_prop: prop.ALPHA
  }
  const animGroupList = groupList.setProperty(prop.ANIM, {
    anim_steps: [anim_data, anim_data_2],
    anim_fps: 30,
    anim_repeat: 1,
  })

  const { body, status } = dataPresensiList
  if (body) {
    let index = 0
    body.forEach(val => {
      if(index<7){
        cardDay(val.tanggal, val.time_1, val.time_4, (240 * index) + 130)
        index++
      }
    });
  } else {
    if (data.result == 'TOKEN_FAILED') {
      createWidget(widget.TEXT, TEXT_ERROR_TOKEN)
    } else {
      createWidget(widget.TEXT, TEXT_ERROR)
    }
  }
}

Page({
  state: {},
  build() {
    createWidget(widget.TEXT, TEXT_TITLE)
    createWidget(widget.TEXT, TEXT_TITLE_2)
    console.log("Run Build")
    this.fetchData()

    // imgLoading
    // imgLoading.setProperty(prop.ANIM_STATUS, {
    //   anim_id: animId,
    //   anim_status: anim_status.RESUME
    // })
  },


  fetchData() {
    messageBuilder.request({
      method: "GET_PRESENSI_LIST",
    })
      .then(data => {
        const { result = {} } = data
        dataPresensiList = result
        deleteWidget(imgLoading)
        fillData()
        console.log(" --- API Response Success ---")
      }).catch(res => {
        deleteWidget(imgLoading)
        console.log(" --- API Response ERROR ---")
      })
  },

})

const TEXT_TITLE = {
  text: "PRESENSI",
  x: px(40),
  y: px(30),
  w: px(400),
  h: px(100),
  color: 0xffffff,
  text_size: px(30),
  align_h: hmUI.align.CENTER_H,
  text_style: hmUI.text_style.WRAP
}

const TEXT_TITLE_2 = {
  text: "BUKITTINGGI",
  x: px(40),
  y: px(65),
  w: px(400),
  h: px(100),
  color: 0xffffff,
  text_size: px(30),
  align_h: hmUI.align.CENTER_H,
  text_style: hmUI.text_style.WRAP
}

const TEXT_ERROR = {
  text: "PERIKSA\nJARINAGN ANDA",
  x: px(80),
  y: px(180),
  w: px(300),
  h: px(100),
  color: 0x999999,
  text_size: px(35),
  align_h: hmUI.align.CENTER_H,
  text_style: hmUI.text_style.WRAP
}
const TEXT_ERROR_TOKEN = {
  // text: "TOKEN AKSES\nBERMASALAH",
  text: "BELUM LOGIN\nBUKA SETTING HP",
  x: px(80),
  y: px(180),
  w: px(300),
  h: px(100),
  color: 0x999999,
  text_size: px(35),
  align_h: hmUI.align.CENTER_H,
  text_style: hmUI.text_style.WRAP
}

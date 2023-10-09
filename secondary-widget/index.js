import hmUI, { createWidget, widget, prop, anim_status, deleteWidget } from '@zos/ui'
import { getText } from '@zos/i18n'

// const imgLoading = createWidget(widget.IMG, {
//     x: 180,
//     y: 180,
//     w: px(120),
//     h: px(120),
//     center_x: 120,
//     center_y: 120,
//     auto_scale: true,
//     src: 'presensi-bkt-c.png'
// })

SecondaryWidget({
    state: {
        text: 'Hello Zepp OS',
    },
    onInit() {
        console.log('onInit')
    },
    build() {
        console.log('build')
        console.log(this.state.text)
        createWidget(widget.TEXT, TEXT_TITLE)
        createWidget(widget.TEXT, TEXT_TITLE_2)

        createWidget(widget.BUTTON, {
            x: 90,
            y: 200,
            w: 300,
            h: 80,
            // center_x: 120,
            // center_y: 120,
            radius: 12,
            normal_color: 0x3944bc,
            press_color: 0x1338be,
            text: getText('openApp'),
            text_size: px(30),
            click_func: (button_widget) => {
                // button_widget.setProperty(prop.MORE, {
                //     x: (480 - 400) / 2,
                //     y: 300,
                //     w: 400,
                //     h: 100
                // })
            }
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
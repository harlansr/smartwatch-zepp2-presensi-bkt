import { gettext } from 'i18n'
import hmUI, { createWidget, widget, prop } from '@zos/ui'

AppSettingsPage({
  build() {
    console.log(gettext('example'))
    console.log("Setting")

    createWidget(widget.TEXT, TEXT_TITLE)
  }
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
import hmUI, { createWidget, widget, prop, anim_status, deleteWidget } from '@zos/ui'
    ({
    state: {
      text: 'Hello Zepp OS',
    },
    onInit() {
      console.log('onInit')
    },
    build() {
        const text = createWidget(widget.TEXT, {
            x: 0,
            y: 0,
            w: 288,
            h: 30,
            color: 'white',
            text_size: 36,
            align_h: align.CENTER_H,
            align_v: align.CENTER_V,
            text_style: text_style.NONE,
            text: 'Presensi BKT'
        })
    },
})
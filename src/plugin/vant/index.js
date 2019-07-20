import { Area, Popup, Toast, Dialog } from 'vant'
export default {
  install (Vue, options) {
    if (options.off) return
    Vue.use(Area)
    Vue.use(Popup)
    Vue.use(Toast)
    Vue.use(Dialog)
  }
}

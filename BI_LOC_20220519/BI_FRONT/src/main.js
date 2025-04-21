// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import _ from 'lodash'
import moment from 'moment'

import App from './App'
import store from './store'
import router from './router'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vue-date-pick/dist/vueDatePick.css'

// font_en
import '@/assets/css/fonts.css'
import '@/assets/css/common.css'
import '@/assets/css/custom.scss'

import '@/assets/libs/amcharts/amcharts.js'
import '@/assets/libs/amcharts/radar.js'
import '@/assets/libs/amcharts/serial.js'
import '@/assets/libs/amcharts/pie.js'

Vue.config.productionTip = false

moment.locale("ko")
moment.defaultFormat = "YYYY.MM.DD (ddd)"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
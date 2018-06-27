// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// 自定義主題顏色
// Vue.use(Vuetify, { theme: {
//   primary: '#ee44aa',
//   secondary: '#424242',
//   accent: '#82B1FF',
//   error: '#FF5252',
//   info: '#2196F3',
//   success: '#4CAF50',
//   warning: '#FFC107'
// }})

Vue.use(Vuetify)

Vue.config.productionTip = false

const globalObject = {
  userId: ''
}
const global = {
  methods: {
    saveUserId (userId) {
      const vm = this
      vm.globalObject.userId = userId
      localStorage.setItem('userId', userId)
    },
    clearUserId () {
      localStorage.removeItem('userId')
      this.globalObject.userId = ''
    },
    initUserId () {
      globalObject.userId = localStorage.getItem('userId')
    }
  },
  data: () => ({
    globalObject: globalObject
  })
}
Vue.mixin(global)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  beforeCreate () {
    global.methods.initUserId()
  },
  template: '<App/>'
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueHighlightJS from 'vue-highlightjs'
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
Vue.use(VueHighlightJS)
Vue.use(Vuetify)

Vue.config.productionTip = false

const globalObject = {
  userData: {
    userId: '',
    userName: ''
  },
  categories: [],
  showDrawer: null
}
const global = {
  methods: {
    saveUserData (userData) {
      const vm = this
      vm.globalObject.userData = userData
      localStorage.setItem('userId', userData.userId)
      localStorage.setItem('userName', userData.userName)
    },
    clearUserData () {
      localStorage.removeItem('userId')
      localStorage.removeItem('userName')
      this.globalObject.userData = {}
    },
    initUserData () {
      globalObject.userData.userId = localStorage.getItem('userId')
      globalObject.userData.userName = localStorage.getItem('userName')
    },
    getCategoryName (category) {
      const vm = this
      let name
      let stop = false
      vm.globalObject.categories.forEach(categoryObject => {
        if (categoryObject.url === category && !stop) {
          name = categoryObject.text
          stop = true
        }
      })
      return name
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
    global.methods.initUserData()
  },
  template: '<App/>'
})

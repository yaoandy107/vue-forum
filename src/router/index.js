import Vue from 'vue'
import Router from 'vue-router'
import Forum from '@/components/Forum'
import MainPage from '@/components/MainPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Forum,
      children: [
        {
          path: '/',
          component: MainPage
        }
      ]
    }
  ]
})

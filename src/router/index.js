import Vue from 'vue'
import Router from 'vue-router'
import Forum from '@/components/Forum'
import MainPage from '@/components/MainPage'
import CategoryList from '@/components/CategoryList'
import PostList from '@/components/PostList'
import TestDrawer1 from '@/components/TestDrawer1'
import TestDrawer2 from '@/components/TestDrawer2'
import ChatPage from '@/components/ChatPage'
import ChatDrawer from '@/components/ChatDrawer'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Forum,
      children: [
        {
          path: '/',
          name: 'home',
          components: {
            default: MainPage,
            drawer: CategoryList
          },
          children: [
            {
              path: '/category/:category',
              name: 'category',
              component: PostList,
              props: true
            }
          ]
        },
        {
          path: '/test1',
          components: {
            drawer: TestDrawer1
          }
        },
        {
          path: '/test2',
          components: {
            drawer: TestDrawer2
          }
        },
        {
          path: '/messaging',
          components: {
            default: ChatPage,
            drawer: ChatDrawer
          }
        }
      ]
    }
  ]
})

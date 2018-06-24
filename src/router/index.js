import Vue from 'vue'
import Router from 'vue-router'
import Forum from '@/components/Forum'
import MainPage from '@/components/MainPage'
import CategoryList from '@/components/CategoryList'
import PostList from '@/components/PostList'
import Post from '@/components/Post'

import Chat from '@/components/Chat'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/category',
      component: Forum,
      children: [
        {
          path: 'category',
          redirect: '/category/all',
          name: 'home',
          components: {
            default: MainPage,
            drawer: CategoryList
          },
          children: [
            {
              path: ':category',
              name: 'category',
              component: PostList,
              props: true
            },
            {
              path: ':category/:postId',
              name: 'post',
              component: Post,
              props: true
            }
          ],
          props: true
        },
        {
          path: '/messaging',
          components: {
            drawer: Chat
          }
        }
      ]
    }
  ]
})
export default router

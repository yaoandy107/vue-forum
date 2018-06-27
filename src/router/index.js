import Vue from 'vue'
import Router from 'vue-router'
import Forum from '@/components/Forum'
import MainPage from '@/components/MainPage'
import CategoryList from '@/components/CategoryList'
import PostList from '@/components/PostList'
import ChatPage from '@/components/ChatPage'
import ChatDrawer from '@/components/ChatDrawer'
import Post from '@/components/Post'

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
          name: 'messaging',
          components: {
            default: ChatPage,
            drawer: ChatDrawer
          },
          children: [
            {
              path: ':friendId',
              name: 'chat',
              component: Chat,
              props: true
            }
          ],
          props: true
        }
      ]
    }
  ]
})
export default router

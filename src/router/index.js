import Vue from 'vue'
import Router from 'vue-router'
import ForumPage from '@/components/ForumPage'
import PostList from '@/components/PostList'
import ChatPage from '@/components/ChatPage'
import ChatDrawer from '@/components/ChatDrawer'
import Post from '@/components/Post'
import Chat from '@/components/Chat'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/forum'
    },
    {
      path: '/forum',
      name: 'forum',
      component: ForumPage,
      children: [
        {
          path: ':category',
          name: 'category',
          component: PostList,
          props: true
        },
        {
<<<<<<< HEAD
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
=======
          path: ':category/:postId',
          name: 'post',
          component: Post,
>>>>>>> 97744d6360fbf2ad92baaf3502ea538418677cfa
          props: true
        }
      ],
      props: true
    }
  ]
})
export default router

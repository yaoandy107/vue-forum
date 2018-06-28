import Vue from 'vue'
import Router from 'vue-router'
import ForumPage from '@/components/ForumPage'
import PostList from '@/components/PostList'
import ChatPage from '@/components/ChatPage'
import PostEditor from '@/components/PostEditor'
import Post from '@/components/Post'
import Chat from '@/components/Chat'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/forum/all'
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
          path: ':category/new',
          name: 'newpost',
          component: PostEditor,
          props: true
        },
        {
          path: ':category/p/:postId',
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
      component: ChatPage,
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
})
export default router

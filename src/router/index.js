import Vue from 'vue'
import Router from 'vue-router'
import ForumPage from '@/components/ForumPage'
import PostList from '@/components/PostList'
import Post from '@/components/Post'

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
          path: ':category/:postId',
          name: 'post',
          component: Post,
          props: true
        }
      ],
      props: true
    }
  ]
})
export default router

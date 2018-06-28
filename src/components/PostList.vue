<template>
  <v-container fluid style="height: 100%; position: relative;">
    <!-- 進度圈 -->
    <v-flex xs12 style="position: absolute; top: 50%; left: 50%;">
      <v-progress-circular v-show="showProgress" indeterminate color="green"></v-progress-circular>
    </v-flex >
    <v-layout row wrap>
      <!-- 列表標題 -->
      <v-flex xs12 d-flex align-baseline>
        <v-card dark color="blue darken-1">
          <v-card-title primary-title>
            <span class="headline d-inline-box">{{ getCategoryName(category) || '全部文章' }}</span>
            <div>
              <v-menu offset-y open-on-hover>
                <v-btn slot="activator" flat>排序依據...</v-btn>
                <v-list>
                  <v-list-tile v-for="(item, index) in menuItems" :key="index" @click="() => updatePostList(item.orderBy)">
                    <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </div>
            <v-spacer></v-spacer>
            <v-btn
              v-if="category !== 'all'"
              dark
              fab
              color="blue darken-3"
              :to="{ name: 'newpost', params: { category: category } }"
            >
              <v-icon>create</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap fill-height style="position: relative">
      <!-- 列表主體 -->
      <v-flex xs12>
        <v-list three-line>
          <template v-for="(postInfo, index) in postList">
            <v-divider v-if="index !== 0" :key="index"></v-divider>
            <v-list-tile avatar :key="postInfo.postId" 
              :to="{ name: 'post', params: { postId: postInfo.postId } }"
              @click="() => increasePostExplore(postInfo.postId)"
            >
              <v-flex xs10>
                <!-- <v-list-tile-content> -->
                <v-layout d-flex row>
                  <v-flex offset-xs1 xs4><v-list-tile-title class="">{{ postInfo.title }}</v-list-tile-title></v-flex>
                  <v-flex offset-xs4 xs1><v-list-tile-sub-title class="text-lg-right">{{ postInfo.authorName }}</v-list-tile-sub-title></v-flex>
                </v-layout>
                <!-- </v-list-tile-content> -->
              </v-flex>
              <v-flex xs2>
                <v-layout d-flex column align-content-end>
                  <v-layout d-flex column align-start>
                    <v-flex><v-list-tile-sub-title><v-icon>thumb_up</v-icon> : {{ postInfo.like }}</v-list-tile-sub-title></v-flex>
                    <v-flex><v-list-tile-sub-title><v-icon>remove_red_eye</v-icon> : {{ postInfo.explore }}</v-list-tile-sub-title></v-flex>
                    <v-flex><v-list-tile-sub-title><v-icon>textsms</v-icon> : {{ postInfo.reply }}</v-list-tile-sub-title></v-flex>
                  </v-layout>
                </v-layout>
              </v-flex>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
  <!-- <v-container fluid fill-height>
    <v-layout row wrap style="position: relative;">
      <v-flex xs12>
        <v-tabs
          v-model="modelTab"
          fixed-tabs
        >
          <v-tab
            v-for="i in 2"
            :key="i"
            :href="'#tab-' + i"
          >
            {{ tabs['tab-' + i].text }}
          </v-tab>
          <v-tab-item
            v-for="i in 2"
            :key="i"
            :id="'tab-' + i"
          >
            <v-list v-if="modelTab === ('tab-' + i)" three-line>
              <template v-for="(post) in postList">
                <v-divider :key="post.id"></v-divider>
                <v-list-tile :key="post.title" ripple :to="{ name: 'post', params: { postId: post.postId } }">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ post.title }}</v-list-tile-title>
                    <v-list-tile-sub-title class="text-lg-right">{{ post.author }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title><v-icon>remove_red_eye</v-icon> : {{ post.explore }}   <v-icon>thumb_up</v-icon> : {{ post.like }}   <v-icon>textsms</v-icon> : {{ post.reply }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-tab-item>
        </v-tabs>
      </v-flex>
      進度圈
      <v-flex xs12 style="position: absolute; top: 50%; left: 50%;">
        <v-progress-circular v-show="showProgress" indeterminate color="green"></v-progress-circular>
      </v-flex >
      懸浮按鈕
      <v-flex xs12 style="position: absolute; bottom: 5%; right: 5%;">
        <v-btn
          dark
          fab
          color="blue darken-3"
          :to="{ name: 'newpost', params: { category: category } }"
        >
          <v-icon>create</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container> -->
</template>

<script>
import FirebaseHelper from '@/helpers/FirebaseHelper'
export default {
  beforeRouteEnter: function (to, from, next) {
    next((vm) => {
      vm.updatePostList()
    })
  },
  watch: {
    category: function () {
      const vm = this
      vm.updatePostList()
    }
  },
  methods: {
    updatePostList: function (orderBy = 'createdTime') {
      const vm = this
      const category = vm.category
      vm.showProgress = true
      vm.postList.length = 0
      FirebaseHelper.getPostList(vm.category, orderBy)
      .then((postList) => {
        if (category === vm.category) {
          vm.postList.push(...postList)
        }
        vm.showProgress = false
      })
    },
    increasePostExplore: function (postId) {
      FirebaseHelper.increasePostExplore(postId)
    }
  },
  data: () => ({
    tabs: {
      'tab-1': {
        text: '熱門文章',
        orderBy: 'like'
      },
      'tab-2': {
        text: '最新文章',
        orderBy: 'createdTime'
      }
    },
    modelTab: 'tab-1',
    postList: [],
    menuItems: [
      { text: '發佈時間', orderBy: 'createdTime' },
      { text: '閱覽次數', orderBy: 'explore' },
      { text: '按讚次數', orderBy: 'like' },
      { text: '回覆次數', orderBy: 'reply' }
    ],
    showProgress: false
  }),
  props: [
    'category'
  ]
}
</script>

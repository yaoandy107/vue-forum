<template>
  <v-container fluid fill-height>
    <v-layout row wrap fill-height style="position: relative;">
      <v-flex xs12 fill-height>
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
      <!-- 進度圈 -->
      <v-flex xs12 style="position: absolute; top: 50%; left: 50%;">
        <v-progress-circular v-show="showProgress" indeterminate color="green"></v-progress-circular>
      </v-flex >
      <!-- 懸浮按鈕 -->
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
  </v-container>
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
    },
    modelTab: function () {
      const vm = this
      vm.updatePostList()
    }
  },
  methods: {
    updatePostList: function () {
      const vm = this
      vm.showProgress = true
      vm.postList.length = 0
      console.log(vm.category + '/' + vm.tabs[vm.modelTab].orderBy)
      FirebaseHelper.getPostList(vm.category, vm.tabs[vm.modelTab].orderBy)
      .then((postList) => {
        vm.postList.push(...postList)
        vm.showProgress = false
      })
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
    showProgress: false
  }),
  props: [
    'category'
  ]
}
</script>

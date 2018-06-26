<template>
  <v-container fluid fill-height>
    <v-layout row wrap fill-height>
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
            <v-list three-line>
              <template v-for="(post, index) in postList">
                <v-divider v-if="index !== 0" :inset="true" :key="index"></v-divider>
                <v-list-tile :key="post.title" ripple @click="() => test(post.postId)">
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
        <!-- 進度圈 -->
        <v-progress-circular v-show="showProgress" indeterminate color="green"></v-progress-circular>
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
      FirebaseHelper.getPostList(vm.category, vm.tabs[vm.modelTab])
      .then((postList) => {
        vm.postList.length = 0
        vm.postList.push(...postList)
        vm.showProgress = false
      })
    },
    test: function (postId) {
      FirebaseHelper.addPostExplore(postId)
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
        orderBy: 'created_time'
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

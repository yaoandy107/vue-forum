<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
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
          <!-- 進度圈 -->
          <v-progress-circular v-show="showProgress" indeterminate color="green"></v-progress-circular>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FirebaseHelper from '@/helpers/FirebaseHelper'
export default {
  watch: {
    category: function () {
      console.log('waa')
      const vm = this
      vm.showProgress = true
      FirebaseHelper.getPostList(vm.category)
      .then((postList) => {
        vm.postList.length = 0
        vm.postList.push(...postList)
        vm.showProgress = false
      })
    }
  },
  methods: {
    test: function (postId) {
      FirebaseHelper.addPostExplore(postId)
    }
  },
  data: () => ({
    postList: [],
    showProgress: false
  }),
  props: [
    'category'
  ]
}
</script>

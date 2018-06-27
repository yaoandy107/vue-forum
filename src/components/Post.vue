<template>
  <v-container fluid>
    <v-layout row wrap>
      <!-- 文章資訊列 -->
      <v-flex xs12>
        
      </v-flex>
      <!-- 文章內容 -->
      <v-flex xs12>
        <span>123</span>
      </v-flex>
      <!-- 文章留言 -->
      <v-flex xs12>
        <!-- <template v-for="vm.postData.num_of_reply">

        </template> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FirebaseHelper from '@/helpers/FirebaseHelper'
export default {
  beforeRouteEnter: function (to, from, next) {
    next((vm) => {
      vm.loadPostData()
    })
  },
  methods: {
    loadPostData: function () {
      const vm = this
      FirebaseHelper.getPostData(vm.postId)
      .then((postData) => {
        vm.postData = postData
      })
    }
  },
  data: () => ({
    postData: undefined
  }),
  props: {
    postId: String
  }
}
</script>

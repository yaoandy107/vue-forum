<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="headline blue white--text">文章 : {{ postData.title }}</v-card-title>
      <v-card-text>
        <v-layout row wrap fill-height>
          <!-- 文章內容 -->
          <v-flex xs12 wrap>
            <template v-for="(contentPart) in postData.content">
              <p :key="contentPart.text">{{ contentPart.text }}</p>
            </template>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
    <v-card class="my-1">
        <v-layout>
          <!-- 文章留言 -->
          <v-flex xs12>
            留言
            <!-- <template v-for="vm.postData.num_of_reply">

            </template> -->
          </v-flex>
        </v-layout>
      </v-card>
  </v-container>
</template>

<script>
import FirebaseHelper from '@/helpers/FirebaseHelper'
import marked from 'marked'
export default {
  beforeRouteEnter: function (to, from, next) {
    next((vm) => {
      vm.loadPostData()
    })
  },
  computed: {
    compiledMarkdown: function (contentIndex) {
      const vm = this
      return marked(vm.postData.content[contentIndex].text, { sanitize: true })
    }
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
    postData: {}
  }),
  props: {
    postId: String
  }
}
</script>

<template>
  <v-container fluid>
    <v-layout row wrap>
      <!-- 文章資訊列 -->
      <v-flex xs12>
        
      </v-flex>
      <!-- 文章內容 -->
      <v-flex xs12>
        <template v-for="(contentPart) in postData.content">
          <pre :key="contentPart.text">{{ contentPart.text }}</pre>
        </template>
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

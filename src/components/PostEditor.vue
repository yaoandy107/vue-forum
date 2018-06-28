<template>
  <v-container fluid style="height: 100%; position: relative">
    <!-- 進度圈 -->
    <v-progress-circular style="position: absolute; top: 50%; left: 50%;" v-show="showProgress" indeterminate color="green"></v-progress-circular>
    <!-- 懸浮按鈕 -->
    <v-speed-dial
      absolute
      style="bottom: 5%; right: 5%;"
      v-model="fab"
      direction="top"
    >
      <v-btn
        slot="activator"
        v-model="fab"
        color="teal darken-1"
        dark
        fab
      >
        <v-icon>add</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="blue darken-3"
        @click="onInsertPictureClick"
      >
        <v-icon>insert_photo</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="blue darken-2"
        @click="onInsertLinkClick"
      >
        <v-icon>link</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="blue darken-1"
        @click="onInsertCodeClick"
      >
        <v-icon>code</v-icon>
      </v-btn>
    </v-speed-dial>
      <v-dialog v-model="showMdPreview" max-width="960">
        <v-card>
          <v-card-title>
            <span class="headline">Markdown 預覽</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-flex
              v-if="postData.isMarkdown"
              xs12
              class="d-inline-block pa-2"
              v-html="compiledMarkdown"
            ></v-flex>
          </v-card-text>
        </v-card>
      </v-dialog>
    <v-layout d-flex align-center column wrap class="pa-3">
      <!-- 模式選擇 -->
      <v-flex>
        <v-btn-toggle v-model="isMarkdown" mandatory>
          <v-btn flat color="blue darken-2">
            <span>一般</span>
          </v-btn>
          <v-btn flat color="blue darken-2">
            <span>Markdown</span>
          </v-btn>
        </v-btn-toggle>
        <v-btn v-if="postData.isMarkdown" @click="showMdPreview = true">預覽</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="pa-3">
      <!-- 標題輸入欄 -->
      <v-flex xs12>
        <v-text-field
          placeholder="標題"
          v-model="postData.title"
          autofocus
        ></v-text-field>
      </v-flex>
      <!-- 內文輸入欄 -->
      <!-- 一般輸入 -->
      <v-flex xs12 v-if="!postData.isMarkdown">
        <v-text-field
          placeholder="內容"
          full-width
          multi-line
          rows="13"
          v-model="currentContentPart.text"
          @click="currentContentPart.type = 'plain'"
        ></v-text-field>
      </v-flex>
      <!-- markdown輸入 -->
      <v-flex xs12 v-if="postData.isMarkdown">
        <v-text-field
          style="background-color: #f2f2f2;"
          placeholder="Markdown"
          full-width
          multi-line
          rows="13"
          v-model="currentContentPart.text"
          @click="currentContentPart.type = 'plain'"
        ></v-text-field>
      </v-flex>
      <!-- <v-flex
        v-if=" postData.isMarkdown"
        xs12
        class="d-inline-block pa-2"
        v-html="compiledMarkdown"
      ></v-flex> -->
    </v-layout>
    <v-layout d-flex align-center column wrap class="pa-3">
      <!-- 送出按鈕 -->
      <v-flex>
        <v-btn dark color="blue">送出</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FirebaseHelpers from '@/helpers/FirebaseHelper'
import marked from 'marked'
export default {
  computed: {
    isMarkdown: {
      get: function () {
        const vm = this
        return vm.postData.isMarkdown ? 1 : 0
      },
      set: function (newValue) {
        const vm = this
        vm.postData.isMarkdown = newValue === 1
      }
    },
    compiledMarkdown: function () {
      const vm = this
      return marked(vm.currentContentPart.text.replace(/( )*\n+/g, '    \n'), { sanitize: true })
    }
  },
  methods: {
    onInsertPictureClick: function () {

    },
    onInsertLinkClick: function () {

    },
    onInsertCodeClick: function () {

    },
    sendNewPost: function () {
      const vm = this
      vm.showProgress = true
      vm.postData.authorId = vm.globalObject.userData.userId
      vm.postData.authorName = vm.globalObject.userData.userName
      vm.postData.category = vm.category
      vm.postData.content.push(vm.currentContentPart)
      vm.currentContentPart = {
        type: 'plain',
        text: ''
      }
      FirebaseHelpers.addPost(vm.postData)
      .then(() => {
        vm.showProgress = false
        vm.$router.go(-1)
      })
    }
  },
  data: () => ({
    postData: {
      title: '',
      authorId: '',
      authorName: '',
      category: '',
      isMarkdown: false,
      content: []
    },
    currentContentPart: {
      type: 'plain',
      text: ''
    },
    fab: undefined,
    showMdPreview: false,
    showProgress: false
  }),
  props: {
    category: String
  }
}
</script>

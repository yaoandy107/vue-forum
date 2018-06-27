<template>
  <v-container wrap fluid>
    <v-layout row wrap class="pa-3 ">
      <!-- 模式選擇 -->
      <v-flex xs12>
        <v-btn-toggle v-model="isMarkdown" mandatory>
          <v-btn flat>
            <span>一般</span>
          </v-btn>
          <v-btn flat>
            <span>Markdown</span>
          </v-btn>
        </v-btn-toggle>
      </v-flex>
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
          auto-grow
          v-model="currentContentPart.text"
          @click="currentContentPart.type = 'plain'"
        ></v-text-field>
      </v-flex>
      <!-- markdown輸入 -->
      <v-flex xs12 sm6 class="d-inline-block" v-if=" postData.isMarkdown">
        <v-text-field
          style="background-color: #f2f2f2;"
          placeholder="Markdown"
          full-width
          multi-line
          auto-grow
          v-model="currentContentPart.text"
          @click="currentContentPart.type = 'plain'"
        ></v-text-field>
      </v-flex>
      <v-flex
        v-if=" postData.isMarkdown"
        xs12
        sm6 
        class="d-inline-block pa-2"
        v-html="compiledMarkdown"
      ></v-flex>
      <!-- 懸浮按鈕 -->
      <v-flex xs12 style="height: 0; position: relative;">
        <v-speed-dial
          absolute
          style="right: 50px; bottom: 50px"
          fixed
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
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
      return marked(vm.currentContentPart.text, { sanitize: true })
    }
  },
  methods: {
    onInsertPictureClick: function () {

    },
    onInsertLinkClick: function () {

    },
    onInsertCodeClick: function () {

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
    fab: undefined
  })
}
</script>

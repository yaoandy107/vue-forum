<template>
  <v-list>
    <template v-for="item in items">
      <v-list-tile :key="item.text" @click="" avatar>
        <v-list-tile-avatar>
          <img src="https://vuetifyjs.com/static/doc-images/john.jpg" alt="avatar">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.userName }}
          </v-list-tile-title>
          <v-list-tile-sub-title>
            {{ item.message}}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    items: [
      { userName: '測試人員', message: '您好，請問你現在方便嗎？' },
      { userName: '喵嗚星人', message: '訊息' },
      { userName: '喵嗚星人', message: '訊息' },
      { userName: '喵嗚星人', message: '訊息' },
      { userName: '喵嗚星人', message: '訊息' },
      { userName: '喵嗚星人', message: '訊息' },
      { userName: '喵嗚星人', message: '訊息' },
      { userName: '喵嗚星人', message: '訊息' }
    ]
  })
}
</script>

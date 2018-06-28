<template>
  <v-list>
    <v-layout
      :key="heading"
      row
      align-center
    >
      <v-flex xs12>
        <v-subheader>
          {{ heading }}
        </v-subheader>
      </v-flex>
    </v-layout>
    <!-- 好友 -->
    <v-list-tile @click="toChatPage">
      <v-list-tile-action>
        <v-icon>contacts</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          好友
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <!-- 設定 -->
    <v-list-tile @click="">
      <v-list-tile-action>
        <v-icon>settings</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          設定
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <!-- 回饋 -->
    <v-list-tile @click="">
      <v-list-tile-action>
        <v-icon>chat_bubble</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          回饋
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <!-- 幫助 -->
    <v-list-tile @click="">
      <v-list-tile-action>
        <v-icon>help</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          幫助
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
const data = {
  heading: '功能',
  items: [
    { icon: 'contacts', text: '好友' },
    { icon: 'settings', text: '設定' },
    { icon: 'chat_bubble', text: '回饋' },
    { icon: 'help', text: '幫助' }
  ]
}
export default {
  data: () => data,
  methods: {
    toChatPage () {
      this.$router.push('/messaging')
    }
  }
}
</script>

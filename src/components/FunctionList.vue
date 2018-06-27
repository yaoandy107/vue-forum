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
    <template v-for="item in items">
      <v-list-tile :key="item.text" @click="">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
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
  data: () => data
}
</script>

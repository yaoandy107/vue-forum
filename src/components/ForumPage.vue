<template>
  <v-content>
    <!-- 右側邊欄 -->
    <v-navigation-drawer
      clipped
      v-model="showDrawer"
      fixed
      right
      app>
      <v-list>
        <template v-for="item in rightItems">
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
    </v-navigation-drawer>
    <!-- 內容主體 -->
    <router-view>
    </router-view>
  </v-content>
</template>

<script>
export default {
  methods: {
  },
  data: () => ({
    showDrawer: null,
    rightItems: [
      { icon: 'contacts', text: '好友' },
      { icon: 'settings', text: '設定' },
      { icon: 'chat_bubble', text: '回饋' },
      { icon: 'help', text: '幫助' }
    ]
  }),
  components: {
  }
}
</script>

<style>
.list {
  padding: 0;
}
</style>

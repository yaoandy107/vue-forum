<template>
  <v-content>
    <v-navigation-drawer
      v-model="globalObject.showDrawer"
      clipped
      fixed
      hide-overlay
      mobile-break-point="600"
      app>
      <chat-list></chat-list>
    </v-navigation-drawer>
    <router-view></router-view>
  </v-content> 
</template> 

<script>
import ChatList from '@/components/ChatList'
export default {
  components: {
    ChatList
  }
}
</script>

<template>
  <v-list>
    <template v-for="friend in friendList">
      <v-list-tile :key="friend.text" @click="() => route(friend.userId)" avatar>
        <v-list-tile-avatar>
          <img src="https://vuetifyjs.com/static/doc-images/john.jpg" alt="avatar">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ friend.userName }}
          </v-list-tile-title>
          <v-list-tile-sub-title>
            {{ friend.lastMessage}}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
import FirebaseHelper from '@/helpers/FirebaseHelper'
export default {
  created: async function () {
    this.getFriendList()
  },
  watch: {
    'globalObject.userId': function () {
      const vm = this
      if (vm.globalObject.userId) {
        vm.getFriendList()
      } else {
        vm.friendList = {}
      }
    }
  },
  methods: {
    getFriendList () {
      FirebaseHelper.getFriendList(this.globalObject.userId)
        .then((friendList) => {
          this.friendList = friendList.friends
        })
        .catch(() => {
          console.log('取得好友列表錯誤')
        })
    },
    route: function (userId) {
      const vm = this
      vm.$router.push({name: 'chat', params: { friendId: userId }})
    }
  },
  data: () => ({
    friendList: []
  })
}
</script>
<style>
@media screen and (max-width: 600px) {
  .navigation-drawer--open {
    width: 100% !important;
  }
}

</style>

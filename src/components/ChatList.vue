<template>
  <v-list>
    <template v-for="friend in friendList">
      <v-list-tile :key="friend.text" @click="() => route(friend.userId)" avatar>
        <!-- 有頭貼 -->
        <v-list-tile-avatar v-show="friend.avatarUrl">
          <img :src="friend.avatarUrl" alt="avatar">
        </v-list-tile-avatar>
        <!-- 無頭貼 -->
        <v-list-tile-avatar color="teal" v-show="!friend.avatarUrl">
          <span class="white--text avatar-text">{{(friend.userName || '')[0]}}</span>
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
    <v-container d-flex>
      <v-btn color="success" v-on:click="onAddFriendClicked">
        新增好友
      </v-btn>
    </v-container>
    <add-friend-dialog :show="showAddFriendDialog" :toggle="showAddFriendDialog.bool"></add-friend-dialog>
  </v-list>
</template>

<script>
import FirebaseHelper from '@/helpers/FirebaseHelper'
import AddFriendDialog from '@/components/AddFriendDialog'
export default {
  created: async function () {
    this.getFriendList()
  },
  watch: {
    'globalObject.userData.userId': function () {
      const vm = this
      if (vm.globalObject.userData.userId) {
        vm.getFriendList()
      } else {
        vm.friendList = {}
      }
    }
  },
  methods: {
    getFriendList () {
      FirebaseHelper.getFriendList(this.globalObject.userData.userId)
        .then((friendList) => {
          const vm = this
          vm.friendList = friendList
          if (!friendList.avatarUrl) {
            vm.noAvatar = true
          } else {
            vm.noAvatar = false
          }
        })
        .catch((e) => {
          console.log('取得好友列表錯誤')
        })
    },
    route (userId) {
      const vm = this
      vm.$router.push({name: 'chat', params: { friendId: userId }})
    },
    onAddFriendClicked () {
      const vm = this
      vm.showAddFriendDialog.bool = true
    }
  },
  data: () => ({
    friendList: [],
    avatarUrl: '',
    avatarChar: '',
    noAvatar: false,
    showAddFriendDialog: { bool: false }
  }),
  components: {
    AddFriendDialog
  }
}
</script>
<style>
@media screen and (max-width: 600px) {
  .navigation-drawer--open {
    width: 100% !important;
  }
}
</style>

<template>
  <v-dialog v-model="show.bool" max-width="400">
    <v-card>
      <!-- 標題 -->
      <v-card-title class="headline blue darken-2">
        <v-container d-flex-column justify-center text-xs-center class="pa-0">
          <v-text-field
            v-model="inputEmail"
            @keyup.enter="searchUserByMail()"
            flat
            dark
            solo-inverted
            prepend-icon="search"
            label="搜尋 (E-mail)"
            class="hidden-sm-and-down">
          </v-text-field>
        </v-container>
      </v-card-title>
      <v-container d-flex-column justify-center text-xs-center>
        <v-avatar v-show="!noAvatar" size="200">
          <img v-show="avatarUrl" icon :src='avatarUrl'>
        </v-avatar>
        <v-avatar color="teal" v-show="noAvatar" size="200">
          <span class="white--text avatar-text">{{avatarChar}}</span>
        </v-avatar>
        <h1 class="friend-name">{{userName}}</h1>
        <v-container d-flex justify-center >
          <v-btn dark color="light-blue accent-3" v-on:click="addFriend">加為好友</v-btn>
        </v-container>
      </v-container>
    </v-card>
    <!-- 進度圈 -->
    <v-progress-circular v-show="showProgress" indeterminate color="green"></v-progress-circular>
  </v-dialog>
</template>

<script>
import FirebaseHelper from '@/helpers/FirebaseHelper'
export default {
  props: {
    show: Object,
    toggle: Boolean
  },
  watch: {
    toggle (bool) {
      const vm = this
      vm.reset()
    }
  },
  methods: {
    searchUserByMail () {
      const vm = this
      FirebaseHelper.searchUserByEmail(vm.inputEmail)
        .then((userInfo) => {
          console.log(userInfo)
          if (!userInfo) {
            return false
          }
          vm.userName = userInfo.userName
          vm.avatarUrl = userInfo.avatarUrl
          if (!vm.avatarUrl) {
            vm.noAvatar = true
            vm.avatarChar = vm.userName[0]
          } else {
            vm.noAvatar = false
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    addFriend () {
      const vm = this
      const userId = vm.globalObject.userData.userId
      FirebaseHelper.addFriend(userId, vm.inputEmail)
        .catch((exception) => {
          console.log(exception)
        })
    }
  },
  data: () => ({
    inputEmail: undefined,
    showProgress: false,
    userName: undefined,
    avatarUrl: '',
    avatarChar: undefined,
    noAvatar: undefined
  })
}
</script>

<style scoped>
.friend-name {
  font-weight: 500;
  letter-spacing: 4px;
  margin-top: 8px;
}
.avatar-text {
  font-size: 50px;
}
</style>

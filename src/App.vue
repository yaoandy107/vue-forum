<template>
  <v-app id="inspire">
    <!-- 導航欄 -->
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.smAndUp"
      :clipped-right="$vuetify.breakpoint.smAndUp"
      color="blue darken-3"
      dark
      app
      fixed>
      <!-- 標題區 -->
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <!-- 側邊欄 icon -->
        <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="globalObject.showDrawer = !globalObject.showDrawer"></v-toolbar-side-icon>
        <!-- 標題 -->
        <a href="/" class="title">{{ title }}</a>
      </v-toolbar-title>
      <!-- 搜尋欄 -->
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down">
        
      </v-text-field>
      <!-- 自動間隔 -->
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <!-- 註冊按鈕 -->
      <v-btn class="hidden-xs-only" outline v-if="!isLoggedIn" v-on:click="onRegisterClicked">
        <span>註冊</span>
      </v-btn>
      <!-- 登入/登出按鈕 -->
      <v-btn class="hidden-xs-only" outline v-on:click="onLoginLogoutClicked">
        <span>{{ isLoggedIn ? '登出' : '登入' }}</span>
      </v-btn>
    </v-toolbar>
    <!-- 內容主體 -->
    <router-view>
    </router-view>
    <!-- Dialog -->
    <!-- 註冊對話方塊 -->
    <register-dialog :show="showRegisterDialog" :toggle="showRegisterDialog.bool"></register-dialog>
    <!-- 登入對話方塊 -->
    <login-dialog :show="showLoginDialog" :toggle="showLoginDialog.bool" v-on:logged-in="onLoggedIn"></login-dialog>
    <!-- 登出確認對話方塊 -->
    <logout-dialog :show="showLogoutDialog" :toggle="showLoginDialog.bool" :userid="globalObject.userData.userId" v-on:logged-out="onLoggedOut"></logout-dialog>
  </v-app>
</template>

<script>
import RegisterDialog from '@/components/RegisterDialog'
import LoginDialog from '@/components/LoginDialog'
import LogoutDialog from '@/components/LogoutDialog'
export default {
  computed: {
    isLoggedIn: function () {
      const vm = this
      return (vm.globalObject.userData.userId || false) === vm.globalObject.userData.userId
    }
  },
  methods: {
    onLoggedIn: function (userData) {
      const vm = this
      vm.saveUserData(userData)
    },
    onLoggedOut: function () {
      const vm = this
      vm.clearUserData()
    },
    onLoginLogoutClicked: function () {
      const vm = this
      if (!vm.isLoggedIn) {
        vm.showLoginDialog.bool = true
      } else {
        vm.showLogoutDialog.bool = true
      }
    },
    onRegisterClicked: function () {
      const vm = this
      vm.showRegisterDialog.bool = true
    }
  },
  data: () => ({
    title: 'DevZone',
    showLoginDialog: { bool: false },
    showLogoutDialog: { bool: false },
    showRegisterDialog: { bool: false }
  }),
  components: {
    LoginDialog,
    LogoutDialog,
    RegisterDialog
  }
}
</script>

<style src="../static/css/style.css"></style>
<style src="../static/css/atom-one-dark.css"></style>
<style scoped>
.title {
  color: #fff;
  text-decoration: none;
}
</style>

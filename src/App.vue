<template>
  <v-app id="inspire">
    <!-- 側邊欄 -->
    <v-navigation-drawer
      clipped
      v-model="showDrawer"
      fixed
      app>
      <v-list dense>
        <template v-for="item in drawerItems">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs12>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click=""
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" @click="">
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
    <!-- 導航欄 -->
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed>
      <!-- 標題區 -->
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <!-- 側邊欄 icon -->
        <v-toolbar-side-icon @click.stop="showDrawer = !showDrawer"></v-toolbar-side-icon>
        <!-- 標題 -->
        <span class="hidden-sm-and-down">{{title}}</span>
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
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <!-- 註冊按鈕 -->
      <v-btn outline v-if="!isLoggedIn" v-on:click="onRegisterClicked">
        <span>註冊</span>
      </v-btn>
      <!-- 登入/登出按鈕 -->
      <v-btn outline v-on:click="onLoginLogoutClicked">
        <span>{{ isLoggedIn ? '登出' : '登入' }}</span>
      </v-btn>  
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="https://vuetifyjs.com/static/doc-images/logo.svg"
            alt="Vuetify"
          >
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <!-- 內容主體 -->
    <v-content>
      <router-view>
      </router-view>
    </v-content>
    <!-- Dialog -->
    <!-- 註冊對話方塊 -->
    <register-dialog :show="showRegisterDialog" :toggle="showRegisterDialog.bool"></register-dialog>
    <!-- 登入對話方塊 -->
    <login-dialog :show="showLoginDialog" v-on:logged-in="isLoggedIn = true"></login-dialog>
    <!-- 登出確認對話方塊 -->
    <logout-dialog :show="showLogoutDialog" v-on:logged-out="isLoggedIn = false"></logout-dialog>
  </v-app>
</template>

<script>
import LoginDialog from './components/LoginDialog'
import LogoutDialog from './components/LogoutDialog'
import RegisterDialog from './components/RegisterDialog'
// import FirebaseHelper from './helpers/FirebaseHelper'

export default {
  methods: {
    onLoginLogoutClicked: function () {
      const vm = this
      if (!vm.isLoggedIn) {
        vm.showLoginDialog.bool = true
      } else {
        vm.showLogoutDialog.bool = true
      }
    },
    onRegisterClicked: function () {
      // FirebaseHelper.register('ch870814@gmail.com', 'DevilTea', 'c0h8e1n4')
      const vm = this
      vm.showRegisterDialog.bool = true
    }
  },
  data: () => ({
    title: 'DevZone',
    isLoggedIn: false,
    showLoginDialog: { bool: false },
    showLogoutDialog: { bool: false },
    showRegisterDialog: { bool: false },
    showDrawer: null,
    drawerItems: [
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: '論壇版',
        model: true,
        children: [{ text: '學術' }, { text: '八卦' }, { text: '西施' }]
      },
      { icon: 'contacts', text: '好友' },
      { icon: 'history', text: '對話紀錄' },
      { icon: 'settings', text: '設定' },
      { icon: 'chat_bubble', text: '回饋' },
      { icon: 'help', text: '幫助' }
      // { icon: 'phonelink', text: 'App 下載' },
    ]
  }),
  components: {
    LoginDialog,
    LogoutDialog,
    RegisterDialog
  },
  props: {
    source: String
  }
}
</script>

<style>
.recaptcha {
  display: flex;
  justify-content: center;
}
.progress-circular {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.list {
  padding: 0;
}
</style>

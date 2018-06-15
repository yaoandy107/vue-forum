<template>
  <v-app id="inspire">
    <!-- 抽屜 -->
    <v-navigation-drawer
      clipped
      v-model="showDrawer"
      fixed
      app>
      <v-list dense>
        <template v-for="item in items">
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
        <v-toolbar-side-icon @click.stop="showDrawer = !showDrawer"></v-toolbar-side-icon>
        <!-- Title -->
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
      <!-- 登入按鈕 -->
      <v-btn outline v-on:click="tranferLoginState">
        <span>{{logStatus}}</span>
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
    <!-- 登入對話方塊 -->
    <v-dialog v-model="loginDialog" max-width="400">
      <v-card>
        <!-- 標題 -->
        <v-card-title class="text-center headline blue white--text">登入</v-card-title>
        <!-- 帳號 ＆ 密碼輸入框 -->
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="帳號" :error='!isAccountValid' v-model='account.username'></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="密碼" :error='!isAccountValid' type="password" v-model='account.password'></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <!-- Recaptcha -->
        <v-container align-content-center="true">
          <vue-recaptcha 
            class="recaptcha" 
            @verify="onCaptchaVerified"
            @expired="onCaptchaExpired" 
            sitekey="6LebGl8UAAAAAMdUD8LvxbQ6rBhYaNpYjdiTe79x">
          </vue-recaptcha>
        </v-container>
        <!-- 登入按鈕 -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!recaptcha" color="green darken-1" flat v-on:click="login">登入</v-btn>
        </v-card-actions>
      </v-card>
      <!-- 進度圈 -->
      <v-progress-circular v-show="showProgress" indeterminate color="green"></v-progress-circular>
    </v-dialog>
    <!-- 登出確認對話方塊 -->
    <v-dialog v-model="logoutDialog" max-width="290">
      <v-card>
        <v-card-title class="headline blue white--text">登出確認</v-card-title>
        <v-card-text>你確定要登出嗎？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="logoutDialog = false">返回</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="logoutDialog = false">確定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
import FirebaseHelper from './helpers/FirebaseHelper'

export default {
  methods: {
    login: async function () {
      const vm = this
      vm.showProgress = true
      let firebaseHelper = new FirebaseHelper()
      let userId = await firebaseHelper.login(vm.account.username, vm.account.password)
      vm.showProgress = false
      if (userId) {
        vm.logStatus = '登出'
        vm.loginDialog = false
      } else {
        vm.isAccountValid = false
      }
    },
    logout: function () {
      const vm = this
      vm.logStatus = '登入'
    },
    onCaptchaVerified: function (recaptchaToken) {
      const self = this
      self.recaptcha = true
    },
    onCaptchaExpired: function () {
      this.$refs.recaptcha.reset()
    },
    tranferLoginState: function () {
      const vm = this
      if (vm.logStatus === '登入') {
        vm.loginDialog = true
      } else {
        vm.logoutDialog = true
      }
    }
  },
  data: () => ({
    title: 'DevZone',
    logStatus: '登入',
    account: {
      username: null,
      password: null
    },
    showProgress: false,
    isAccountValid: true,
    loginDialog: false,
    logoutDialog: false,
    showDrawer: null,
    recaptcha: true,
    items: [
      { icon: 'contacts', text: '好友' },
      { icon: 'history', text: '對話紀錄' },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: '論壇版',
        model: false,
        children: [{ text: '學術' }, { text: '八卦' }, { text: '西施' }]
      },
      { icon: 'settings', text: '設定' },
      { icon: 'chat_bubble', text: '回饋' },
      { icon: 'help', text: '幫助' }
      // { icon: 'phonelink', text: 'App 下載' },
    ]
  }),
  components: {
    VueRecaptcha
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
</style>

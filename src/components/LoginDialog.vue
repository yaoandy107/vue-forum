<template>
  <v-dialog v-model="show.bool" max-width="400">
    <v-card>
      <!-- 標題 -->
      <v-card-title class="text-center headline blue white--text">登入</v-card-title>
      <!-- 帳號 ＆ 密碼輸入框 -->
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="帳號" :error='!isAccountValid' v-model='inputUsername'></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="密碼" :error='!isAccountValid' type="password" v-model='inputPassword'></v-text-field>
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
        <v-btn :disabled="!isPassedRecaptcha" color="green darken-1" flat v-on:click="login">登入</v-btn>
      </v-card-actions>
    </v-card>
    <!-- 進度圈 -->
    <v-progress-circular v-show="showProgress" indeterminate color="green"></v-progress-circular>
  </v-dialog>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
import FirebaseHelper from '../helpers/FirebaseHelper'

export default {
  props: {
    show: Object
  },
  components: {
    VueRecaptcha
  },
  data: () => {
    return {
      inputUsername: undefined,
      inputPassword: undefined,
      showProgress: false,
      isAccountValid: true,
      isPassedRecaptcha: false
    }
  },
  methods: {
    login: async function () {
      const vm = this
      vm.showProgress = true
      let firebaseHelper = new FirebaseHelper()
      let userId = await firebaseHelper.login(vm.inputUsername, vm.inputPassword)
      vm.showProgress = false
      if (userId) {
        vm.show.bool = false
        vm.inputUsername = undefined
        vm.inputPassword = undefined
        window.grecaptcha.reset()
        vm.$emit('logged-in')
      } else {
        vm.isAccountValid = false
      }
    },
    onCaptchaVerified: function (recaptchaToken) {
      const vm = this
      vm.isPassedRecaptcha = true
    },
    onCaptchaExpired: function () {
      window.grecaptcha.reset()
    }
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

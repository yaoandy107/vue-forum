<template>
  <v-dialog v-model="show.bool" v-on:click.self="reset" max-width="400">
    <v-card>
      <!-- 標題 -->
      <v-card-title class="text-center headline blue white--text">註冊</v-card-title>
      <!-- 註冊資料輸入框 -->
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field 
                label="信箱" 
                :autofocus="true" 
                :error="emailCheck.isError"
                :hint="emailCheck.hint"
                persistent-hint
                v-model='inputEmail'
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field 
                label="用戶名" 
                :error="usernameCheck.isError"
                :hint="usernameCheck.hint"
                persistent-hint
                v-model='inputUsername'
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field 
                :append-icon="hide ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (hide = !hide)"
                :type="hide ? 'password' : 'text'"
                label="密碼"
                :error="passwordCheck.isError"
                :hint="passwordCheck.hint"
                persistent-hint
                v-model='inputPassword'
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <!-- Recaptcha -->
      <!-- <v-container align-content-center="true">
        <vue-recaptcha 
          ref="recaptcha"
          class="recaptcha" 
          @verify="onCaptchaVerified"
          @expired="onCaptchaExpired" 
          sitekey="6LebGl8UAAAAAMdUD8LvxbQ6rBhYaNpYjdiTe79x">
        </vue-recaptcha>
      </v-container> -->
      <!-- 註冊按鈕 -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" flat v-on:click="reset">清空</v-btn>
        <v-btn :disabled="!hasPassedRecaptcha || (!emailCheck.hasChecked || emailCheck.isError) || (!usernameCheck.hasChecked || usernameCheck.isError) || (!passwordCheck.hasChecked || passwordCheck.isError)" color="green darken-1" flat v-on:click="register">註冊</v-btn>
      </v-card-actions>
    </v-card>
    <!-- 進度圈 -->
    <v-progress-circular v-show="showProgress" indeterminate color="green"></v-progress-circular>
  </v-dialog>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
import FirebaseHelper from '@/helpers/FirebaseHelper'

export default {
  props: {
    show: Object,
    toggle: Boolean
  },
  components: {
    VueRecaptcha
  },
  watch: {
    toggle (bool) {
      const vm = this
      vm.reset()
    },
    inputEmail (email) {
      const vm = this
      vm.checkEmail(email)
    },
    inputUsername (username) {
      const vm = this
      vm.checkUsername(username)
    },
    inputPassword (password) {
      const vm = this
      vm.checkPassword(password)
    }
  },
  data: () => {
    return {
      inputEmail: undefined,
      inputUsername: undefined,
      inputPassword: undefined,
      showProgress: false,
      hide: true,
      emailCheck: {
        hasChecked: false,
        isError: false,
        hint: ''
      },
      usernameCheck: {
        hasChecked: false,
        isError: false,
        hint: ''
      },
      passwordCheck: {
        hasChecked: false,
        isError: false,
        hint: ''
      },
      hasPassedRecaptcha: false
    }
  },
  methods: {
    reset: function () {
      const vm = this
      vm.inputEmail = undefined
      vm.inputUsername = undefined
      vm.inputPassword = undefined
      // vm.$refs.recaptcha.reset()
      // vm.hasPassedRecaptcha = false
      vm.emailCheck.hasChecked = false
      vm.emailCheck.isError = false
      vm.emailCheck.hint = ''
      vm.usernameCheck.hasChecked = false
      vm.usernameCheck.isError = false
      vm.usernameCheck.hint = ''
      vm.passwordCheck.hasChecked = false
      vm.passwordCheck.isError = false
      vm.passwordCheck.hint = ''
    },
    checkEmail: function (email) {
      let vm = this
      vm.emailCheck.hasChecked = true
      if (email) {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (pattern.test(email)) {
          let func = async (email) => {
            FirebaseHelper.isRegisteredEmail(email)
            .then((bool) => {
              if (bool) {
                vm.emailCheck.isError = true
                vm.emailCheck.hint = '已註冊過的信箱'
              } else {
                vm.emailCheck.isError = false
                vm.emailCheck.hint = ''
              }
            })
          }
          func(email)
        } else {
          vm.emailCheck.isError = true
          vm.emailCheck.hint = '不正確的信箱格式'
        }
      } else {
        vm.emailCheck.isError = true
        vm.emailCheck.hint = '必填欄位'
      }
    },
    checkUsername: function (username) {
      const vm = this
      vm.usernameCheck.hasChecked = true
      if (username) {
        if (username.length >= 8) {
          vm.usernameCheck.isError = false
          vm.usernameCheck.hint = ''
        } else {
          vm.usernameCheck.isError = true
          vm.usernameCheck.hint = '長度需大於等於 8'
        }
      } else {
        vm.usernameCheck.isError = true
        vm.usernameCheck.hint = '必填欄位'
      }
    },
    checkPassword: function (password) {
      const vm = this
      vm.passwordCheck.hasChecked = true
      if (password) {
        if (password.length >= 8) {
          vm.passwordCheck.isError = false
          vm.passwordCheck.hint = ''
        } else {
          vm.passwordCheck.isError = true
          vm.passwordCheck.hint = '長度需大於等於 8'
        }
      } else {
        vm.passwordCheck.isError = true
        vm.passwordCheck.hint = '必填欄位'
      }
    },
    register: async function () {
      const vm = this
      vm.showProgress = true
      FirebaseHelper.register(vm.inputEmail, vm.inputUsername, vm.inputPassword)
      .then((result) => {
        if (result) {
          vm.showProgress = false
          vm.$emit('registered')
          vm.show.bool = false
        }
      })
    },
    onCaptchaVerified: function (recaptchaToken) {
      const vm = this
      vm.hasPassedRecaptcha = true
    },
    onCaptchaExpired: function () {
      const vm = this
      vm.$refs.recaptcha.reset()
      vm.hasPassedRecaptcha = true// false
    }
  }
}
</script>

<style>
.recaptcha {
  display: flex;
  justify-content: center;
}
</style>

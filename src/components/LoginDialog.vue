<template>
  <v-dialog v-model="show.bool" max-width="400">
    <v-card>
      <!-- 標題 -->
      <v-card-title class="text-center headline blue white--text">登入</v-card-title>
      <!-- 帳號 ＆ 密碼輸入框 -->
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <!-- 帳號輸入 -->
            <v-flex xs12>
              <v-text-field 
                label="信箱" 
                :error="emailCheck.isError"
                :hint="emailCheck.hint"
                :autofocus="true" 
                v-model='inputEmail'
              ></v-text-field>
            </v-flex>
            <!-- 密碼輸入 -->
            <v-flex xs12>
              <v-text-field 
                label="密碼" 
                :append-icon="hide ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (hide = !hide)"
                :type="hide ? 'password' : 'text'" 
                :error="passwordCheck.isError"
                :hint="passwordCheck.hint"
                v-model='inputPassword'
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <!-- Recaptcha -->
      <v-container align-content-center="true">
        <vue-recaptcha
          ref="recaptcha"
          class="recaptcha" 
          @verify="onCaptchaVerified"
          @expired="onCaptchaExpired" 
          sitekey="6LebGl8UAAAAAMdUD8LvxbQ6rBhYaNpYjdiTe79x"
        ></vue-recaptcha>
      </v-container>
      <!-- 登入按鈕 -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!hasPassedRecaptcha" color="green darken-1" flat v-on:click="login">登入</v-btn>
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
    inputPassword (password) {
      const vm = this
      vm.checkPassword(password)
    }
  },
  data: () => {
    return {
      inputEmail: undefined,
      inputPassword: undefined,
      showProgress: false,
      hide: true,
      emailCheck: {
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
      vm.inputPassword = undefined
      vm.$refs.recaptcha.reset()
      vm.hasPassedRecaptcha = false
      vm.emailCheck.hasChecked = false
      vm.emailCheck.isError = false
      vm.emailCheck.hint = ''
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
              if (!bool) {
                vm.emailCheck.isError = true
                vm.emailCheck.hint = '不存在的信箱'
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
    login: async function () {
      const vm = this
      vm.showProgress = true
      FirebaseHelper.login(vm.inputEmail, vm.inputPassword)
      .then((userId) => {
        vm.showProgress = false
        if (userId) {
          vm.showProgress = false
          vm.$emit('logged-in', userId)
          vm.show.bool = false
        } else {
          vm.passwordCheck.isError = true
          vm.passwordCheck.hint = '密碼錯誤'
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
      vm.hasPassedRecaptcha = false
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

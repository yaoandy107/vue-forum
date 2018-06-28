<template>
  <v-dialog v-model="show.bool" max-width="290" style="position: relative;">
    <v-card>
      <v-card-title class="headline blue white--text">登出確認</v-card-title>
      <v-card-text>你確定要登出嗎？</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click.native="show.bool = false">返回</v-btn>
        <v-btn color="green darken-1" flat="flat" v-on:click="logout">確定</v-btn>
      </v-card-actions>
    </v-card>
    <!-- 進度圈 -->
    <v-progress-circular style="position: absolute; top: 50%; right: 50%;" v-show="showProgress" indeterminate color="green"></v-progress-circular>
  </v-dialog>
</template>

<script>
import FirebaseHelper from '@/helpers/FirebaseHelper'

export default {
  props: {
    show: Object
  },
  data: () => ({
    showProgress: false
  }),
  methods: {
    logout: async function () {
      const vm = this
      vm.showProgress = true
      FirebaseHelper.logout(vm.globalObject.userData.userId)
      .then((success) => {
        if (success) {
          vm.show.bool = false
          vm.$emit('logged-out')
          vm.showProgress = false
        }
      })
    }
  }
}
</script>
<template>
  <v-dialog v-model="show.bool" max-width="290">
    <v-card>
      <v-card-title class="headline blue white--text">登出確認</v-card-title>
      <v-card-text>你確定要登出嗎？</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click.native="show.bool = false">返回</v-btn>
        <v-btn color="green darken-1" flat="flat" v-on:click="logout">確定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FirebaseHelper from '@/helpers/FirebaseHelper'

export default {
  props: {
    show: Object
  },
  data: () => {
    return {
    }
  },
  methods: {
    logout: async function () {
      const vm = this
      FirebaseHelper.logout(vm.globalObject.userId)
      .then((success) => {
        if (success) {
          vm.show.bool = false
          vm.$emit('logged-out')
        }
      })
    }
  }
}
</script>
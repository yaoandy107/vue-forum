<template>
  <v-dialog v-model="visible" max-width="290">
      <v-card>
        <v-card-title class="headline blue white--text">登出確認</v-card-title>
        <v-card-text>你確定要登出嗎？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="green darken-1" flat="flat" @click.native="loginObjects.showLogoutDialog = false">返回</v-btn> -->
          <!-- <v-btn color="green darken-1" flat="flat" v-on:click="logout">確定</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>


<script>
export default {
  props: {
    visible: Boolean
  },
  data: () => {
    return {

    }
  }
}
</script>

<template>
  <v-content>
    <router-view></router-view>
  </v-content> 
</template> 

<script>
export default {
  watch: {
    'globalObject.userId': function () {
      const vm = this
      if (!vm.globalObject.userId) {
        vm.messages = []
      }
    }
  },
  data: () => ({
    messages: [
        {userName: '姚韋辰', type: 'text', message: '哈哈'},
        {userName: '陳威任', type: 'text', message: '您好'}
    ]
  })
}
</script>

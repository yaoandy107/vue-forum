<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <!-- Main -->
        </v-layout>
    </v-container>
</template> 

<script>
export default {
  data: () => ({
    title: '論壇',
    dialog: false,
    drawer: null,
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
  props: {
    source: String
  }
}
</script>
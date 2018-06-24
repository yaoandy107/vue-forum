<template>
  <v-list>
    <template v-for="item in items">
      <v-list-tile :key="item.text" @click="" avatar>
        <v-list-tile-avatar>
          <img src="https://vuetifyjs.com/static/doc-images/john.jpg" alt="avatar">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.userName }}
          </v-list-tile-title>
          <v-list-tile-sub-title>
            {{ item.lastMessage}}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
import FirebaseHelper from '@/helpers/FirebaseHelper'
export default {
  created: async function () {
    this.getFriendList()
  },
  methods: {
    getFriendList: function () {
      console.log(this.GLOBAL.id)
      FirebaseHelper.getFriendList('6ocs4VwRRvhVftUjjSuZ')
      .then((friendList) => {
        this.items = friendList.friends
      })
      .catch(() => {
        console.log('取得好友列表錯誤')
      })
    }
  },
  data: () => ({
    items: []
  })
}
</script>

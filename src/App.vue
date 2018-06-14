<template>
  <v-app id="inspire">
    <!-- 抽屜 -->
    <v-navigation-drawer
      clipped
      v-model="drawer"
      fixed
      app
    >
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
      fixed
    >
      <!-- 標題區 -->
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <!-- Title -->
        <span class="hidden-sm-and-down">{{title}}</span>
      </v-toolbar-title>
      <!-- 搜尋欄 -->
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn outline v-on:click="login">
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
    <!-- Floating Action Bar -->
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    
  </v-app>
</template>

<script>
export default {
  methods: {
    login: function() {
      const vm = this
      vm.logStatus
      if (vm.logStatus == '登入') {
        vm.logStatus = '登出'
      } else {
        vm.logStatus = '登入'
      }
    }
  },
  data: () => ({
    title: '論壇',
    logStatus: '登入',
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
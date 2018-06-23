<template>
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
      <v-list-tile v-else :key="item.text" @click="">
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    items: [
      { text: 'TestDrawer2-1' },
      { text: 'TestDrawer2-2' },
      { text: 'TestDrawer2-3' },
      { text: 'TestDrawer2-4' },
      { text: 'TestDrawer2-5' },
      { text: 'TestDrawer2-6' },
      { text: 'TestDrawer2-7' },
      { text: 'TestDrawer2-8' }
    ]
  })
}
</script>

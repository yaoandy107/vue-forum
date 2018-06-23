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
      { text: 'TestDrawer1-1' },
      { text: 'TestDrawer1-2' },
      { text: 'TestDrawer1-3' },
      { text: 'TestDrawer1-4' },
      { text: 'TestDrawer1-5' },
      { text: 'TestDrawer1-6' },
      { text: 'TestDrawer1-7' },
      { text: 'TestDrawer1-8' }
    ]
  })
}
</script>

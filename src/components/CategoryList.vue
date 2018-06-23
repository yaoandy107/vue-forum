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
      { text: 'Category-1' },
      { text: 'Category-2' },
      { text: 'Category-3' },
      { text: 'Category-4' },
      { text: 'Category-5' },
      { text: 'Category-6' },
      { text: 'Category-7' },
      { text: 'Category-8' }
    ]
  })
}
</script>

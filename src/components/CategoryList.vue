<template>
  <v-list>
    <v-layout
      :key="heading"
      row
      align-center
    >
      <v-flex xs12>
        <v-subheader>
          {{ heading }}
        </v-subheader>
      </v-flex>
    </v-layout>
    <template v-for="category in categories">
      <v-list-tile :value="category.isActive" active-class="default-class active-class" :to="{ name: 'category', params: {category: category.url} }" ripple :key="category.text">
        <v-list-tile-content>
          <v-list-tile-title>
            {{ category.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
    <!-- 進度圈 -->
    <v-progress-circular v-show="showProgress" indeterminate color="green"></v-progress-circular>
  </v-list>
</template>

<script>
import FirebaseHelper from '@/helpers/FirebaseHelper'
const data = { // 宣告在這裡是為了讓所有此component實例共享此data物件
  heading: '文章列表',
  categories: [],
  showProgress: true
}
export default {
  created: function () {
    const vm = this
    vm.updateList()
  },
  methods: {
    updateList: function () {
      const vm = this
      vm.showProgress = true
      FirebaseHelper.getCategoryList()
      .then((list) => {
        vm.categories.length = 0
        vm.categories.push(...list)
        vm.showProgress = false
      })
    }
  },
  data: () => data,
  props: {
    category: String
  }
}
</script>

<style>
.active-class {
  background-color: #dddddd;
}
</style>

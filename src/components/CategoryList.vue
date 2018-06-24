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
      <v-list-tile active-class="default-class active-class" ripple :key="category.text" @click="() => test(category.url)">
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
export default {
  beforeRouteEnter: function (to, from, next) {
    next((vm) => {
      vm.updateList()
    })
  },
  methods: {
    updateList: function () {
      const vm = this
      vm.showProgress = true
      FirebaseHelper.getCategoryList()
      .then((list) => {
        vm.categories.push(...list)
        vm.showProgress = false
      })
    },
    test: function (category) {
      const vm = this
      vm.$router.push({ name: 'category', params: { category: category } })
      console.log('ass')
      // FirebaseHelper.addPost('authorC', 'c', 'titleC', 'ContentContentContentContentContentContentContent')
      // FirebaseHelper.addPost('authorC++', 'cpp', 'titleC++', 'ContentContentContentContentContentContentContent')
      // FirebaseHelper.addPost('authorJava', 'java', 'titleJava', 'ContentContentContentContentContentContentContent')
      // FirebaseHelper.addPost('authorJavaScript', 'javascript', 'titleJavaScript', 'ContentContentContentContentContentContentContent')
      // FirebaseHelper.addPost('authorPython', 'python', 'titlePython', 'ContentContentContentContentContentContentContent')
    }
  },
  data: () => ({
    heading: '文章列表',
    categories: [],
    showProgress: true
  })
}
</script>

<style>
.active-class {
  background-color: #dddddd;
}
</style>

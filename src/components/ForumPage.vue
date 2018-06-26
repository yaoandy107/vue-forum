<template>
  <v-content>
    <!-- 左側邊欄 -->
    <v-navigation-drawer
      clipped
      v-model="globalObject.showDrawer"
      fixed
      mobile-break-point="600"
      app>
      <category-list></category-list>
      <function-list class="hidden-lg-and-up"></function-list>
    </v-navigation-drawer>
    <!-- 右側邊欄 -->
    <v-navigation-drawer
      clipped
      fixed
      right
      app>
      <function-list></function-list>
    </v-navigation-drawer>
    <!-- 內容主體 -->
    <router-view>
    </router-view>
  </v-content>
</template>

<script>
import CategoryList from '@/components/CategoryList'
import FunctionList from '@/components/FunctionList'
export default {
  methods: {
  },
  data: () => ({
  }),
  components: {
    CategoryList,
    FunctionList
  }
}
</script>

<template>
  <div class="home main">
    <home-nav></home-nav>
    <router-view></router-view>
  </div>
</template>
<script>
import HomeNav from './HomeNav.vue'
export default {
  components: {
    HomeNav
  }
}
</script>
<style lang="less" scoped>
.home{
  position: fixed;
}
</style>

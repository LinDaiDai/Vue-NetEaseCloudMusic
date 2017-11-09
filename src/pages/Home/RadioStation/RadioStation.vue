<template>
  <div class="friend homeMain">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in banners" :key="item.id"><img class="imgBlock" :src="item.pic"></mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  computed: {
    // 轮播
    banners () {
      return this.$store.state.homeData.banners
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../assets/styles/color.less');
@import url('../../../assets/styles/basis.less');
.mint-swipe{
  height: 10rem;
}
</style>

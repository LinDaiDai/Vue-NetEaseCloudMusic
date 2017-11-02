<template>
  <div class="newlyPlay main">
    <div class="headerBasis">
      <i class="iconfont icon-fanhui fanhui" @click="goBack"></i>
      我的电台
    </div>
    <router-view class="homeMain"></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/styles/basis.less');
@import url('../../assets/styles/color.less');
</style>

<template>
  <div class="myCollect main">
    <div class="headerBasis">
      <i class="iconfont icon-fanhui fanhui" @click="goBack"></i>
      我的收藏
      <span class="iconRight iconfont icon-chazhao"></span>
      <div class="homeNav">
        <ul class="homeHeader">
          <router-link tag="li" to="/">专辑</router-link>
          <router-link tag="li" to="/">歌手</router-link>
          <router-link tag="li" to="/">MV</router-link>
          <router-link tag="li" to="/">专栏</router-link>
        </ul>
      </div>
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

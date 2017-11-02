<template>
  <div class="loaclMusic main">
    <div class="headerBasis">
      <i class="iconfont icon-fanhui fanhui" @click="goBack"></i>
      最近播放
      <span class="iconRight">清空</span>
      <div class="homeNav">
        <ul class="homeHeader">
          <router-link tag="li" to="/">单曲</router-link>
          <router-link tag="li" to="/">歌手</router-link>
          <router-link tag="li" to="/">专辑</router-link>
          <router-link tag="li" to="/">文件夹</router-link>
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
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/styles/basis.less');
@import url('../../assets/styles/color.less');
.newlyPlay{
  .iconRight{
    font-size: 1.2rem;
    line-height: 2.4rem;
  }
}
</style>

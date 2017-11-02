<template>
  <div class="homeNav">
    <ul class="homeHeader">
      <router-link tag="li" class="personality" to="/">个性推荐</router-link>
      <router-link tag="li" class="playlist" to="/playlist">歌单</router-link>
      <router-link tag="li" class="radiostation" to="/radiostation">主播电台</router-link>
      <router-link tag="li" class="rankinglist" to="/rankinglist">排行榜</router-link>
    </ul>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
@import url('../../assets/styles/color.less');
</style>

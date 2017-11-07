<template>
  <div class="homeNav">
    <ul class="homeHeader">
      <router-link tag="li" class="personality" :to="{path:'/home'}">个性推荐</router-link>
      <router-link tag="li" class="playlist" :to="{path:'/home/playlist'}">歌单</router-link>
      <router-link tag="li" class="radiostation" :to="{path:'/home/radiostation'}">主播电台</router-link>
      <router-link tag="li" class="rankinglist" :to="{path:'/home/rankinglist'}">排行榜</router-link>
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

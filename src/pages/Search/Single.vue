<template>
  <div class="single">
    <ul class="singleUl">
      <li class="singleLi" v-for="item in playList" :key="item.id" @click="playThis(item)">
        <h3 class="songName">{{item.name}}</h3>
        <div class="artists">{{item.artists}}</div>
        <i class="iconfont icon-ic_more_vert_px"></i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  computed: {
    playList () {
      let result = this.$store.state.result
      if (result.length > 0) {
        return result
      } else {
        return []
      }
    }
  },
  methods: {
    playThis (item) {
      this.$store.dispatch('playThis', item)
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/styles/basis.less');
@import url('../../assets/styles/color.less');
</style>

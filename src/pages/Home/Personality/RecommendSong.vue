<template>
  <div class="recommendSong" v-if="recommendSong.code === 200">
      <div class="headerBasis">
          <span class="fanhui iconfont icon-fanhui" @click="goBack"></span>
          每日歌曲推荐
      </div>
      <div class="main">
          <ul class="singleUl" id="myLikeUl">
            <li class="firstLi">
                <div class="firstLeft" @click="playAll">
                <i class="iconfont icon-zanting1"></i>
                播放全部<span id="count">(共{{recommendSong.list.length}})</span>
                </div>
                <div class="firstRight">
                <span class="iconfont icon-fenlei"></span>
                多选
                </div>
            </li>
            <li class="singleLi" v-for="(item, index) in recommendSong.list" :key="item.id" @click="playThis(item)">
                <div class="singleLiLeft">
                <h3 class="songName">{{item.name}}</h3>
                <div class="artists">{{item.artists}}-{{item.album}}</div>
                </div>
                <i class="iconfont icon-ic_more_vert_px"></i>
            </li>
        </ul>
      </div>
  </div>
</template>
<script>
export default {
  computed: {
    recommendSong () {
      return this.$store.state.recommendSong
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    // 播放当前歌曲
    playThis (item) {
      this.$store.dispatch('playThis', item)
    },
    // 全部播放
    playAll () {
      let payload = this.recommendSong.list
      this.$store.dispatch('playAll', payload)
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../assets/styles/color.less');
@import url('../../../assets/styles/basis.less');
</style>

<template>
  <div class="audioController">
      <audio id="audioElement" src="http://m2.music.126.net/zaGgmMZiqLCzJTv2GYKkaA==/1365593465215365.mp3"></audio>
  </div>
</template>
<script>
export default {
  mounted () {
    // 设置音频为全局控件
    this.$store.commit('SETAUDIOELEMENT')
    // 注册播放相关的事件
    this.$store.dispatch('registerPlayEvent')
  }
}
</script>
<style lang="less" scoped>

</style>

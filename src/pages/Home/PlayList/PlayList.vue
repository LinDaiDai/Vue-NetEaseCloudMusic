<template>
  <div class="playList homeMain ">
    <play-list-header></play-list-header>
    <play-list-main></play-list-main>
  </div>
</template>
<script>
import PlayListHeader from './PlayListHeader'
import PlayListMain from './PlayListMain'
export default {
  components: {
    PlayListHeader,
    PlayListMain
  }
}
</script>
<style lang="less" scoped>

</style>

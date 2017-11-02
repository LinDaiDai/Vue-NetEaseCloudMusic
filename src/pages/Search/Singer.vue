<template>
  <div class="singer">
    <ul class="singerUl">
      <li class="singerLi" v-for="item in singers" :key="item.id">
        <img v-lazy="item.picUrl">
        <p>{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui'
export default {
  created () {
    Indicator.open('加载中...')
    this.$store.dispatch('getSingers')
      .then(res => {
        if (res.status) {
          this.singers = this.$store.state.singers
          console.log(this.singers)
          Indicator.close()
        } else {
          console.log(res.msg)
          Indicator.close()
        }
      })
  },
  data () {
    return {
      singers: []
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/styles/basis.less');
@import url('../../assets/styles/color.less');
</style>
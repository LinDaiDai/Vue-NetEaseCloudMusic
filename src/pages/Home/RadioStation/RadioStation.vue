<template>
  <div class="radio homeMain">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in banners" :key="item.id"><img class="imgBlock" :src="item.pic"></mt-swipe-item>
    </mt-swipe>
    <div class="radioMain">
      <h2 class="title">
        <span class="titleText">推荐电台</span>
        <i class="more"></i>
      </h2>
      <ul class="sixUl">
        <li v-for="item in allRadio.list" :key="item.id" @click="goDetailRadio(item)">
          <div class="radioName">{{item.name}}</div>
          <figure>
            <img class="imgBlock" v-lazy="item.picUrl">
            <figcaption class="twoClamp">{{item.rcmdText}}</figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    // 轮播
    banners () {
      return this.$store.state.homeData.banners
    },
    // 主播电台
    allRadio () {
      return this.$store.state.allRadio
    }
  },
  methods: {
    goDetailRadio (item) {
      let rid = item.rid
      this.$store.dispatch('getDetailRadio', rid)
        .then(res => {
          if (res.status) {
            this.$store.dispatch('getAct', rid)
            this.$router.push('/detailRadio')
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../assets/styles/color.less');
@import url('../../../assets/styles/basis.less');
.mint-swipe{
  height: 10rem;
}
.radioName{
  position: absolute;
  left: 0;
  top: 7rem;
  color: white;
}
</style>

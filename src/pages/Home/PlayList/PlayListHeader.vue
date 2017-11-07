<template>
  <div class="bannar" @click="goHighquality">
    <div class="coverImg">
      <img :src="highquality.list[0].coverImgUrl" alt="">
    </div>
    <div class="bannarMain">
      <div class="bannarTitle">
        <span class="iconfont icon-v1"></span>
        <span class="bannartitle">精品歌单</span>
        <span class="iconfont icon-you"></span>
      </div>
      <div class="playlistName">{{highquality.list[0].name}}</div>
      <div class="copywriter">{{highquality.list[0].copywriter}}</div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    highquality () {
      return this.$store.state.highquality
    }
  },
  methods: {
    goHighquality () {
      console.log('d')
      this.$router.push('/highquality')
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../assets/styles/color.less');
@import url('../../../assets/styles/basis.less');
.bannar{
  width: 100%;
  height: 8rem;
  padding: 1rem;
  background: linear-gradient(to right, black 15%, #ccc 75%);
  .coverImg{
    float: left;
    width: 5rem;
    height: 5rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .bannarMain{
    float: left;
    width: 19rem;
    height: 5rem;
    padding:0.5rem;
    text-align: left;
    .bannarTitle{
      width: 100%;
      height: 2rem;
      span{
        float: left;
        font-size: 1.6rem;
        padding-right: 0.5rem;
        color: #ccc;
      }
      .bannartitle{
        color: white;
      }
    }
    .playlistName{
      color: white;
      font-size: 1.4rem;
    }
    .copywriter{
      color:#ccc;
      padding-top: 0.5rem;
      font-size: 1.2rem;
    }
  }
}
</style>

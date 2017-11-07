<template>
  <div class="lyricMain">
    <div class="voice">
      <div class="iconfont icon-shengyin"></div>
      <div class="voiceBar">
        <input type="range" value="60" max="100">
      </div>
    </div>
    <div class="lyricWindow">
      <ul class="lyricUl" :style="{'top': lyricTop + 'rem'}">
        <li v-for="(item, index) in lyricArr" :key="item.id" :ref="'item'" :class="{'noTranslate': !item.translateLyric, 'hasTranslate': item.translateLyric}">
          <p v-if="item.lyric" :class="{'activeLyric': index === currentLyricArrIndex}">{{item.lyric}}</p>
          <p class="translateLyric" v-if="item.translateLyric">{{ item.translateLyric }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  mounted () {
    // this.heightLi()
  },
  data () {
    return {
      // top: 17,
      nowIndex: 0
    }
  },
  computed: {
    lyricArr () {
      return this.$store.state.lyricArr
    },
    currentLyricArrIndex () {
      return this.$store.state.currentLyricArrIndex
    },
    songCurrentTime () {
      return this.$store.state.songCurrentTime
    },
    lyricTop () {
      return this.$store.state.lyricTop
    }
  },
  watch: {
    currentLyricArrIndex: function (val) {
      let pos = this.$refs['item'][val].getBoundingClientRect()
      if (pos.height === 0) {
        pos.height = 5
      }
      this.$store.commit('SETLIHEIGHT', pos.height)
    }
  },
  methods: {
    heightLi () {

    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/styles/basis.less');
@import url('../../assets/styles/color.less');
.lyricMain{
  position: absolute;
  width: 100%;
  height: 32.5rem;
}
.voice{
  position: fixed;
  top: 4.5rem;
  left: 0;
  right: 0;
  height: 2rem;
  padding: 0 2rem;
  z-index: 2;
  div{
    float: left;
  }
  .iconfont{
    width: 2rem;
    height: 2rem;
    font-size: 2rem;
    color: white;
    text-align: center;
  }
  .voiceBar{
    width: 20rem;
    height: 100%;
    position: relative;
    span{
      position: absolute;
    }
    .barFill{
      top: 0.8rem;
      height: 0.2rem;
      border-radius: 1rem;
      left: 0;
    }
    .fill{
      width: 100%;
      background-color: #ccc;
    }
    .unfill{
        width: 10%;
        background-color: red;
        z-index: 2;
    }
    .ball{
      width: 1rem;
      height: 1rem;
      background-color: white;
      border-radius: 50%;
      top: 0.4rem;
      left:3rem;
    }
    input[type=range] {
        position: absolute;
        top: 0.6rem;
        left: 0;
        -webkit-appearance: none;
        width: 20rem;
        border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
    }
    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
        height: 0.15rem;
        background-color: #ccc;
        border-radius: 20px; /*将轨道设为圆角的*/
    }
    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 1rem;
        width: 1rem;
        margin-top: -0.4rem; /*使滑块超出轨道部分的偏移量相等*/
        background: #ffffff; 
        border-radius: 50%; /*外观设置为圆形*/
    }
  }
}
.lyricWindow{
  position: fixed;
  height: 100%;
  width: 100%;
  .lyricUl{
    position: absolute;
    top: 30%;
    left: 0;
    width: 100%;
    overflow: hidden;
    padding: 0 0.5rem;
    li{
      width: 100%;
      padding:  0.6rem 0;
      text-align: center;
      p{
      color: rgba(225, 225, 225, 0.7);
      transition: all 0.3s;
      }
      .activeLyric{
        color: rgba(225, 225, 225, 1);
      }
    }
    .noTranslate{
      height: 5rem;
      font-size: 1.6rem;
      line-height: 3rem;
    }
    .hasTranslate{
      line-height: 1rem;
      font-size: 1.4rem;
      p{
        padding: 0.2rem 0;
      }
    }
    .translateLyric{
      font-size: 1.2rem;
    }
  }
}
</style>

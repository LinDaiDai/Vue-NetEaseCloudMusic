<template>
  <div class="player">
    <div class="headerBasis" id="playerHearder">
      <i class="iconfont icon-fanhui fanhui" @click="goBack"></i>
      <div class="songerLef">
        <h3 class="songName">{{songMsg.name}}</h3>
        <h3 class="artists">{{songMsg.artists}}</h3>
      </div>
      <span class="iconRight iconfont icon-fenxiang"></span>
    </div>
    <div class="main">
      <div class="mainTop" @click.stop="changeLyric">
        <transition name="fade">
          <diskette v-if="!lyricBol"></diskette>
          <lyric v-if="lyricBol"></lyric>
        </transition>
      </div>
      <div class="mainContent">
        <div class="progressBar">
          <div class="songTime songCurrentTime">{{songCurrentTime}}</div>
          <div class="bar">
            <input type="range" v-model="value" :max="songDurationA" min="0" step="1">
            <div class="sliderBg sliderFill"></div>
            <div class="sliderBg sliderUnFill" :style="{'width': sliderButtonLeft + 'rem'}"></div>
            <div class="sliderButtionContent" :style="{'left': sliderButtonLeft + 'rem'}">
              <div v-show="isBuffering" class="sliderLoading"></div>
              <div class="sliderButtion"></div>
            </div>
          </div>
          <div class="songTime songDuration">{{songDuration}}</div>
        </div>
        <div class="playControl">
          <div @click.stop="changePlayMode" class="playMode" :class="{'listCycle': playMode === 'listCycle', 'listRandom': playMode === 'listRandom', 'singleCycle': playMode === 'singleCycle'}"></div>
          <div class="songControl">
            <span @click.stop="pre" class="pre"></span>
            <span @click.stop="playControl" class="playStatus" :class="{'playTrue': playStatus, 'playFalse': !playStatus}"></span>
            <span @click.stop="next" class="next"></span>
          </div>
          <div @click.stop="showList" class="playList"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Diskette from './Diskette.vue'
import Lyric from './Lyric.vue'
export default {
  components: {
    Diskette,
    Lyric
  },
  data () {
    return {
      lyricBol: false,
      min: 0,
      step: 1
    }
  },
  computed: {
    // 播放进度
    value: {
      get () {
        return this.$store.state.songCurrentTime
      },
      set (newValue) {
        this.$store.commit('SETSONGCURRENTTIME', newValue)
      }
    },
    // 歌曲信息
    songMsg () {
      return this.$store.state.songMsg
    },
    // 播放状态
    playStatus () {
      return this.$store.state.playStatus
    },
    // 播放模式
    playMode () {
      return this.$store.state.playMode
    },
    // 歌曲是否缓冲完成
    isBuffering () {
      return this.$store.state.isBuffering
    },
    // 歌曲总时间
    songDurationA () {
      return Math.ceil(this.$store.state.songDuration)
    },
    // 当前播放时间
    songCurrentTime () {
      let songCurrentTime = this.$store.state.songCurrentTime
      let min = parseInt(songCurrentTime / 60)
      let sec = parseInt(songCurrentTime % 60)
      if (min < 10) {
        min = '0' + min
      }
      if (sec < 10) {
        sec = '0' + sec
      }
      let timer = min + ':' + sec
      return timer
    },
    // 歌曲总时间
    songDuration () {
      let songDuration = this.$store.state.songDuration
      let min = parseInt(songDuration / 60)
      let sec = parseInt(songDuration % 60)
      if (min < 10) {
        min = '0' + min
      }
      let timer = min + ':' + sec
      return timer
    },
    sliderButtonLeft () {
      return (this.value / this.songDurationA) * 16
    }
  },
  methods: {
    // 返回
    goBack () {
      this.$router.go(-1)
    },
    // 播放暂停
    playControl () {
      if (this.playStatus) {
        this.$store.commit('PAUSECONTROL')
      } else {
        this.$store.commit('PLAYCONTROL')
      }
    },
    // 显示隐藏歌词
    changeLyric () {
      console.log(this.lyricBol)
      this.lyricBol = !this.lyricBol
    },
    // 切换播放模式
    changePlayMode () {
      this.$store.commit('CHANGEPLAYMODE')
    },
    // 播放下一首
    next () {
      this.$store.dispatch('nextControl')
    },
    // 播放上一首
    pre () {
      this.$store.dispatch('preControl')
    },
    // 控制显示隐藏歌单
    showList () {
      console.log(this.playListBol)
      this.$store.commit('CHANGEPLAYLISTBOL')
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/styles/basis.less');
@import url('../../assets/styles/color.less');
.fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
}
.fade-enter, .fade-leave-active {
    opacity: 0;
}
.player{
  height: 100%;
  width: 100%;
  #playerHearder{
    background-color: #6d3e3e;
    z-index: 53;
  }
  .iconRight{
    font-size: 2rem;
    line-height: 2.4rem;
    font-weight: 500;
    float: right;
  }
  .songerLef{
    float: left;
    width: 65%;
    height: 100%;
    h3{
      max-width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
      text-overflow: -o-ellipsis-lastline;
    }
    .songName{
        font-size: @fontSizeMediumX;
        color: white;
        padding-top: 0.5rem;
        height: 2.5rem;
        line-height: 2.5rem;
    }
    .artists{
      height: 2rem;
      line-height: 2rem;
      color: #ccc;
      font-size: @fontSizeSmall;
    }
  }
}
.main{
  z-index: 51;
  overflow: hidden;
  background-color: #6d3e3e;
}
.mainTop{
  position: relative;
  width: 100%;
  height: 32.5rem;
  overflow: hidden;
}
.mainContent{
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 3;
  background-color: #6d3e3e;
}
.progressBar{
  width: 100%;
  height: 4.5rem;
  font-size: 1.2rem;
  color: #fff;
  padding: 0 2rem;
  line-height: 4.5rem;
  div{
    float: left;
  }
  .songTime{
    height: 100%;
    width: 3rem;
  }
  .bar{
    position: relative;
    width: 16rem;
    height: 100%;
    input[type=range] {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 50;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    .sliderBg{
        position: absolute;
        top: 2.2rem;
        left: 0;
        height: 0.15rem;
        border-radius: 20px; /*将轨道设为圆角的*/
    }
    .sliderFill{
        z-index: 1;
        width: 100%;
        background-color: rgba(255, 255, 255, .8);
    }
    .sliderUnFill{
        width: 0;
        z-index: 2;
        background-color: #d33a31;
    }
    .sliderButtionContent,
    .sliderLoading,
    .sliderButtion{
        position: absolute;
        top: 0.7rem;
        left: -0.1rem;
        z-index: 5;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
    }
    .sliderButtion{
        background-color: #fff;
    }
    .slider-button-loading {
        z-index: 9;
        -webkit-transform-origin: 50% 50%;
        -moz-transform-origin: 50% 50%;
        -ms-transform-origin: 50% 50%;
        -o-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
        -webkit-animation: scaleRotate 5s linear infinite;
        -o-animation: scaleRotate 5s linear infinite;
        animation: scaleRotate 5s linear infinite;
        background-image: url("./images/icon_loading.png");
    }
    @-webkit-keyframes scaleRotate {
      from {
        -webkit-transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
        -moz-transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
        -ms-transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
        -o-transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
        transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
      }
      to {
        -webkit-transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
        -moz-transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
        -ms-transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
        -o-transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
        transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
      }
    }
    @keyframes scaleRotate {
      from {
        -webkit-transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
        -moz-transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
        -ms-transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
        -o-transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
        transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
      }
      to {
        -webkit-transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
        -moz-transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
        -ms-transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
        -o-transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
        transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
      }
    }
  }
}
.playControl{
  width: 100%;
  height: 5rem;
  padding: 0 2rem;
  div, span{
    float: left;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .playMode, .playList, .pre, .next{
    background-size: 80% 40%;
    width: 3rem;
    height: 100%;
  }
  .playStatus{
    width: 5rem;
    height: 100%;
    background-size: 70% 70%;
  }
}
.listCycle{
  background-image: url('./images/icon_loop_mode.png')
}
.listRandom{
  background-image: url('./images/icon_random_mode.png')
}
.singleCycle{
  background-image: url('./images/icon_single_mode.png')
}
.playList{
  background-image: url('./images/icon_playing_list.png')
}
.songControl{
  width: 16rem;
  padding: 0 2rem;
  padding-left: 2.5rem;
  height: 100%;
}
.pre{
  background-image: url('./images/icon_pre.png');
}
.next{
  background-image: url('./images/icon_next.png');
}
.playTrue{
  background-image: url('./images/icon_play.png');
}
.playFalse{
  background-image: url('./images/icon_pause.png');
}
</style>

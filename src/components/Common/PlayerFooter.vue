<template>
  <div class="playerFooter">
    <div class="playerPicUrl" @click.stop="goPlayer">
        <img :src="songMsg.picUrl" alt="">
    </div>
    <div class="songMsg" @click.stop="goPlayer">
        <h4>{{songMsg.name}}</h4>
        <div class="songLyric">{{songMsg.artists}}</div>
    </div>
    <div @click="playControl" class="playStatus">
      <i class="iconfont" :class="{'icon-zanting': playStatus, 'icon-zanting3': !playStatus}"></i>
      <i class="iconfont icon-fenlei" @click.stop="showList"></i>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    // 播放状态
    playStatus () {
      return this.$store.state.playStatus
    },
    // 当前播放的歌曲的信息
    songMsg () {
      return this.$store.state.songMsg
    },
    // 当前播放的歌曲列表
    playList () {
      return this.$store.state.playList
    }
  },
  methods: {
    // 控制播放暂停
    playControl () {
      if (this.playStatus) {
        this.$store.commit('PAUSECONTROL')
      } else {
        this.$store.commit('PLAYCONTROL')
      }
    },
    // 控制显示隐藏歌单
    showList () {
      console.log(this.playListBol)
      this.$store.commit('CHANGEPLAYLISTBOL')
    },
    // 点击查看播放详情
    goPlayer () {
      this.$router.push('./player')
    }
  }
}
</script>
<style lang="less" scoped>
.playerFooter{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4.5rem;
  background-color: #fff;
  z-index: 50;
  padding: 0.5rem;
  overflow: hidden;
  .playerPicUrl{
    float: left;
    width: 3.5rem;
    height: 3.5rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .songMsg{
  float: left;
  height: 100%;
  width: 60%;
  text-align: left; 
  padding-left: 0.5rem;
    h4{
      width: 100%;
      font-size: 1.4rem;
      color: #333;
      padding: 0.5rem 0;
      overflow: hidden;
      max-height: 1.8rem;
      text-overflow: ellipsis;
    }
    .songLyric{
      padding-top: 0.5rem;
      font-size: 1.2rem;
      color: #ccc;
    }
  }
  .icon-zanting3{
    color: #555;
    border: 1px solid #555;
    font-size: 1.8rem;
  }
}
.playStatus{
    float: left;
    height: 100%;
    width: 25%;
    padding-top: .5rem;
    color: rgb(218, 15, 15);
    i{
      height: 2.5rem;
      width: 2.5rem;
      line-height: 2.5rem;
      font-size: 2.5rem;
      text-align: center;
      border: 1px solid #ccc;
    }
    i:first-child{
      float: left;
      border-radius: 50%;
    }
    i:nth-child(2){
      float: right;
      color: #555;
      font-size: 2.2rem;
      border: none;
    }
}
</style>

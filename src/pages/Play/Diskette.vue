<template>
<div class="disketteMain">
  <div class="diskette" :class="{'disketteActive': playStatus}">
    <div class="imgDiv">
    <img class="backPic" src="./images/icon_diskette.png" alt="">
    <img class="picUrl" :src="songMsg.picUrl">
    </div>
  </div>
  <div class="pole" :class="{'poleActive': playStatus}">
    <img src="./images/icon_diskette_pole.png" alt="">
  </div>
  <div class="mainNav">
    <ul>
        <li>
            <i class="iconfont icon-shoucang"></i>
        </li>
        <li>
            <i class="iconfont icon-xiazai"></i>
        </li>
        <li>
            <i class="iconfont icon-pinglun"></i>
        </li>
        <li>
            <i class="iconfont icon-ic_more_vert_px"></i>
        </li>
    </ul>
  </div>
</div>
</template>
<script>
export default {
  computed: {
    songMsg () {
      return this.$store.state.songMsg
    },
    playStatus () {
      return this.$store.state.playStatus
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/styles/basis.less');
@import url('../../assets/styles/color.less');
.disketteMain{
  position: relative;
  width: 100%;
  height: 32.5rem;
  .disketteActive{
    position: absolute;
    animation: xuanzhuan 10s linear infinite normal;
  }
  @keyframes xuanzhuan {
    form{transform: rotate(0deg)}
    to{transform: rotate(360deg)}
  }
  .poleActive{
    transform: rotate(0deg)
  }
}
.diskette{
  position: absolute;
  top: 10%;
  left: 13%;
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  imgDiv{
    position: relative;
    width: 100%;
    height: 100%;
  }
  img{
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .backPic{
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .picUrl{
    width: 73%;
    height: 73%;
    top: 14%;
    left: 14%;
  }
}
.pole{
  position: absolute;
  left: 60%;
  width: 4rem;
  height: 10rem;
  transform-origin: left top;
  transform: rotate(-30deg);
  transition: all 0.3s;
  z-index: 6;
  img{
    width: 100%;
    height: 100%;
  }
}
.mainContent{
  width: 100%;
  height: 15rem;
}
.mainNav{
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4.5rem;
  ul{
    height: 100%;
    width: 100%;
    padding: 0 2rem;
    li{
      float: left;
      width: 25%;
      height: 100%;
      line-height: 4.5rem;
      text-align: center;
    }
    i{
      color: white;
      font-size: 2.5rem;
    }
  }
}
</style>

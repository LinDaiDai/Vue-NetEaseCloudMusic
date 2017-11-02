<template>
  <div class="myMusic main">
    <ul class="myMusicUl">
      <li class="loaclMusic">
        <div class="title">本地音乐<span>(0)</span></div>
      </li>
      <li class="newlyPlay" @click="goTo()">
        <div class="title">最近播放<span>({{myMusic.newlyPlay.length}})</span></div>
      </li>
      <li class="download">
        <div class="title">下载管理<span>(0)</span></div>
      </li>
      <li class="myRadio">
        <div class="title">我的电台<span>({{myMusic.myRadio.length}})</span></div>
      </li>
      <li class="mycollect">
        <div class="title">我的收藏<span>({{myMusic.mycollectNum}})</span></div>
      </li>
    </ul>
    <h3 class="creatList" @click="showList">
      <span class="backCenter icon-jiantou" :class="{'active': !showListBol}"></span>
      创建的歌单({{myMusic.createdPlaylistCount}})
      <span class="backCenter set" @click.stop="showSet"></span>
    </h3>
    <ul class="musicList" v-show="showListBol">
      <li class="myLike">
        <div class="logoImg">
          <img class="imgBlock" src="./images/heart.png" alt="">
        </div>
        <div class="likeMain">
          <p class="myLikeTitle">我喜欢的音乐</p>
          <p class="count">{{myMusic.myLikeList.length}}首</p>
        </div>
      </li>
    </ul>
    <div class="setHid" v-show="setBol" @click="showSet">
      <div class="setMain">
        <h2 class="title setTitle">
          创建的歌单
        </h2>
        <ul class="myMusicUl">
          <li>
            <div class="title">创建新歌单</div>
          </li>
          <li>
            <div class="title">歌单管理</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox, Indicator } from 'mint-ui'
export default {
  mounted () {
    if (this.$store.state.loginBol) {
      console.log('登录成功')
      Indicator.open()
      if (this.myMusic.code === 200) {
        console.log('加载成功')
        Indicator.close()
      }
    }
  },
  components: {
    MessageBox,
    Indicator
  },
  data () {
    return {
      // 显示创建的歌单
      showListBol: true,
      // 显示设置
      setBol: false
    }
  },
  computed: {
    // 我的音乐页信息
    myMusic () {
      if (this.$store.state.loginBol) {
        // 若登录, 则获取用户在我的音乐页的信息
        return this.$store.state.myMusic
      } else {
        return {newlyPlay: [], myRadio: [], mycollectNum: 0, createdPlaylistCount: 1, myLikeList: []}
      }
    }
  },
  methods: {
    // 控制创建的歌单显示
    showList () {
      this.showListBol = !this.showListBol
    },
    // 控制设置显示
    showSet () {
      this.setBol = !this.setBol
    },
    // 路由跳转
    goTo () {
      if (this.$store.state.loginBol) {
        this.$router.push({name: 'NewlyPlay'})
      } else {
        console.log('wei')
        MessageBox({
          'title': '提示',
          'message': '您还未登录,请先登录'
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/styles/basis.less');
@import url('../../assets/styles/color.less');
.myMusic{
  text-align: left;
}
.myMusicUl{
  li{
    float: left;
    width: 100%;
    padding-left: 4.5rem;
    background-repeat: no-repeat;
    background-position: 1rem center;
    background-size:2rem 2rem;
    background-color: @backWhite;
    .title{
      border-bottom: 1px solid @borderGary;
      font-size: @fontSizeMedium;
      span{
        color: @fontCcc;
        font-size:  @fontSizeSmall;
      }
    }
  }
  .loaclMusic{
    background-image: url('./images/music.png')
  }
  .newlyPlay{
    background-image: url('./images/play.png')
  }
  .download{
    background-image: url('./images/icon_download.png')
  }
  .myRadio{
    background-image: url('./images/radio.png')
  }
  .mycollect{
    background-image: url('./images/cellect.png')
  }
}
.creatList{
  position: relative;
  height: 2.5rem;
  width: 100%;
  padding: .3rem;
  background: @backF5;
  line-height: 2rem;
  color: @fontCcc;
  font-size:  @fontSizeSmall;
  span{
    position: relative;
    display: inline-block;
    width: 1.4rem;
    height: 1.4rem;
  }
  .icon-jiantou{
    background-size: 50%;
    background-position: .6rem center;
    background-image: url('./images/icon-jiantou.png');
    transform: rotate(90deg);
    transition:  all 0.3s;
  }
  .active{
    transform: rotate(0deg)
  }
  .set{
    position: absolute;
    top: .5rem;
    right: 1rem;
    background-image: url('./images/set.png');
  }
}
.musicList{
  background-color: @backWhite;
  li{
    height: 5rem;
    width: 100%;
    .logoImg{
      float: left;
      height: 4.6rem;
      width: 4.6rem;
      padding: 0.2rem 0.3rem;
      margin: 0.2rem 0.3rem 0.2rem 0.3rem;
      background: @backGary;
      img{
        width: 80%;
        height: 80%;
        margin: .5rem auto;
      }
    }
    .likeMain{
      float: left;
      height: 100%;
      position: relative;
      .myLikeTitle{
        padding: 0.8rem 0;
        font-size: @fontSizeMedium;
      }
      .count{
        padding: 0.5rem 0;
        color: @fontCcc;
        font-size: @fontSizeSmall;
      }
      .ellipsis{
        width: 5rem;
        height: 5rem;
        background-image: url('./images/icon_ellipsis.png');
        background-size: auto 1.6rem;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
  li::after{
    display: block;
    content: '';
    clear: both;
  }
}
.setHid{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 4;
  .setMain{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 12.5rem;
    background-color: @backWhite;
    .setTitle{
      padding: 1.5rem;
      padding-bottom: 0;
      height: 3rem;
      color: @fontCcc;
      font-size: @fontSizeSmall;
    }
    .myMusicUl{
      li{
        background-image: url('./images/music.png')
      }
    }
  }  
}
</style>
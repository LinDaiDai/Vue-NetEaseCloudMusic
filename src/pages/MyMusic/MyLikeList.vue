<template>
  <div class="myLikeList main">
    <div class="headerBasis" id="myLikeHearderBasis">
      <i class="iconfont icon-fanhui fanhui" @click="goBack"></i>
      歌单
      <i class="iconfont icon-chazhao iconRight"></i>
      <i class="iconfont icon-ic_more_vert_px iconRight"></i>
    </div>
    <div class="homeMain">
      <div class="myLikeHearder">
        <div class="hearderTop">
          <div class="topLeft">
            <img :src="myLikeList.coverImgUrl" alt="">
            <span>
              <i class="iconfont icon-erjic"></i>
              {{myLikeList.playCount}}
            </span>
          </div>
          <div class="topRight">
            <h3>我喜欢的音乐</h3>
            <div class="userMsg">
              <img :src="userInfo.profile.avatarUrl" alt="">
              <span>{{userInfo.profile.nickname}}<i class="iconfont icon-you"></i></span>
            </div>
          </div>
        </div>
        <div class="hearderBottom">
          <ul>
            <li>
              <i class="iconfont icon-qitayinlewenjianjia"></i>
              <p>收藏</p>
            </li>
            <li>
              <i class="iconfont icon-pinglun"></i>
              <p>评论</p>
            </li>
            <li>
              <i class="iconfont icon-fenxiang"></i>
              <p>分享</p>
            </li>
            <li>
              <i class="iconfont icon-xiazai"></i>
              <p>下载</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="myLikeMain">
        <ul class="singleUl" id="myLikeUl">
          <li class="firstLi">
            <div class="firstLeft" @click="playAll">
              <i class="iconfont icon-zanting1"></i>
              播放全部<span id="count">(共{{myLikeList.list.length}})</span>
            </div>
            <div class="firstRight">
              <span class="iconfont icon-fenlei"></span>
              多选
            </div>
          </li>
          <li class="singleLi" v-for="(item, index) in myLikeList.list" :key="item.id" @click="playThis(item)">
            <span class="number">{{index + 1}}</span>
            <div class="singleLiLeft">
              <h3 class="songName">{{item.name}}</h3>
              <div class="artists">{{item.del}}</div>
            </div>
            <i class="iconfont icon-ic_more_vert_px"></i>
          </li>
        </ul>
      </div>
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
    // 用户信息
    userInfo () {
      return this.$store.state.userInfo
    },
    // 喜欢的音乐
    myLikeList () {
      return this.$store.state.myMusic.myLikeList
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    // 播放当前歌曲
    playThis (item) {
      this.$store.dispatch('playThis', item)
    },
    // 全部播放
    playAll () {
      let payload = this.myLikeList.list
      this.$store.dispatch('playAll', payload)
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/styles/basis.less');
@import url('../../assets/styles/color.less');
.homeMain{
  top: 0rem;
}
#myLikeHearderBasis{
  background-color: rgba(0, 0, 0, 0.9);
}
</style>

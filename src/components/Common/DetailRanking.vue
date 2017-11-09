<template>
  <div class="detailRanking main" v-if="detailRanking.code === 200">
    <div class="headerBasis" id="detailRankingHeader">
      <i class="iconfont icon-fanhui fanhui" @click="goBack"></i>
      歌单
      <i class="iconfont icon-ic_more_vert_px iconRight"></i>
      <i class="iconfont icon-chazhao iconRight"></i>
    </div>
    <div class="homeMain">
       <div class="myLikeHearder" style='background-color: orange'>
        <div class="hearderTop">
          <div class="topLeft">
            <img :src="detailRanking.coverImgUrl" alt="">
            <span>
              <i class="iconfont icon-erjic"></i>
              {{detailRanking.playCount}}
            </span>
          </div>
        </div>
        <div class="hearderBottom">
          <ul>
            <li>
              <i class="iconfont icon-qitayinlewenjianjia"></i>
              <p>{{detailRanking.subscribedCount}}</p>
            </li>
            <li>
              <i class="iconfont icon-pinglun"></i>
              <p>{{detailRanking.commentCount}}</p>
            </li>
            <li>
              <i class="iconfont icon-fenxiang"></i>
              <p>{{detailRanking.shareCount}}</p>
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
              播放全部<span id="count">(共{{detailRanking.list.length}})</span>
            </div>
            <div class="firstRight">
              <span class="iconfont icon-fenlei"></span>
              多选
            </div>
          </li>
          <li class="singleLi" v-for="(item, index) in detailRanking.list" :key="item.id" @click="playThis(item)">
            <span class="number">{{index + 1}}</span>
            <div class="singleLiLeft">
              <h3 class="songName">{{item.name}}</h3>
              <div class="artists">{{item.artists}}-{{item.album}}</div>
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
  computed: {
    detailRanking () {
      return this.$store.state.detailRanking
    }
  },
  methods: {
    // 返回
    goBack () {
      this.$router.go(-1)
    },
    // 播放当前歌曲
    playThis (item) {
      this.$store.dispatch('playThis', item)
    },
    // 全部播放
    playAll () {
      let payload = this.detailRanking.list
      this.$store.dispatch('playAll', payload)
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/styles/color.less');
@import url('../../assets/styles/basis.less');
.detailRanking{
    top: 0;
    .homeMain{
        top: 0;
    }
    .myLikeHearder{
        padding-top: 4.5rem;
        height: 45%;
    }
}
#detailRankingHeader{
    // background-color: rgba(0, 0, 0, .5);
    background: transparent;
}
</style>

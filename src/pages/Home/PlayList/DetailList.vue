<template>
    <div class="detailList main">
    <div class="headerBasis" id="detailListHeader">
      <i class="iconfont icon-fanhui fanhui" @click="goBack"></i>
      歌单
      <i class="iconfont icon-ic_more_vert_px iconRight"></i>
      <i class="iconfont icon-chazhao iconRight"></i>
    </div>
    <div class="homeMain">
      <div class="myLikeHearder">
        <div class="hearderTop">
          <div class="topLeft">
            <img :src="detailList.coverImgUrl" alt="">
            <span>
              <i class="iconfont icon-erjic"></i>
              {{detailList.playCount}}
            </span>
          </div>
          <div class="topRight">
            <h3>{{detailList.name}}</h3>
            <div class="userMsg">
              <img :src="detailList.creator.avatarUrl" alt="">
              <span>{{detailList.creator.nickname}}<i class="iconfont icon-you"></i></span>
            </div>
          </div>
        </div>
        <div class="hearderBottom">
          <ul>
            <li>
              <i class="iconfont icon-qitayinlewenjianjia"></i>
              <p>{{detailList.subscribedCount}}</p>
            </li>
            <li>
              <i class="iconfont icon-pinglun"></i>
              <p>{{detailList.commentCount}}</p>
            </li>
            <li>
              <i class="iconfont icon-fenxiang"></i>
              <p>{{detailList.shareCount}}</p>
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
              播放全部<span id="count">(共{{detailList.list.length}})</span>
            </div>
            <div class="firstRight">
              <span class="iconfont icon-fenlei"></span>
              多选
            </div>
          </li>
          <li class="singleLi" v-for="(item, index) in detailList.list" :key="item.id" @click="playThis(item)">
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
// import {Indicator} from 'mint-ui'
export default {
//   created () {
//     Indicator.open()
//   },
//   mounted () {
//     Indicator.close()
//     console.log('加载完毕')
//     Indicator.close()
//   },
  computed: {
    detailList () {
      return this.$store.state.detailList
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
      let payload = this.detailList.list
      this.$store.dispatch('playAll', payload)
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../assets/styles/color.less');
@import url('../../../assets/styles/basis.less');
.homeMain{
  top: 0rem;
}
#detailListHeader{
  background-color: rgba(0, 0, 0, 0.9);
  .iconRight{
      padding: 1.2rem 0.5rem;
      text-align: center;
      font-size: 2.5rem;
      line-height: 2rem;
  }
  .icon-chazhao{
      font-size: 2rem;
  }
}
</style>

<template>
  <div class="newlyPlay">
    <div class="headerBasis">
      <i class="iconfont icon-fanhui fanhui" @click="goBack"></i>
      最近播放
      <span class="iconRight">清空</span>
    </div>
    <div class="main">
      <ul class="singleUl" id="newlyPlayUl">
        <li id="firstLi">
          <div class="firstLeft">
            <i class="iconfont icon-zanting1"></i>
            播放全部<span id="count">(共{{newlyPlay.length}})</span>
          </div>
          <div class="firstRight">
            <span class="iconfont icon-fenlei"></span>
            多选
          </div>
        </li>
        <li class="singleLi" v-for="(item, index) in newlyPlay" :key="item.id" @click="playThis(item)">
          <h3 class="songName">{{item.name}}</h3>
          <div class="artists">{{item.artists}}</div>
          <i class="iconfont icon-ic_more_vert_px"></i>
        </li>
      </ul>
    </div>
    <my-play-list v-if='playListBol'></my-play-list>
  </div>
</template>
<script>
import MyPlayList from '../../components/Common/MyPlayList.vue'
export default {
  components: {
    MyPlayList
  },
  data () {
    return {

    }
  },
  computed: {
    newlyPlay () {
      return this.$store.state.myMusic.newlyPlay
    },
    playListBol () {
      return this.$store.state.playListBol
    }
  },
  methods: {
    // 返回
    goBack () {
      this.$router.go(-1)
    },
    // 播放当前选中的歌
    playThis (item) {
      this.$store.dispatch('playThis', item)
    },
    // 播放当前列表
    playThisList (playList) {

    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/styles/basis.less');
@import url('../../assets/styles/color.less');
.newlyPlay{
  .headerBasis{
    font-weight: 600;
  }
  .iconRight{
    font-size: 1.2rem;
    line-height: 2.4rem;
    font-weight: 500;
  }
}
#newlyPlayUl{
  #firstLi{
    height: 4.5rem;
    line-height: 3.5rem;
    border-bottom: 1px solid @borderGary;
    text-align: left;
    padding: .7rem 0;
    color: @font333;
    #count{
      color: @fontCcc;
      font-size: @fontSizeSmall;
    }
    i{
      width: 3rem;
      float: left;
      text-align: center;
      font-size: @fontSizeLarge;
    }
    .firstLeft{
      width: 70%;
      height: 100%;
      float: left;
    }
    .firstRight{
      width: 6rem;
      font-size: @fontSizeSmall;
      color:@fontGary;
      height: 100%;
      float: right;
    }
  }
  .singleLi{
    .songName{
      color: #333;
      font-size: @fontSizeMediumX;
    }
  }
}
</style>

<template>
  <div class="comment">
    <div class="headerBasis">
       <span class="fanhui iconfont icon-fanhui" @click="goBack"></span>
       评论({{Allcomments.allLength}})
    </div>
    <div class="main">
        <div class="songMsg">
            <div class="coverImg">
                <img :src="songMsg.picUrl" alt="">
            </div>
            <div class="songMsgRight">
                <div class="songName">{{songMsg.name}}</div>
                <div class="artists">{{songMsg.artists}}</div>
                <div class="goMore">
                    <i class="iconfont icon-you"></i>
                </div>
            </div>
        </div>
        <div class="commentTitle">
            精彩评论
        </div>
        <ul class="commentUl">
            <li class="commentLi" v-for="(item, index) in hotComments" :key="item.id">
                <div class="avatarUrl">
                    <img :src="item.user.avatarUrl" alt="">
                </div>
                <div class="commentRight">
                    <div class="nickname">{{item.user.nickname}}</div>
                    <div class="time">{{item.time}}</div>
                    <div class="commentContent">{{item.content}}</div>
                    <div class="liked">
                        <span class="likedCount">{{item.likedCount}}</span>
                        <span class="iconfont icon-zan" @click="likeComment(item)" :class="{'active': item.liked}"></span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    // 当前播放的歌曲
    songMsg () {
      return this.$store.state.songMsg
    },
    Allcomments () {
      return this.$store.state.comments
    },
    // 热门评论信息
    hotComments () {
      return this.$store.state.comments.hotComments
    },
    // 评论信息
    comments () {
      return this.$store.state.comments.comments
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    // 给评论点赞
    likeComment (item) {
      let loginBol = this.$store.state.loginBol
      if (loginBol) {
        this.$store.dispatch('likeComment', item)
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/styles/basis.less');
@import url('../../assets/styles/color.less');
.songMsg{
    width: 100%;
    height: 6rem;
    padding: 0.5rem;
    background-color: white;
    .coverImg{
        float: left;
        width: 5rem;
        height: 5rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .songMsgRight{
        float: left;
        height: 100%;
        width: 20rem;
        padding: 1rem 0.5rem;
        color: @fontGary;
        position: relative;
        text-align: left;
        div{
            width: 100%;
            float: left;
        }
        .songName{
            color: #000;
            font-size: 1.4rem;
            padding: 0.6rem 0;
            padding-top: 0;
        }
        .artists{
            font-size: 1.2rem;
        }
        .goMore{
            position: absolute;
            top: 0;
            right: 0;
            width: 1.2rem;
            height: 100%;
            line-height: 5rem;
        }
    }
}
.commentTitle{
    background-color: @backF5;
    color: @fontGary;
    font-size: 1.2rem;
    padding: 0.6rem 0.5rem;
    text-align: left;
}
</style>

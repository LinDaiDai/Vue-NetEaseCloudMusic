<template>
  <div class="myLikeList main">
    <div class="headerBasis" id="myLikeHearderBasis">
      <i class="iconfont icon-fanhui fanhui" @click="goBack"></i>
      歌单
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
    playThis () {

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
  background-color: rgba(0, 0, 0, 0.7);
}
.myLikeHearder{
  width: 100%;
  height: 40%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0 1.5rem;
  .hearderTop{
    width: 100%;
    height: 10rem;
    .topLeft{
      float: left;
      position: relative;
      width: 10rem;
      height: 10rem;
      color: white;
      background-color: blue;
      img{
        width: 100%;
        height:100%;
      }
      .icon-shoucang{
        position: absolute;
        font-size: 6rem;
        top: 2.5rem;
        left: 2.5rem;
      }
      span{
        position: absolute;
        height: 20%;
        right: 0.3rem;
        top: 0.3rem;
      }
    }
    .topRight{
      float: left;
      width: 12rem;
      height: 10rem;
      h3{
        padding: 1rem;
        color: white;
        font-size: 1.6rem;
        text-align: left;
      }
      .userMsg{
        height: 4rem;
        padding: .8rem 1rem;
        color: #ccc;
        line-height: 1rem;
        font-size: 1.2rem;
        img{
          display: inline-block;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
        }
        span{
          float: right;
          display: inline-block;
          line-height: 2rem;
          height: 100%;
        }
        i{
          font-weight: 100;
        }
      }
    }
  }
  .hearderBottom{
    width: 100%;
    height: 7rem;
    padding-top: 2rem;
    ul{
      width: 100%;
      height: 5rem;
      li{
        float: left;
        width: 25%;
        height: 5rem;
        padding: 0 1rem;
        i{
          font-size:2rem;
          font-weight: 200;
        }
        p{
          padding-top: 0.4rem;
        }
      }
    }
  }
}
#myLikeUl{
  .firstLi{
    height: 4.5rem;
    line-height: 3.5rem;
    border-bottom: 1px solid @borderGary;
    text-align: left;
    padding: .7rem 0;
    color: @font333;
    .firstLeft{
      float: left;
      width: 70%;
      height: 100%;
      font-size: @fontSizeMediumX;
    }
    #count{
      color: @fontCcc;
      font-size: @fontSizeSmall;
    }
    i{
      width: 3rem;
      float: left;
      text-align: center;
      font-size: @fontSizeLargeX;
    }
    .firstRight{
      width: 6rem;
      text-align: center;
      font-size: @fontSizeSmall;
      color:@fontGary;
      height: 100%;
      float: right;
      span{
        font-size: @fontSizeMediumX;
      }
    }
  }
  .singleLi{
    padding: 0;
    height: 4.5rem;
    border: none;
    .number{
      display: block;
      float: left;
      width: 4.5rem;
      height: 4.5rem;
      line-height: 4.5rem;
      font-size: @fontSizeMediumX;
      text-align: center;
    }
    .singleLiLeft{
      float: left;
      width: 70%;
      height: 100%;
      padding: .1rem 0;
      line-height: 2.5rem;
      .songName{
        color: #333;
        padding: 0;
        font-size: @fontSizeMediumX;
      }
      .artists{
        padding-top: 0;
        line-height: 2rem;
        text-overflow: ellipsis;
        max-height: 2rem;
      }
    }

  }
}
</style>

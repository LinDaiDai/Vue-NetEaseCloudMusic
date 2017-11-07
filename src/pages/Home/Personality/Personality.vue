<template>
  <div class="personality homeMain">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in banners" :key="item.id"><img class="imgBlock" :src="item.pic"></mt-swipe-item>
    </mt-swipe>
    <ul class="perNav">
      <li @click="goFm"><span class="imgBlock backCenter privateFM"></span>私人FM</li>
      <router-link tag="li" to="/recommendSong"><span class="imgBlock backCenter everyDay"></span>每日歌曲推荐</router-link>
      <router-link tag="li" to="/"><span class="imgBlock backCenter hotRanking"></span>云音乐热歌榜</router-link>
    </ul>
    <div class="perMain">
      <div class="sixList divList">
        <h2 class="title">
          <span class="titleText">推荐歌单</span>
          <i class="more"></i>
        </h2>
        <ul class="sixUl">
          <li v-for="item in personalized" :key="item.id">
            <div class="playCount"></div>
            <figure>
              <img class="imgBlock" v-lazy="item.picUrl">
              <figcaption class="twoClamp">{{item.name}}</figcaption>
            </figure>
          </li>
        </ul>
      </div>
      <div class="threeList divList">
        <h2 class="title">
          <span class="titleText">独家放送</span>
          <i class="more"></i>
        </h2>
        <ul class="threeUl">
          <li v-for="item in privatecontent" :key="item.id">
            <figure>
              <img class="imgBlock" v-lazy="item.picUrl">
              <figcaption class="twoClamp">
                <p>{{item.name}}</p>
              </figcaption>
            </figure>
          </li>
        </ul>
      </div>
      <div class="fourList divList">
        <h2 class="title">
          <span class="titleText">推荐MV</span>
          <i class="more"></i>
        </h2>
        <ul class="fourUl">
          <li v-for="item in personalizedMv" :key="item.id">
            <figure>
              <img class="imgBlock" v-lazy="item.picUrl">
              <figcaption class="twoClamp">
                <p>{{item.name}}</p>
                <p class="artists">{{item.artistName}}</p>
              </figcaption>
            </figure>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created () {
    // 获取每日推荐歌曲
    this.$store.dispatch('getRecommendSong')
  },
  data () {
    return {

    }
  },
  computed: {
    // 轮播
    banners () {
      return this.$store.state.homeData.banners
    },
    // 推荐歌单
    personalized () {
      return this.$store.state.homeData.personalized
    },
    // 独家放送
    privatecontent () {
      // 由于获取到的数据在实际中, 第一个是最后一个, 所以对数组做处理
      let arr = this.$store.state.homeData.privatecontent
      if (arr !== undefined) {
        let firstChild = arr.shift()
        arr.push(firstChild)
        return arr
      } else {
        return []
      }
    },
    // 推荐MV
    personalizedMv () {
      return this.$store.state.homeData.personalizedMv
    }
  },
  methods: {
    goFm () {
      this.$store.dispatch('getFm')
        .then(res => {
          if (res.status) {
            let fm = this.$store.state.fm.list
            this.$store.dispatch('playAll', fm)
            this.$router.push('/player')
          } else {
            console.log('获取数据失败')
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../assets/styles/color.less');
@import url('../../../assets/styles/basis.less');
.mint-swipe{
  height: 8rem;
}
.perNav{
  height: 6.5rem;
  width: 100%;
  border-bottom: 1px solid @borderGary;
  li{
    float: left;
    width: 33%;
    height: 100%;
    color: @font111;
    padding:.5rem 1rem;
    font-size: @fontSizeSmall;
    span{
      border-radius: 50%;
      width: 4rem;
      height: 4rem;
      margin:0 auto;
      margin-bottom: .4rem;
      background-size: 25px 25px;
      border: 1px solid @borderRed;
    }
    .privateFM{
      background-image: url('../images/fm.png')
    }
    .everyDay{
      background-image: url('../images/dailysong.png');
    }
    .hotRanking{
      background-image: url('../images/ranklist.png');
    }
  }
}
.sixList{
  .sixUl{
    width: 100%;
    li{
      position: relative;
      float: left;
      width: 33.3%;
      height: 12rem;
      padding-right: 0.2rem;
      figure{
        width: 100%;
        height: 100%;
        img{
          width: 100%;
          height: 8.7rem;
        }
        figcaption{
          text-align: left;
          font-size: @fontSizeSmall;
          color: #000;
          margin-top: .5rem;
        }
      }
    }
    li:nth-child(3){
      padding: 0;
    }
    li:last-child{
      padding: 0;
    }
  }
}
.threeList{
  .threeUl{
    width: 100%;
    li{
      position: relative;
      float: left;
      width: 50%;
      height: 11rem;
      figure{
        width: 100%;
        height: 100%;
        img{
          width: 100%;
          height: 6.5rem;
        }
        figcaption{
          text-align: left;
          margin-top: .5rem;
          font-size: @fontSizeSmall;
          color: #000;
        }
      }
      figure:last-child>img{
        height: 7.5rem;
      }
    }
    li:first-child{
      padding-right: 0.2rem;
    }
    li:last-child{
      width: 100%;
      height: 11rem;
    }
  }
}
.fourList{
  .fourUl{
    li{
      position: relative;
      float: left;
      width: 50%;
      height: 11rem;
      figure{
        width: 100%;
        height: 100%;
        img{
          width: 100%;
          height: 6.5rem;
        }
        figcaption{
          text-align: left;
          margin-top: .5rem;
          font-size: @fontSizeSmall;
          color: #000;
          .artists{
            font-size: 1rem;
            color:@fontCcc;
          }
        }
      }  
    }
    li:nth-child(2n+1){
      padding-right: 0.2rem;
    }
  }
}
</style>

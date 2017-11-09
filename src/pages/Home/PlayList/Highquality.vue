<template>
  <div class="highquality">
    <header class="headerBasis">
      <span class="fanhui iconfont icon-fanhui" @click="goBack"></span>
      精品歌单·全部
      <span class="iconRight">筛选</span>
    </header>
    <div class="main">
      <ul class="highqualityUl">
        <li class="highqualityLi" v-for="(item, index) in highquality.list" :key="item.id" @click="goDetail(item)">
          <div class="coverImg">
            <img :src="item.coverImgUrl" alt="">
          </div>
          <div class="highqualityMain">
            <div class="highqualityTitle">{{item.name}}</div>
            <div class="creater">by&nbsp;{{item.creator.nickname}}</div>
            <div class="copywriter">
              <span class="tag">{{item.tag}}</span>
              {{item.copywriter}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  created () {
    if (this.highquality.code === 200) {
      console.log(this.highquality)
    } else {
      console.log('获取数据失败')
    }
  },
  computed: {
    highquality () {
      return this.$store.state.highquality
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goDetail (item) {
      this.$store.dispatch('getDetailList', item)
      this.$router.push('/detailList')
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../assets/styles/color.less');
@import url('../../../assets/styles/basis.less');
.highquality{
  .iconRight{
      padding: 1.2rem 0;
      line-height: 2rem;
      font-size: 1.6rem;
  }
}

.highqualityUl{
  width: 100%;
  .highqualityLi{
    width: 100%;
    height: 8rem;
    padding-top: 0.1rem;
    .coverImg{
      float: left;
      height: 7.9rem;
      width: 7.9rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .highqualityMain{
      float: left;
      width: 18.5rem;
      height: 100%;
      padding: 1rem 0.5rem;
      padding-right: 0;
      text-align: left;
      font-size: 1rem;
      color: #ccc;
      .highqualityTitle{
        font-size: 1.4rem;
        color: #111;
        padding: 0.2rem 0;
      }
      .creater, .copywriter{
        padding: 0.6rem 0;
      }
      .copywriter{
        padding-top: 0;
        line-height: 1.6rem;
        max-height: 1.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tag{
        display: inline-block;
        border: 1px solid @borderRed;
        color: @borderRed;
        margin-right: 0.1rem;
        padding: 0.1rem;
        line-height: 1rem;
      }
    }
  }
}
</style>

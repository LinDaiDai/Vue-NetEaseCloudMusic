<template>
  <div class="rankingList homeMain">
    <h2 class="title">
      <span class="titleText">官方榜</span>
    </h2>
    <ul class="officialUl">
      <li class="officialLi" v-for="(item, index) in officialRanking" :key="item.id" @click="goDetailRanking(item.id)">
        <div class="coverImgUrl">
          <img :src="item.coverImgUrl" alt="">
        </div>
        <div class="officialLiRight">
          <ul>
            <li v-for="(pro, index2) in item.newList" :key="pro.id">
              {{index2 + 1}}.{{pro.name}}-{{pro.artists}}
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <h2 class="title">
      <span class="titleText">全球榜</span>
    </h2>
    <ul class="sixUl">
      <li class="singleLi" v-for="(item, index) in worldRanking" :key="item.id" @click="goDetailRanking(item.id)">
        <figure>
          <img class="imgBlock" v-lazy="item.coverImgUrl">
          <figcaption class="twoClamp">{{item.name}}</figcaption>
        </figure>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  computed: {
    officialRanking () {
      // 获取全部排行榜中的所有排行列表
      let rankings = this.$store.state.allRanking.rankings
      // 只取前6个排行榜
      let newRankings = rankings.slice(0, 6)
      // 只取每个排行版中歌单的前3首歌
      for (var i = 0; i < newRankings.length; i++) {
        let newList = newRankings[i].list.slice(0, 3)
        newRankings[i].newList = newList
      }
      console.log(this.$store.state.allRanking.rankings)
      console.log(newRankings)
      return newRankings
    },
    worldRanking () {
      let rankings = this.$store.state.allRanking.rankings
      let worldRanking = []
      for (var i = 0; i < rankings.length; i++) {
        if (i > 5) {
          worldRanking.push(rankings[i])
        }
      }
      return worldRanking
    }
  },
  methods: {
    goDetailRanking (id) {
      this.$store.dispatch('setDetailRanking', id)
      this.$router.push('/detailRanking')
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../assets/styles/color.less');
@import url('../../../assets/styles/basis.less');
.rankingList{
  background-color: @backF5;
}
.officialUl{
  width: 100%;
  .officialLi{
    width: 100%;
    height: 8rem;
    padding-top: 0.2rem;
    border-bottom: 1px solid @borderGary;
    .coverImgUrl{
      float: left;
      width: 25%;
      height: 0%;
      padding-bottom: 25%;
      overflow: hidden;
      margin: 0;
      position: relative;
      img{
        width: 100%;
      }
    }
    .officialLiRight{
      float: left;
      width: 75%;
      height: 100%;
      padding: 1rem 0.5rem;
      padding-right: 0;
      text-align: left;
      font-size: 1.2rem;
      color: #ccc;
      ul{
        width: 100%;
        height: 100%;
        li{
          max-width: 100%;
          float: left;
          width: 100%;
          text-align: left;
          height: 33.3%;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
</style>

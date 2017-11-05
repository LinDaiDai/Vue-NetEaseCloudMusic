<template>
  <div class="search main">
    <div class="headerBasis">
      <i class="iconfont icon-fanhui fanhui" @click="goBack"></i>
      <input class="searchText" type="text" placeholder="搜索音乐,歌手,歌词,用户" v-model="key">
      <span class="iconfont icon-chuyidong" v-if="navBol" @click="clear"></span>
      <div class="keyResult"  v-if="navBol">
        <ul>
          <li @click="goResult(key, ' ')">
            搜索"{{key}}"
          </li>
          <li v-for="item in results" :key="item.id" @click="goResult(item.name, item.artists[0].name)">
            <i class="iconfont icon-chazhao"></i>
            {{item.name}}&nbsp;{{item.artists[0].name}}
          </li>
        </ul>
      </div>
    </div>
    <search-no v-if="!searchBol"></search-no>
    <search-yes v-else></search-yes>
  </div>
</template>
<script>
import SearchNo from './SearchNo.vue'
import SearchYes from './SearchYes.vue'
export default {
  components: {
    SearchNo,
    SearchYes
  },
  data () {
    return {
      // 用户输入的关键字
      key: '',
      // 控制搜索菜单显示
      navBol: false,
      // 控制搜索结果页面显示
      searchBol: false
    }
  },
  computed: {
    // 搜索结果
    results () {
      return this.$store.state.results
    }
  },
  watch: {
    key: function (val) {
      this.navBol = true
      this.$store.dispatch('getResules', val)
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
      this.key = ''
      this.navBol = false
      this.searchBol = false
    },
    clear () {
      this.key = ''
    },
    // 用户点击结果
    goResult (name, artistsName) {
      let result = name + artistsName
      this.$store.dispatch('goResult', result)
        .then(res => {
          if (res.status) {
            this.navBol = false
            this.searchBol = true
            this.$router.push('/single')
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/styles/basis.less');
@import url('../../assets/styles/color.less');
.search{
  .headerBasis{
    ::-webkit-input-placeholder { color: #f7f0f0; opacity: 0.7}
    .searchText{
      position: relative;
      float: left;
      height: 3rem;
      padding-top: .5rem;
      line-height: 3rem;
      width: 80%;
      font-size: 1.6rem;
      color: #fff;
      background-color: @backRed;
      border-bottom: 1px solid @borderGary;
    }
    span{
      position: absolute;
      right: .5rem;
      color: white;
      font-size: 3rem;
    }
    .keyResult{
      position: fixed;
      top: 4.8rem;
      width: 90%;
      left: 5%;
      z-index: 16;
      box-shadow: 0 1px 1px 3px #ccc;
      background-color: #fff;
      ul{
        width: 100%;
        li{
          width: 100%;
          height: 4.5rem;
          line-height: 4.5rem;
          padding-left: 1rem;
          font-size: @fontSizeMediumX;
          color: @fontCcc;
          text-align: left;
          border-bottom: 1px solid @borderGary;
          overflow: hidden;
          text-overflow: ellipsis;
          i{
            display: inline-block;
            width: 2.5rem;
            height: 4.5rem;
            color: #E1E1E2;
          }
        }
        li:first-child{
          color: @fontBlue;
        }
      }
    }
  }
}

</style>

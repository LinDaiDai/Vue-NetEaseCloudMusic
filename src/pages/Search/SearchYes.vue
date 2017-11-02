<template>
  <div class="searchYes">
    <div class="homeNav">
        <ul class="homeHeader">
            <router-link tag="li" to="/single">单曲</router-link>
            <router-link tag="li" to="/singer">歌手</router-link>
            <router-link tag="li" to="/">专辑</router-link>
            <router-link tag="li" to="/">歌单</router-link>
            <router-link tag="li" to="/">MV</router-link>
            <router-link tag="li" to="/">主播电台</router-link>
            <router-link tag="li" to="/">用户</router-link>
            <div class="huakuai"></div>
        </ul>
    </div>
    <router-view class="homeMain"></router-view>
  </div>
</template>
<script>
export default {
  created () {

  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/styles/basis.less');
@import url('../../assets/styles/color.less');
.searchYes{
    width: 100%;
    height: 100%;
    .homeNav::-webkit-scrollbar{display:  none};	
    .homeNav{
        overflow-x: scroll;
        .homeHeader{
            width: 140%;
            position: relative;
            li{
                width: 6.1rem;
                height: 100%;
                font-size: 1.2rem;
            }
        }
        .huakuai{
            position: absolute;
            width: 6.1rem;
            height: 2px;
            left: 0;
            bottom: 0;
            background-color: @backRed;
        }
    }
}
</style>

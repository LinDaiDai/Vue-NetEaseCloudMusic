<template>
    <div class="tabBar headerBasis">
        <me v-show="meBol"></me>
        <div class="meBtn backCenter" @click="showMe">
            <img class="imgBlock" src="./images/me.png" alt="">
        </div>
        <ul class="tabUl">
            <router-link tag="li" class="myMusic" to="/mymusic">
                <span></span>
            </router-link>
            <router-link tag="li" class="home" to="/">
                <span></span>
            </router-link>
            <router-link tag="li" class="friend" to="/friend">
                <span></span>
            </router-link>
        </ul>
        <router-link class="searchBtn" to="/search">
            <img class="imgBlock" src="./images/search.png" alt="">  
        </router-link>
    </div>
</template>
<script>
import Me from '@/components/Me/Me'
export default {
  data () {
    return {

    }
  },
  components: {
    Me
  },
  computed: {
    meBol () {
      return this.$store.state.meBol
    }
  },
  methods: {
    // 控制用户信息显示
    showMe () {
      this.$store.commit('CHANGEMEBOL')
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/styles/color.less');
@import url('../../assets/styles/basis.less');
.tabBar{
    .meBtn{
        float: left;
        width: 4.5rem;
        height: 100%;
        padding: 1.2rem;
    }
    .tabUl{
        float: left;
        width: 17rem;
        height: 100%;
        padding: 0 1rem 0 3rem;
        li{
            float: left;
            height: 100%;
            width: 30%;
            padding: 1.2rem 0.8rem;
            span{
                display: block;
                width: 100%;
                height: 100%;
                background-position: center;
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
        }
    }
    li.myMusic{
        padding: 1.3rem 0.9rem;
    }
    .myMusic>span{
        background-image: url('./images/music.png')
    }
    .home>span{
        background-image: url('./images/icon_logo.png')
    }
    .friend>span{
        background-image: url('./images/friends.png')
    }
    .myMusic.router-link-exact-active>span{
        background-image: url('./images/music_hover.png')
    }
    .home.router-link-exact-active>span{
        background-image: url('./images/icon_logo_hover.png')
    }
    .friend.router-link-exact-active>span{
        background-image: url('./images/friends_hover.png')
    }  
    .searchBtn{
        float: left;
        width: 4.5rem;
        height: 100%;
        padding: 1.2rem;
    }
}
</style>

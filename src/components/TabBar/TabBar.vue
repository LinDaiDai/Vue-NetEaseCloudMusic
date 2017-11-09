<template>
    <div class="tabBar headerBasis">
        <div class="mask" v-show="meBol"></div>
        <transition name="slide">
            <me v-show="meBol" ></me>
        </transition>
        <div class="meBtn backCenter" @click="showMe">
            <i class="iconfont icon-fenlei1"></i>
        </div>
        <ul class="tabUl">
            <router-link tag="li" class="myMusic" to="/">
                <span></span>
            </router-link>
            <router-link tag="li" class="home" to="/home">
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
.slide-enter-active {
  transition: transform .3s ease;
}
.slide-leave-active {
  transition: transform .8s ease;
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(200px);
}
.mask{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
}
.tabBar{
    .meBtn{
        float: left;
        width: 4.5rem;
        height: 100%;
        padding: 1.2rem;
        text-align: center;
        line-height: 2.2rem;
        i{
            font-size: 2.8rem;
        }
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
                opacity: 0.6;
            }
        }
    }
    li.myMusic{
        padding: 1.3rem 0.9rem;
    }
    .myMusic>span{
        background-image: url('./images/music_hover.png')
    }
    .home>span{
        background-image: url('./images/icon_logo_hover.png')
    }
    .friend>span{
        background-image: url('./images/friends_hover.png')
    }
    .myMusic.router-link-exact-active>span{
        opacity: 1;
    }
    .home.router-link-exact-active>span{
        opacity: 1;
    }
    .friend.router-link-exact-active>span{
        opacity: 1;
    }  
    .searchBtn{
        float: left;
        width: 4.5rem;
        height: 100%;
        padding: 1.2rem;
    }
}
</style>

<template>
  <div id="app">
    <tab-bar v-if="tabBarShow"></tab-bar>
    <transition name="fade">
      <keep-alive>
        <router-view v-if="!$route.meta.notKeepAlive"></router-view>
      </keep-alive>
      <router-view v-if="$route.meta.notKeepAlive"></router-view>
    </transition>
    <player-footer v-if="playListLen > 0"></player-footer>
    <div @click="close" v-if="playListBol" class="mask"></div>
    <transition name="slide">
      <my-play-list v-if="playListBol"></my-play-list>
    </transition>
    <audio-controller></audio-controller>
  </div>
</template>
<script>
import TabBar from './components/TabBar/TabBar'
import AudioController from './components/AudioController/AudioController'
import PlayerFooter from './components/Common/PlayerFooter.vue'
import MyPlayList from './components/Common/MyPlayList.vue'
export default {
  name: 'app',
  components: {
    TabBar,
    AudioController,
    PlayerFooter,
    MyPlayList
  },
  // 一打开页面时, 获取个性推荐的轮播
  created () {
    this.$store.dispatch('getHome')
    this.$store.dispatch('getHighquality')
  },
  data () {
    return {
      url: ''
    }
  },
  methods: {
    // 关闭显示
    close () {
      this.$store.commit('CHANGEPLAYLISTBOL')
    }
  },
  computed: {
    tabBarShow () {
      return this.$store.state.tabBarShow
    },
    // 播放列表长度
    playListLen () {
      return this.$store.state.playList.list.length
    },
    // 播放列表显示隐藏
    playListBol () {
      return this.$store.state.playListBol
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.mask{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 98;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 1;
}
.slide-enter-active {
  transition: transform .3s ease;
}
.slide-leave-active {
  transition: transform .3s ease;
}
.slide-enter, .slide-leave-to{
  transform: translateY(200px);
}
</style>

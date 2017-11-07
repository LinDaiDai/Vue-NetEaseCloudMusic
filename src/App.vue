<template>
  <div id="app">
    <tab-bar v-if="tabBarShow"></tab-bar>
    <transition name="slide">
      <keep-alive>
        <router-view v-if="!$route.meta.notKeepAlive"></router-view>
      </keep-alive>
      <router-view v-if="$route.meta.notKeepAlive"></router-view>
    </transition>
    <player-footer v-if="playListLen > 0"></player-footer>
    <my-play-list v-if="playListBol"></my-play-list>
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
</style>

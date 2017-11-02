/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
// 异步引入方式,只有在访问的时候才会加载
const MyMusic = resolve => require(['../pages/MyMusic/MyMusic.vue'], resolve)
const NewlyPlay = resolve => require(['../pages/MyMusic/NewlyPlay.vue'], resolve)
const Home = resolve => require(['../pages/Home/Home.vue'], resolve)
const Friend = resolve => require(['../pages/Friend/Friend.vue'], resolve)
const Search = resolve => require(['../pages/Search/Search.vue'], resolve)
const Album = resolve => require(['../pages/Search/Album.vue'], resolve)
const Singer = resolve => require(['../pages/Search/Singer.vue'], resolve)
const Single = resolve => require(['../pages/Search/Single.vue'], resolve)
const SongSheet = resolve => require(['../pages/Search/SongSheet.vue'], resolve)
const Personality = resolve => require(['../pages/Home/Personality/Personality.vue'], resolve)
const PlayList = resolve => require(['../pages/Home/PlayList/PlayList.vue'], resolve)
const RadioStation = resolve => require(['../pages/Home/RadioStation/RadioStation.vue'], resolve)
const RankingList = resolve => require(['../pages/Home/RankingList/RankingList.vue'], resolve)
const Login = resolve => require(['../pages/Login/Login.vue'], resolve)
const LoginPhone = resolve => require(['../pages/Login/LoginPhone.vue'], resolve)
const Resigter = resolve => require(['../pages/Login/Resigter.vue'], resolve)
const Player = resolve => require(['../pages/Play/Player.vue'], resolve)
Vue.use(Router)
export default new Router({
mode: 'history',
routes: [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      notKeepAlive: false
      },
    children: [
      {
        path: '/',
        name: 'personality',
        component: Personality
      },
      {
        path: '/playlist',
        name: 'PlayList',
        component: PlayList
      },
      {
        path: '/radiostation',
        name: 'Radiostation',
        component: RadioStation
      },
      {
        path: '/rankinglist',
        name: 'RankingList',
        component: RankingList
      },
    ]
  },
  {
    path: '/mymusic',
    name: 'MyMusic',
    component: MyMusic,
    meta: {
      notKeepAlive: false
    },
  },
  {
    path: 'newlyplay',
    name: 'NewlyPlay',
    component: NewlyPlay,
    meta: {
      notKeepAlive: false
    }
  },
  {
    path: '/friend',
    name: 'Friend',
    component: Friend,
    meta: {
      notKeepAlive: false
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      notKeepAlive: false
    },
    children: [
      {
        path: '/',
        name: 'Album',
        component: Album
      },
      {
        path: '/singer',
        name: 'Singer',
        component: Singer
      },
      {
        path: '/single',
        name: 'Single',
        component: Single
      },
      {
        path: '/songsheet',
        name: 'SongSheet',
        component: SongSheet
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      notKeepAlive: false
    },
  },
  {
    path: '/loginphone',
    name: 'LoginPhone',
    component: LoginPhone,
    meta: {
      notKeepAlive: false
    }
  },
  {
    path: '/resigter',
    name: 'Resigter',
    component: Resigter,
    meta: {
      notKeepAlive: false
    }
  },
  {
    path: '/player',
    name: 'Player',
    component: Player,
    meta: {
      notKeepAlive: false
    }
  }
  ]
})
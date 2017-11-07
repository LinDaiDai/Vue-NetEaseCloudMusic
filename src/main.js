import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from 'vuex'
import axios from 'axios'
import store from './store/index'
import MintUI from 'mint-ui'
// 头部进度条插件->用于切换页面时候
// import NProgress from 'nprogress'
import 'mint-ui/lib/style.css'
// 引入nprogress.css
// import 'nprogress/nprogress.css'
// 引入通用样式
import './assets/styles/index.less'
// 引入iconfont
import './assets/iconfont/iconfont.css'
// rem初始化
import './assets/reset.js'
// 将axios添加到vue的原型中
Vue.prototype.$http = axios
Vue.use(vuex)
Vue.use(MintUI)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  // NProgress.start()
  if (to.path === '/' || to.path === '/home' || to.path === '/friend' || to.path === '/home/playlist' || to.path === '/home/radiostation' || to.path === '/home/rankinglist') {
    store.state.tabBarShow = true
  } else {
    store.state.tabBarShow = false
  }
  next()
})
// router.afterEach((to, from) => {
//   NProgress.done()
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

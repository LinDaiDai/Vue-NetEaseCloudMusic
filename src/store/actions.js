import http from 'axios'
export default {
  getHome ({commit}) {
    let homeData = {}
    // 首页轮播
    http.get('/api/banner')
      .then(data => {
        homeData.banners = data.data.banners
      })
    // 首页推荐歌单
    http.get('/api/personalized')
      .then(data => {
        homeData.personalized = data.data.result
      })
    // 首页独家放送
    http.get('./api/personalized/privatecontent')
      .then(data => {
        homeData.privatecontent = data.data.result
      })
    // 首页推荐MV
    http.get('./api/personalized/mv')
      .then(data => {
        homeData.personalizedMv = data.data.result
      })
    // 首页主播电台
    http.get('./api/personalized/djprogram')
    .then(data => {
      homeData.mv = data.data.result
    })
    commit('GETHOME', homeData)
  },
  // 用户登录
  login (store, obj) {
    let url = '/api/login/cellphone?phone=' + obj.phone + '&password=' + obj.password
    return http.get(url)
      .then(res => {
        if (res.data.code !== 502) {
          store.commit('GETUSERINFO', res.data)
          store.state.loginBol = true
          return {status: true, msg: '登录成功'}
        } else {
          return {status: false, msg: '密码错误'}
        }
      })
  },
  // 用户登录后我的音乐页(mymusic)信息
  getMyMusic (store) {
    let userInfo = store.state.userInfo
    let userId = userInfo.profile.userId
    let myMusic = {code: 200}
    // 1.最近播放
    let newlyPlayUrl = '/api/user/record?uid=' + userId + '&type=1'
    http.get(newlyPlayUrl)
      .then(data => {
        // 定义数组用于盛放筛选后的信息
        let songs = []
        // 遍历到提取的信息, 进行筛选
        for (var i = 0; i < data.data.weekData.length; i++) {
          let thisSong = data.data.weekData[i].song
          let ars = []
          // 遍历演唱者
          for (var j = 0; j < thisSong.ar.length; j++) {
            // 若演唱者多于3个, 则只取3个
            if (j === 2) {
              break
            }
            ars.push(thisSong.ar[j].name)
          }
          ars = ars.join('/')
          // 创建一个对象用于盛放一首歌的信息
          let song = {
            id: thisSong.id,
            name: thisSong.name,
            artists: ars,
            album: null,
            mp3Url: '',
            mvid: thisSong.mv,
            picUrl: ''
          }
          songs.push(song)
        }
        myMusic.newlyPlay = songs
      })
    // 2.我的电台
    let myRadioUrl = '/api/user/dj?uid=' + userId
    http.get(myRadioUrl)
      .then(data => {
        myMusic.myRadio = data.data.programs
      })
    // 3.我的收藏和创建的歌单(数字)
    let mycollectUrl = './api/user/subcount?uid=' + userId
    http.get(mycollectUrl)
      .then(data => {
        myMusic.mycollectNum = data.data.djRadioCount
        myMusic.createdPlaylistCount = data.data.createdPlaylistCount
      })
    // 4.获取用户歌单
    let userPlayListUrl = '/api/user/playlist?uid=' + userId
    let userplayList = []
    http.get(userPlayListUrl)
      .then(data => {
        // 用户歌单信息
        userplayList = data.data.playlist
        // 我喜欢的音乐(参数: 歌单id)
        let myLikeUrl = '/api/playlist/detail?id=' + userplayList[0].id
        let myLikeList = []
        // 5.获取喜欢的音乐
        http.get(myLikeUrl)
          .then(data => {
            if (data.data.playlist !== undefined) {
              myLikeList = data.data.playlist.tracks
              myMusic.myLikeList = myLikeList
              // 将用户最近播放, 我的电台, 我的收藏和创建歌单(数字),喜欢的音乐保存至vuex中
              store.commit('GETUSERHOME', myMusic)
              console.log(myMusic)
              return {status: true, msg: '保存信息成功'}
            }
          })
      })
  },
  // 获取搜索结果
  getResules (store, data) {
    let url = '/api/search?keywords=' + data + '&limit=10'
    http.get(url)
      .then(res => {
        if (res.data !== undefined) {
          console.log(res.data.result.songs)
          store.commit('GETRESULES', res.data.result.songs)
        }
      })
  },
  // 用户点击搜索结果
  goResult (store, result) {
    let url = '/api/search?keywords=' + result
    return http.get(url)
      .then(res => {
        if (res.data !== undefined) {
          console.log(res.data.result.songs)
          // 拿到的是所有结果的数据, 对数据进行筛选, 留下我们想要的
          let allData = res.data.result.songs
          // 筛选后的数据
          let songs = []
          for (var i = 0; i < allData.length; i++) {
            // 演唱者集合
            let artists = []
            // 遍历所以的演唱者并用'/'分隔
            for (var j = 0; j < allData[i].artists.length; j++) {
              if (j === 2) {
                break
              }
              artists.push(allData[i].artists[j].name)
            }
            artists = artists.join('/')
            // 创建单个歌曲对象
            let song = {
              id: allData[i].id,
              singerId: allData[i].artists[0].id,
              name: allData[i].name,
              artists: artists,
              album: allData[i].album,
              mp3Url: allData[i].mp3Url,
              mvid: allData[i].mvid,
              picUrl: ''
            }
            songs.push(song)
          }
          console.log(songs)
          store.commit('GORESULT', songs)
          return {status: true, msg: '获取结果成功'}
        } else {
          return {status: false, msg: '获取结果失败'}
        }
      })
  },
  // 获取用户点击搜索结果后歌手信息
  getSingers (store) {
    // 获取用户点击的那个结果列表
    let result = store.state.result
    // 获取点击的那个结果第一个歌手的id
    let singerId = result[0].singerId
    if (singerId !== undefined) {
      // 获取相似歌手
      let url = '/api/simi/artist?id=' + singerId
      return http.get(url)
        .then(({data}) => {
          store.commit('GETSINGERS', data.artists)
          return {status: true, msg: '获取歌手列表信息成功'}
        })
    } else {
      return {status: false, msg: '获取失败'}
    }
  },
  // 注册播放相关的事件
  registerPlayEvent ({ dispatch, commit, state }) {
    // 1.注册歌曲结束后自动播放下一首事件
    state.audioElement.onended = function () {
      // 先关闭音乐
      state.playStatus = false
      // 判断是不是单曲循环
      if (state.playMode !== 'singleCycle') {
        dispatch('nextControl')
      } else {
        // 若为单曲循环, 则在1.5s后继续播放这首歌
        var timer = setTimeout(function () {
          commit('playControl')
          clearTimeout(timer)
        }, 1500)
      }
    }
    // 2.加载完元数据后, 设置当前音乐总时长
    state.audioElement.onloadedmetadata = function () {
      state.songDuration = this.duration
    }
    // 3.当需要为下一帧进行缓冲时
    state.audioElement.onwaiting = function () {
      state.isBuffering = true
    }
    // 4.当可以播放或者足够缓冲时
    state.audioElement.oncanplay = function () {
      state.isBuffering = false
    }
    // 5.当前播放位置发生改变时, 获取当前播放位置
    state.audioElement.ontimeupdata = function () {
      state.songCurrentTime = this.currentTime
      // 同时更新改变歌词的位置
    }
  },
  // 播放点击的这一首
  playThis (store, payload) {
    // 将点击的这首歌添加至播放列表
    store.commit('ADDSONGMSG', payload)
    // 获取刚刚添加到播放列表的这首歌的下标(也就是数组最后一位)
    let index = store.state.playList.list.length - 1
    // 调用'从在播放的列表中选中播放'
    store.dispatch('playFromPlayList', index)
  },
  // 播放下一首
  nextControl ({dispatch, state, commit}) {
    // 先判断当前的播放状态, 若是在播放, 则先暂停
    if (state.playStatus) {
      commit('PAUSECONTROL')
    }
    // 将播放时间调为0
    state.audioElement.currentTime = 0
    // 只要不是随机播放, 则进行下一首音频播放
    if (state.playMode !== 'listRandom') {
      // 判断若播放的是最后一个音频
      if (state.songMsgIndex === state.playList.list.length - 1) {
        // 将第一个音频设定为当前播放的音频
        dispatch('setSongMsg', state.playList.list[0])
        state.songMsgIndex = 0
      } else {
        dispatch('setSongMsg', state.playList.list[state.songMsgIndex + 1])
        state.songMsgIndex += 1
      }
    } else {
      // 随机播放时, 分发随机播放
      dispatch('randomPlay')
    }
  },
  // 播放上一首
  preControl ({state, commit, dispatch}) {
    // 先判断当前的播放状态, 若是在播放, 则先暂停
    if (state.playStatus) {
      commit('PAUSECONTROL')
    }
    // 将播放时间调为0
    state.audioElement.currentTime = 0
    // 只要不是随机播放, 则进行下一首音频播放
    var length = state.playList.list.length
    if (state.playMode !== 'listRandom') {
      // 判断若播放的是第一个音频
      if (state.songMsgIndex === 0) {
        // 将最后一个音频设定为当前播放的音频
        dispatch('setSongMsg', state.playList.list[length - 1])
        state.songMsgIndex = length - 1
      } else {
        dispatch('setSongMsg', state.playList.list[state.songMsgIndex - 1])
        state.songMsgIndex -= 1
      }
    } else {
      // 随机播放时, 分发随机播放
      dispatch('randomPlay')
    }
  },
  // 随机播放
  randomPlay ({dispatch, state, commit}) {
    // 生成一个随机的下标
    let randomIndex = this.randomInt(0, state.playList.list.length - 1)
    // 判断若是生成的下标为当前播放的下标, 防止随机到当前播放的音频
    if (randomIndex === state.songMsgIndex) {
      return dispatch('randomPlay')
    }
    dispatch('setSongMsg', state.playList.list[randomIndex])
    state.songMsgIndex = randomIndex
  },
  // 从在播放的列表中选中播放
  playFromPlayList (store, index) {
    store.dispatch('setSongMsg', store.state.playList.list[index])
    store.state.songMsgIndex = index
  },
  // 更改音频时, 进行播放
  setSongMsg (store, payload) {
    store.state.songMsg = payload
    let picUrl = '/api/song/detail?ids=' + payload.id
    http.get(picUrl)
      .then(({data}) => {
        if (data.code === 200) {
          store.commit('SETPICURL', data.songs[0].al.picUrl)
        }
      })
    let url = '/api/music/url?id=' + payload.id
    http.get(url)
      .then(({data}) => {
        if (data.code === 200) {
          store.state.audioElement.src = data.data[0].url
          console.log(store.state.playList, store.state.songMsg)
          store.commit('PLAYCONTROL')
          // 异步获取歌词
        }
      })
  },
  /**
   *定义生成范围的随机数
   * @param 最小范围 from
   * @param 最大范围 to
   */
  randomInt (from, to) {
    return parseInt(Math.random() * (to - from + 1) + from)
  }
}

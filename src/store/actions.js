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
      homeData.code = 200
    })
    commit('GETHOME', homeData)
  },
  // 首页私人FM
  getFm (store) {
    let url = '/api/personal_fm'
    return http.get(url)
      .then(({data}) => {
        if (data.code === 200) {
          let lists = data.data
          let songs = {code: 200, list: []}
          for (var i = 0; i < lists.length; i++) {
            let ars = []
            for (let j = 0; j < lists[i].artists.length; j++) {
              if (j === 2) {
                break
              }
              ars.push(lists[i].artists[j].name)
            }
            ars = ars.join('/')
            let song = {
              id: lists[i].id, // 歌曲id
              name: lists[i].name, // 歌名
              artists: ars,         // 演唱者
              album: lists[i].album.name // 专辑名
            }
            songs.list.push(song)
          }
          store.commit('GETFM', songs)
          console.log(songs)
          return {status: true, msg: '获取数据成功'}
        }
      })
  },
  // 首页每日推荐
  getRecommendSong (store) {
    let url = '/api/recommend/songs'
    http.get(url)
      .then(({data}) => {
        if (data.code === 200) {
          let recommend = data.recommend
          let recommendSong = {code: 200, list: []}
          for (var i = 0; i < recommend.length; i++) {
            let ars = []
            for (let j = 0; j < recommend[i].artists.length; j++) {
              if (j === 2) {
                break
              }
              ars.push(recommend[i].artists[j].name)
            }
            ars = ars.join('/')
            let list = {
              id: recommend[i].id, // 歌曲id
              name: recommend[i].name, // 歌名
              artists: ars,         // 演唱者
              album: recommend[i].album.name // 专辑名
            }
            recommendSong.list.push(list)
          }
          store.commit('GETRECOMMENDSONG', recommendSong)
        }
      })
  },
  // 首页歌单精品歌单
  getHighquality (store) {
    let url = '/api/top/playlist/highquality'
    http.get(url)
      .then(({data}) => {
        if (data.code === 200) {
          let playlists = data.playlists
          let filterPlaylists = {code: 200, list: []}
          for (var i = 0; i < playlists.length; i++) {
            // 若播放次数和收藏次数大于10000
            let playCount = playlists[i].playCount
            if (playCount >= 10000) {
              playCount = parseInt(playCount / 10000) + '万'
            }
            let subscribedCount = playlists[i].subscribedCount
            if (subscribedCount >= 10000) {
              subscribedCount = parseInt(subscribedCount / 10000) + '万'
            }
            let playlist = {
              id: playlists[i].id,  // 歌单id
              name: playlists[i].name,   // 歌单名
              coverImgUrl: playlists[i].coverImgUrl,  // 背景图片
              description: playlists[i].description,  // 歌单描述
              tags: playlists[i].tags,  // 分类
              tag: playlists[i].tag,    // 分类标签
              playCount: playCount, // 播放次数
              subscribedCount: subscribedCount,  // 收藏次数
              shareCount: playlists[i].shareCount,  // 分享次数
              commentCount: playlists[i].commentCount,  // 评论数
              copywriter: playlists[i].copywriter,  // 注释
              creator: {  // 创建者
                avatarUrl: playlists[i].creator.avatarUrl,  // 头像
                userId: playlists[i].creator.userId,  // 创建者id
                nickname: playlists[i].creator.nickname  // 名
              },
              list: []    // 具体的歌单
            }
            filterPlaylists.list.push(playlist)
          }
          store.commit('GETHIGHQUALITY', filterPlaylists)
        }
      })
  },
  // 歌单详情
  getDetailList ({commit}, playList) {
    let url = '/api/playlist/detail?id=' + playList.id
    http.get(url)
      .then(({data}) => {
        if (data.code === 200) {
          let detailList = playList
          detailList.code = 200
          let tracks = data.playlist.tracks
          for (let i = 0; i < tracks.length; i++) {
            let ars = []
            for (let j = 0; j < tracks[i].ar.length; j++) {
              if (j === 2) {
                break
              }
              ars.push(tracks[i].ar[j].name)
            }
            ars = ars.join('/')
            let list = {
              id: tracks[i].id, // 歌曲id
              name: tracks[i].name, // 歌名
              artists: ars,         // 演唱者
              album: tracks[i].al.name // 专辑名
            }
            detailList.list.push(list)
          }
          commit('GETDETAILLIST', detailList)
        }
      })
  },
  // 获取所有排行榜信息
  getAllRanking (store) {
    let allRanking = {code: 200, rankings: []}
    for (var i = 0; i < 21; i++) {
      let idx = i
      // 参数idx为对应的排行榜id
      let url = '/api/top/list?idx=' + idx
      http.get(url)
        .then(({data}) => {
          let result = data.result
          // 创建单个排行榜对象
          let ranking = {code: 200, list: []}
          ranking.id = result.id
          ranking.name = result.name
          ranking.coverImgUrl = result.coverImgUrl
          ranking.shareCount = result.shareCount
          // 若播放次数和收藏次数大于10000
          let playCount = result.playCount
          if (playCount >= 10000) {
            playCount = parseInt(playCount / 10000) + '万'
          }
          let subscribedCount = result.subscribedCount
          if (subscribedCount >= 10000) {
            subscribedCount = parseInt(subscribedCount / 10000) + '万'
          }
          let commentCount = result.commentCount
          if (commentCount >= 10000) {
            commentCount = parseInt(commentCount / 10000) + '万'
          }
          ranking.playCount = playCount
          ranking.subscribedCount = subscribedCount
          ranking.commentCount = commentCount
          ranking.commentThreadId = result.commentThreadId
          // 最近更新时间
          let updateTime = result.updateTime
          updateTime = new Date(updateTime)
          let month = updateTime.getMonth()
          let date = updateTime.getDate()
          updateTime = month + '月' + date + '日'
          ranking.updateTime = updateTime
          // list(排行榜中的歌单)
          for (var i = 0; i < result.tracks.length; i++) {
            let track = result.tracks[i]
            // 获取演唱者
            let ars = []
            for (var j = 0; j < track.artists.length; j++) {
              if (j === 2) {
                break
              }
              ars.push(track.artists[j].name)
            }
            ars = ars.join('/')
            let song = {
              id: track.id,
              name: track.name,
              artists: ars,
              album: track.album.name
            }
            // 将每首歌添加至单个排行榜歌单中
            ranking.list.push(song)
          }
          // 将单个排行榜添加至排行榜集合中
          allRanking.rankings.push(ranking)
        })
    }
    store.commit('GETRANKINGS', allRanking)
  },
  // 设置详情排行榜
  setDetailRanking (store, id) {
    let rankings = store.state.allRanking.rankings
    for (var i = 0; i < rankings.length; i++) {
      if (rankings[i].id === id) {
        store.commit('SETDETAILRANKING', rankings[i])
        return
      }
    }
  },
  // 获取主播电台
  getRadio ({commit}) {
    let url = '/api/personalized/djprogram'
    http.get(url)
      .then(({data}) => {
        if (data.code === 200) {
          let allRadio = {code: 200, list: []}
          for (var i = 0; i < data.result.length; i++) {
            let oneData = data.result[i]
            let radio = {
              rid: oneData.program.radio.id,
              picUrl: oneData.program.radio.picUrl,
              rcmdText: oneData.program.radio.rcmdText,
              name: oneData.program.radio.name
            }
            allRadio.list.push(radio)
          }
          console.log(allRadio)
          commit('GETRADIO', allRadio)
        }
      })
  },
  // 获取电台详情
  getDetailRadio ({commit}, rid) {
    let url = '/api/dj/detail?rid=' + rid
    return http.get(url)
      .then(({data}) => {
        if (data.code === 200) {
          let djRadio = data.djRadio
          // 评论集合
          let commentDatas = []
          for (var i = 0; i < djRadio.commentDatas.length; i++) {
            let comment = {
              nickname: djRadio.commentDatas[i].userProfile.nickname,
              avatarUrl: djRadio.commentDatas[i].userProfile.avatarUrl,
              content: djRadio.commentDatas[i].content,
              programName: djRadio.commentDatas[i].programName
            }
            commentDatas.push(comment)
          }
          // 订阅人数
          let subCount = djRadio.subCount
          if (subCount >= 10000) {
            subCount = parseInt(subCount / 10000) + '万'
          }
          let radio = {
            id: djRadio.dj.id,
            avatarUrl: djRadio.dj.avatarUrl,
            name: djRadio.name,
            nickname: djRadio.dj.nickname,
            picUrl: djRadio.picUrl,
            subCount: subCount,
            programCount: djRadio.programCount,
            category: djRadio.category,
            desc: djRadio.desc,
            commentDatas: commentDatas
          }
          console.log(radio)
          commit('GETDETAILRADIO', radio)
          return {status: true}
        }
      })
  },
  // 获取电台节目
  getAct ({commit}, rid) {
    let url = '/api/dj/program?rid=' + rid
    http.get(url)
      .then(({data}) => {
        if (data.code === 200) {
          let programs = data.programs
          let actRadio = {code: 200, list: []}
          for (var i = 0; i < programs.length; i++) {
            let act = {
              id: programs[i].mainSong.id,
              name: programs[i].mainSong.name
            }
            actRadio.list.push(act)
          }
          commit('GETACTRADIO', actRadio)
        }
      })
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
        userplayList = data.data.playlist[0]
        // 用户me页背景图片
        let backgroundUrl = userplayList.backgroundUrl
        store.state.userInfo.backgroundUrl = backgroundUrl
        // 我喜欢的音乐封面
        let coverImgUrl = userplayList.coverImgUrl
        // 播放次数
        let playCount = userplayList.playCount
        // 歌单id(743364458)
        let userplayListId = userplayList.id
        myMusic.myLikeList = {}
        myMusic.myLikeList.coverImgUrl = coverImgUrl
        myMusic.myLikeList.playCount = playCount
        myMusic.myLikeList.listId = userplayListId
        // 我喜欢的音乐(参数: 歌单id)
        let myLikeUrl = '/api/playlist/detail?id=' + userplayListId
        let list = []
        // 5.获取喜欢的音乐
        http.get(myLikeUrl)
          .then(data => {
            if (data.data.code === 200) {
              let tracks = data.data.playlist.tracks
              for (var i = 0; i < tracks.length; i++) {
                // 定义数组存放歌手信息
                let artists = []
                for (var j = 0; j < tracks[i].ar.length; j++) {
                  // 若歌手大于2, 则只取前俩个
                  if (j === 2) {
                    break
                  }
                  artists.push(tracks[i].ar[j].name)
                }
                artists = artists.join('/')
                // 定义对象表示每一首歌
                let song = {
                  id: tracks[i].id,
                  name: tracks[i].name,
                  artists: artists,
                  album: tracks[i].al,
                  del: tracks[i].name + '-' + tracks[i].al.name,
                  mp3Url: '',
                  mvid: tracks[i].mv,
                  picUrl: ''
                }
                // 将每首歌存到数组中
                list.push(song)
              }
              myMusic.myLikeList.list = list
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
          commit('PLAYCONTROL')
          clearTimeout(timer)
        }, 1500)
      }
    }
    // 2.加载完元数据后, 设置当前音乐总时长
    state.audioElement.onloadedmetadata = function () {
      state.songDuration = this.duration
      console.log(state.songDuration)
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
    state.audioElement.ontimeupdate = function () {
      state.songCurrentTime = this.currentTime
      // 同时更新改变歌词的位置
      commit('SETCURRENTLYRICARRINDEX', this.currentTime)
    }
  },
  // 全部播放
  playAll ({dispatch, state, commit}, payload) {
    // 先判断当前的播放状态, 若是在播放, 则先暂停
    if (state.playStatus) {
      commit('PAUSECONTROL')
    }
    // 将播放时间调为0
    state.audioElement.currentTime = 0
    // 将当前播放的列表清空
    commit('RESETPLAYLIST')
    // 将传进来的播放列表设定为当前播放列表
    let playList = {
      id: 0, //  类型不为搜索的歌单ID
      type: 'list', // 当前播放列表来源 { list: 歌单列表, search: 搜索列表}
      list: payload // 播放列表
    }
    commit('SETPLAYLIST', playList)
    console.log(state.playList)
    // 从当前播放列表的第一首歌开始播放
    dispatch('playFromPlayList', 0)
  },
  // 播放点击的这一首
  playThis (store, payload) {
    // 先判断点击的这首歌在不在当前播放的列表中
    let playList = store.state.playList.list
    for (var i = 0; i < playList.length; i++) {
      // 若是有歌曲id相同, 则表示在, 只需将当前播放的歌曲调至这个位置就行了
      if (payload.id === playList[i].id) {
        // 调用'从在播放的列表中选中播放'
        store.dispatch('playFromPlayList', i)
        return {status: true, msg: '切换歌曲成功'}
      }
    }
    // 若歌曲不在播放列表中则重新添加进去
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
    let randomIndex = dispatch('randomInt', 0, state.playList.list.length - 1)
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
    // 将当前播放的歌曲设为更改的这个歌曲
    store.state.songMsg = payload
    // 初始化歌词的位置
    store.state.lyricTop = 17
    // 初始化歌词组
    store.state.lyricArr = []
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
          store.dispatch('loadLyric', payload.id)
        }
      })
  },
  // 加载歌词
  loadLyric ({state, commit}, lyricId) {
    // 参数, 歌曲id
    let url = '/api/lyric?id=' + lyricId
    http.get(url)
      .then(({data}) => {
        if (data.code === 200) {
          console.log(data)
          let timeReg = /\[\d\d:\d\d.?\d*\]/g // 匹配时间段, 如[00:20.060]
          let timeFormatReg = /\d\d:\d\d.?\d*/g // 匹配必要的时间
          let lyric = [] // 歌词
          let lyricTranslate = [] // 翻译
          var times
          // 判断若是纯音乐
          if (data.nolyric) {
            state.lyricArr.push({
              lyric: '纯音乐, 请欣赏',
              nolyric: true
            })
            state.currentLyricArrIndex = 0
            return true
          }
          if (data.uncollected) {
            state.lyricArr.push({
              lyric: '抱歉，暂无歌词',
              uncollected: true
            })
            state.currentLyricArrIndex = 0
            return true
          }
          times = data.lrc.lyric.match(timeReg) // 时间段
          if (times === null) {
            state.lyricArr.push({
              lyric: '抱歉，该歌词不支持滚动',
              unScroll: true
            })
            state.currentLyricArrIndex = 0
            return true
          }
          // 将获取到的歌词做处理
          data.lrc.lyric.split('\n').forEach(val => {  // 1.先将获取的歌词以'\n'为界限分隔
            if (timeReg.test(val)) {  // 用正则以时间为分隔
              lyric.push({
                lyric: val.replace(timeReg, ''),  // 存储只有歌词的字符串
                time: val                         // 存储带有时间和歌词的字符串
              })
            }
          })
          lyric.forEach((value, index) => {
            value.times = value.time.match(timeFormatReg)[0]  // 使用时间正则只取时间如00:30.630
            let min = value.times.split(':')[0] // 获取分钟如00
            let sec = value.times.split(':')[1] // 获取秒钟如30.63
            value.time = min * 60 + sec * 1     // 设置时间如30.63
          })
          // 获取翻译, 根据原语音时间来匹配对应的翻译
          if (data.tlyric.lyric != null) {
            lyricTranslate = data.tlyric.lyric.split('\n')
            for (var i = 0; i < lyric.length; i++) {
              let reg = new RegExp(lyric[i].times)  // 将时间当成正则来进行匹配, 与\[\d\d:\d\d\.?\d*\]保持一致
              for (var j = 0; j < lyricTranslate.length; j++) {
                if (reg.test(lyricTranslate[j])) {  // 匹配对应时间段的翻译
                  lyric[i].translateLyric = lyricTranslate[j].replace(timeReg, '') // 去除时间
                }
              }
            }
          }
          // 过滤空白歌词
          lyric.forEach((val, index) => {
            if (val.lyric === '') {
              lyric.splice(index, 1)
            }
          })
          commit('SETLYRICARR', lyric)
          console.log(lyric)
          state.currentLyricArrIndex = 0
        }
      })
  },
  // 获取歌曲评论
  getComment (store, payload) {
    // 利用歌曲的id获取评论
    let url = '/api/comment/music?id=' + payload.id
    return http.get(url)
      .then(({data}) => {
        // 创建变量用来盛放过滤后的评论信息(热门评论和评论)
        let filterComments = {code: 200, hotComments: [], comments: []}
        // 获取热门评论
        for (var i = 0; i < data.hotComments.length; i++) {
          let likedCount = data.hotComments[i].likedCount
          if (likedCount >= 10000) {
            likedCount = parseInt(likedCount / 10000) + '万'
          }
          let time = data.hotComments[i].time
          time = new Date(time)
          let year = time.getFullYear()
          let month = time.getMonth()
          let date = time.getDate()
          time = year + '年' + month + '月' + date + '日'
          let comment = {
            commentId: data.hotComments[i].commentId,
            liked: data.hotComments[i].liked,
            likedCount: likedCount,
            time: time,
            content: data.hotComments[i].content,
            user: {
              userId: data.hotComments[i].user.userId,
              nickname: data.hotComments[i].user.nickname,
              avatarUrl: data.hotComments[i].user.avatarUrl
            }
          }
          filterComments.hotComments.push(comment)
        }
        // 获取评论
        for (var j = 0; j < data.comments.length; j++) {
          let comment = {
            commentId: data.comments[j].commentId,
            liked: data.comments[i].liked,
            likedCount: data.comments[j].likedCount,
            time: data.comments[j].time,
            content: data.comments[j].content,
            user: {
              userId: data.comments[j].user.userId,
              nickname: data.comments[j].user.nickname,
              avatarUrl: data.comments[j].user.avatarUrl
            }
          }
          filterComments.comments.push(comment)
        }
        let allLength = filterComments.hotComments.length + filterComments.comments.length
        filterComments.allLength = allLength
        store.commit('GETCOMMENT', filterComments)
        return {status: true, msg: '获取歌词成功'}
      })
  },
  // 给评论点赞
  likeComment (store, item) {
    let liked = !item.liked
    let songMsgId = store.state.songMsg.id
    // t为点赞参数, 1为点赞, 0为取消点赞
    let t = 1
    if (liked) {
      t = 1
    } else {
      t = 0
    }
    // id:歌曲id, cid:评论id, type: 音频类型 0: 歌曲, 1: mv, 2: 歌单, 3: 专辑, 4: 电台
    let url = '/api/comment/like?id=' + songMsgId + '&cid=' + item.commentId + '&t=' + t + '&type=0'
    return http.get(url)
      .then(({data}) => {
        if (data.code === 200) {
          // store.commit('LIKECOMMENT', item)
          return {status: true, msg: '点赞成功'}
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

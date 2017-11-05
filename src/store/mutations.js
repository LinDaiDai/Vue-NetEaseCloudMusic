export default {
  // 获取主页信息
  GETHOME (state, data) {
    state.homeData = data
  },
  // 控制我的页面显示隐藏
  CHANGEMEBOL (state) {
    state.meBol = !state.meBol
  },
  // 控制播放列表显示隐藏
  CHANGEPLAYLISTBOL (state) {
    state.playListBol = !state.playListBol
  },
  // 获取用户信息
  GETUSERINFO (state, data) {
    state.userInfo = data
  },
  // 获取用户我的音乐页信息
  GETUSERHOME (state, data) {
    state.myMusic = data
  },
  // 获取搜索结果
  GETRESULES (state, data) {
    state.results = data
  },
  // 获取用户点击的搜索结果
  GORESULT (state, data) {
    state.result = data
  },
  // 获取用户点击搜索结果后歌手信息
  GETSINGERS (state, data) {
    state.singers = data
  },
  // 设置音频为全局控件
  SETAUDIOELEMENT (state) {
    state.audioElement = document.getElementById('audioElement')
  },
  // 音频播放
  PLAYCONTROL (state) {
    state.audioElement.play()
    state.playStatus = true
  },
  // 音频暂停
  PAUSECONTROL (state) {
    state.audioElement.pause()
    state.playStatus = false
  },
  // 设置当前播放时间
  SETSONGCURRENTTIME (state, time) {
    state.songCurrentTime = time
    state.audioElement.currentTime = time
  },
  // 设置当前正在播放的音频总时长
  SETSONGDURATION (state, time) {
    state.songDuration = time
  },
  // 设置正在播放的音频在列表中的索引
  SETSONGMSGINDEX (state, index) {
    state.songMsgIndex = index
  },
  // 设置当前播放的歌曲的歌词
  SETLYRICARR (state, lyricArr) {
    state.lyricArr = lyricArr
  },
  // 设置当前播放的歌词下标
  SETCURRENTLYRICARRINDEX (state, time) {
    // 歌词为空, 不做处理
    if (state.lyricArr.length === 0) {
      return false
    }
    // 纯音乐
    if (state.lyricArr[0].noLyric) return
    // 暂时无歌词
    if (state.lyricArr[0].uncollected) return
    // 不支持滚动
    if (state.lyricArr[0].unScroll) return
    let length = state.lyricArr.length
    for (let i = 0; i < length; i++) {  // 不为最后一句歌词
      if (i !== (length - 1)) {
        if (time > state.lyricArr[i].time && time < state.lyricArr[i + 1].time) {
          state.currentLyricArrIndex = i
          console.log(state.liHeight)
          state.lyricTop = 17 - i * state.liHeight / 12
          console.log(state.lyricTop)
        }
      } else {
        // 最后一句歌词不做处理
      }
    }
  },
  // 设置歌词的高度
  SETLIHEIGHT (state, liHeight) {
    state.liHeight = liHeight
  },
  // 切换播放模式
  CHANGEPLAYMODE (state) {
    //  三种：listCycle（列表循环），listRandom（列表随机）,singleCycle(单曲循环)
    if (state.playMode === 'listCycle') {
      state.playMode = 'listRandom'
    } else if (state.playMode === 'listRandom') {
      state.playMode = 'singleCycle'
    } else {
      state.playMode = 'listCycle'
    }
  },
  // 设置正在播放的列表
  SETPLAYLIST (state, payload) {
    state.playList = payload
  },
  // 设置当前播放的这首歌的封面图片
  SETPICURL (state, picUrl) {
    state.songMsg.picUrl = picUrl
  },
  // 给播放列表添加一个元素
  ADDSONGMSG (state, song) {
    state.playList.list.push(song)
  },
  // 从列表中移除一个元素
  REMOVETHIS (state, index) {
    state.playList.splice(index, 1)
  },
  // 清空播放列表
  RESETPLAYLIST (state) {
    state.playList = {
      id: 0, //  类型不为搜索的歌单ID
      type: 'list', // 当前播放列表来源 { list: 歌单列表, search: 搜索列表}
      list: [] // 播放列表
    }
  }
}

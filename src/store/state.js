export default {
  // 控制tabBar显示隐藏的
  tabBarShow: true,
  // 主页面数据
  homeData: {},
  // 控制用户信息显示
  meBol: false,
  // 用于判断用户是否登录
  loginBol: false,
  // 控制播放列表显示隐藏
  playListBol: false,
  // 存储用户信息
  userInfo: {},
  /**
   * myMusic: 用户我的音乐页信息
   * 数据结构:
   * newlyPlay: 最近播放
   * myRadio: 我的电台
   * mycollectNum: 我的收藏(num)
   * createdPlaylistCount: 创建的歌单(num)
   * myLikeList: 我喜欢的音乐
   * myLikeList数据结构(对象):{
   * listId: 歌单id,
   * coverImgUrl: 我喜欢的音乐封面
   * playCount: 播放次数,
   * list: [
   * id: 歌曲id
   * name: 歌曲名称
   * artists: 演唱歌手
   * album: 专辑信息,
   * del: 演唱歌手-专辑名称,
   * mp3Url: 播放链接,
   * mvid: mv链接id, 0为没有id,
   * picUrl: 封面图片
   *  ]
   * }
   */
  myMusic: {},
  // 搜索结果
  results: [],
  /*
  result: 用户点击的那个搜索结果的单曲列表
  result: [
    {
      id: 歌曲id,
      name: 歌曲名称,
      artists: 演唱歌手,
      album: 专辑信息,
      mp3Url: 播放链接,
      mvid: mv链接id, 0为没有id,
      picUrl: 封面图片
    }
  ]
  */
  result: [],
  // 用户点击的那个搜索结果歌手列表
  singers: [],
  // 歌曲播放状态, true为播放, false为停止
  playStatus: false,
  // 播放模式
  playMode: 'listCycle',
  // 正在播放的列表
  playList: {
    id: 0, //  类型不为搜索的歌单ID
    type: 'list', //  当前播放列表来源类型 { list: 歌单列表, search: 搜索列表}
    list: []
  },
  /*
  songMsg: 当前准备播放或者正在播放的音频的信息
  数据类型:
  id: 歌曲id
  name: 歌曲名称
  artists: 演唱歌手
  album: 专辑信息
  mp3Url: 播放链接
  mvid: mv链接id, 0为没有id,
  picUrl: 封面图片
  */
  // 正在播放的音频在播放列表的下标
  songMsgIndex: 0,
  // 正在播放的音频的信息
  songMsg: {},
  // 音频对象
  audioElement: '',
  // 正在播放的歌的歌词组
  lyricArr: [],
  // 正在播放的音频的播放时间
  songCurrentTime: 0,
  // 正在播放的音频的总时长
  songDuration: 0,
  // 当前音频是否在缓冲状态
  isBuffering: false
}

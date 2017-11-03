<template>
  <div class="playListComponent">
    <transition name="fade">
      <div @click="close" class="mask"></div>
    </transition>
    <transition name="up">
      <div class="playListMain fixed">
        <div class="playListHearder fixed">
          <div class="hearderLeft">
            <div class="playMode"  @click="changePlayMode">
              <div class="playModeIcon iconfont" :class="{'icon-liebiaoxunhuan': playMode === 'listCycle', 'icon-suijibofang': playMode === 'listRandom', 'icon-danquxunhuan': playMode === 'singleCycle'}"></div>
              <div class="playModeName" v-if="playMode === 'listCycle'">列表循环</div>
              <div class="playModeName" v-else-if="playMode === 'listRandom'">随机播放</div>
              <div class="playModeName" v-else>单曲循环</div>
            </div>
          </div>
          <div class="hearderRight">
              <div class="playHandle">
                  <i class="iconfont icon-tongyong_tianjiawenjianjia_icon-"></i>
                  收藏
              </div>
              <div class="playHandle" @click="resetPlayList">
                  <i class="iconfont icon-lajitong"></i>
                  清空
              </div>
          </div>
        </div>
        <div class="playList fixed">
            <ul class="playListUl">
                <li class="playListItem" v-for="(item, index) in playList.list" :key="item.id" >
                    <div class="playListItemMsg" @click="playThis(item, index)">
                        <i class="iconfont icon-iconfontdaohanggonggao" v-if="item.id === songMsg.id"></i>
                        <span class="playMsgName">{{item.name}}</span>
                        <span class="playMsgSinger">-{{item.artists}}</span>
                    </div>
                    <div class="iconfont icon-chuyidong playRemove" @click="removeThis(item, index)"></div>
                </li>
            </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    // 播放模式
    playMode () {
      return this.$store.state.playMode
    },
    // 当前播放的这首歌
    songMsg () {
      return this.$store.state.songMsg
    },
    // 播放列表
    playList () {
      return this.$store.state.playList
    }
  },
  methods: {
    // 关闭显示
    close () {
      this.$store.commit('CHANGEPLAYLISTBOL')
    },
    // 切换播放模式
    changePlayMode () {
      this.$store.commit('CHANGEPLAYMODE')
    },
    // 点击播放这首歌
    playThis (item, index) {
      if (item.id === this.songMsg.id) {
        this.$router.push({
          name: 'Player'
        })
        return
      }
      this.$store.dispatch('playFromPlayList', index)
    },
    // 删除当前歌曲
    removeThis (item, index) {
      if (item.id === this.songMsg.id) {
        // 播放下一首
        this.$store.dispatch('nextControl')
        // 删除此项
        this.$store.commit('REMOVETHISR', index)
      }
    },
    // 清空播放列表
    resetPlayList () {
      this.$store.commit('RESETPLAYLIST')
      this.$store.commit('PAUSECONTROL')
    }
  }
}
</script>
<style lang="less" scoped>
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
.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-active {
    opacity: 0;
}
.up-enter-active, .up-leave-active {
    transition: all .3s;
}
.up-enter, .up-leave-active {
    -webkit-transform: translateY(100%);
    -moz-transform: translateY(100%);
    -ms-transform: translateY(100%);
    -o-transform: translateY(100%);
    transform: translateY(100%);
}
.fixed{
    position: fixed;
}
.playListMain{
    width: 100%;
    background: #ffffff;
    color: #333;
    left: 0;
    right: 0;
    bottom: 0;
    top: 14rem;
    text-align: left;
    z-index: 99;
    .playListHearder{
        height: 4.5rem;
        width: 100%;
        line-height: 4.5rem;
        font-size: 1.4rem;
        top: 14rem;
        border-bottom: 1px solid #ccc;
        .hearderLeft{
            float: left;
            width: 50%;
            height: 100%;
            .icon-suijibofang, .icon-danquxunhuan{
              font-size: 2.5rem;
            }
            .playModeIcon{
                float: left;
                width: 30%;
                height: 100%;
                text-align: center;
                color: #ccc;
            }
            .playModeName{
                float: left;
                height: 100%;
                width: 70%;
            }
        }
        .hearderRight{
            float: left;
            width: 50%;
            height: 100%;
            padding: 1.5rem 1rem;
            line-height: 1.5rem;
            text-align: center;
            .playHandle{
                width: 50%;
                height: 100%;
                float: left;
                i{
                   color: #ccc;
                }
            }
            .playHandle:first-child{
                border-right: 1px solid #ccc;
            }
        }
    }
}
.playList{
    padding-left: 1rem;
    width: 100%;
    top: 18.7rem;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #ccc;
    overflow: auto;
    .playListUl{
       width: 100%;
       .activeList{
           color: rgb(218, 15, 15);
       }
    }
    .playListItem{
        position: relative;
        height: 4.5rem;
        border-bottom: 1px solid #ccc;
        font-size: 1.6rem;
        padding: .5rem 0;
        color: #111;
        .playListItemMsg{
            max-width: 80%;
            height: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            line-height: 3.5rem;
            span{
                max-height: 1.6rem;
                float: left;
            }
            i{
                width: 3rem;
                height: 100%;
                color: rgb(218, 15, 15);
                font-size: 1.6rem;
            }
            .playMsgSinger{
              color: #ccc;
              display: inline-block;
              font-size: 1.2rem;
              height: 100%;
              max-width: 30%;
            }
            .playMsgName{
              display: inline-block;
            //   max-height: 2.5rem;
              max-width: 60%;
            }
        }
        .playRemove{
            position: absolute;
            color: #cccccc;
            height: 100%;
            line-height: 4.5rem;
            font-size: 2.5rem;
            width: 3rem;
            top: 0;
            right: 0;   
        }
    }
}
</style>

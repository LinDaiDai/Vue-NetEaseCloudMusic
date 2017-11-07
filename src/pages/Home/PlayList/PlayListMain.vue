<template>
  <div class="playListMain">
    <div class="classify">
        <div class="classifyBtn">
            全部歌单
            <span class="more"></span>
        </div>
        <div class="classifyMain">
            <ul>
                <li>欧美</li>
                <li>电子</li>
                <li>影视原声</li>
            </ul>
        </div>
    </div>
    <div class="playMenu">
        <ul class="playMenuUl">
            <li class="playMenuLi" v-for="(item, index) in highquality.list" :key="item.id" @click="goDetail(item)">
                <div class="menuImg">
                    <img class="coverImg" :src="item.coverImgUrl" alt="">
                    <div class="creator">
                        <i class="iconfont icon-wszl-copy"></i>
                        {{item.creator.nickname}}
                        <i class="iconfont icon-wujiaoxing2"></i>
                    </div>
                    <div class="playCount">
                        <i class="iconfont icon-erjic"></i>
                        {{item.playCount}}
                    </div>
                </div>
                <div class="menuName twoClamp">
                    {{item.copywriter}}
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    highquality () {
      return this.$store.state.highquality
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goDetail (item) {
      this.$store.dispatch('getDetailList', item)
      this.$router.push('/detailList')
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../assets/styles/color.less');
@import url('../../../assets/styles/basis.less');
.playListMain{
    padding-bottom: 4.5rem;
}
.classify{
    height: 4.5rem;
    width: 100%;
    padding: 1.2rem 0.5rem;
    background-color: white;
    .classifyBtn{
        float: left;
        width: 8rem;
        height: 2rem;
        padding: 0.1 0.2rem;
        border: 1px solid #ccc;
        color: #111;
        border-radius: 1.2rem;
        font-size: 1.2rem;
        line-height: 1.2rem;
        .more{
            margin-top: 0.2rem;
            background-size: 70% 90%;
        }
    }
    .classifyMain{
        float: right;
        width: 50%;
        height: 100%;
        padding-top: 0.5rem;
        ul{
            width: 100%;
            height: 100%;
            li{
                float: right;
                padding: 0 0.4rem;
                border-left: 1px solid #ccc;
            }
            li:last-child{
                border-left: none;
            }
        }
    }
}
.playMenu{
    .playMenuUl{
        width: 100%;
        .playMenuLi{
            float: left;
            width: 50%;
            padding-right: 0.1rem;
            padding-bottom: 1rem;
            .menuImg{
                position: relative;
                width: 100%;
                height: 13rem;
                .coverImg{
                    width: 100%;
                    height: 100%;
                }
                .creator{
                    position: absolute;
                    left: 0rem;
                    bottom: 0;
                    width: 100%;
                    text-align: left;
                    padding: 0.5rem;
                    color: white;
                    font-size: 1.2rem;
                    i{
                        padding: 0 0.1rem;
                    }
                    .icon-wszl-copy{
                        color: #333;
                    }
                    .icon-wujiaoxing2{
                        color: #fa8703;
                    }
                }
                .playCount{
                    position: absolute;
                    right: 0;
                    top: 0;
                    color: white;
                    text-align: right;
                    padding-right: 0.5rem;
                }
            }
            .menuName{
                padding: 0.5rem;
                color: #000;
                line-height: 1.2rem;
                font-size: 1.2rem;
                text-align: left;
                max-height: 2.8rem;
            }
        }
        .playMenuLi:nth-child(2n+1){
            padding-left: 0;
        }
    }
}
</style>

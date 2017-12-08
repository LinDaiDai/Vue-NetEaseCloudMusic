<template>
  <div class="detailRadio main">
    <div class="headerBasis" id="detailRadioHeader">
      <i class="iconfont icon-fanhui fanhui" @click="goBack"></i>
      电台
      <i class="iconfont icon-ic_more_vert_px iconRight"></i>
      <i class="iconfont icon-fenxiang iconRight"></i>
    </div>
    <div class="homeMain">
        <div class="picUrl">
            <img class="imgBlock" v-lazy="detailRadio.picUrl" alt="">
            <div class="picFooter">
                <div class="creator">
                    <p class="name">{{detailRadio.name}}</p>
                    <p class="subCount">{{detailRadio.subCount}}人订阅</p>
                </div>
            </div>
            <div class="dingyue">
                <i class="iconfont icon-wujiaoxing2"></i>
                订阅
            </div>
        </div>
        <ul class="radioNav">
            <li class="radioNavLi" :class="{'activeLi': detailBol}" @click="detailBol=true">详情</li>
            <li class="radioNavLi" :class="{'activeLi': !detailBol}" @click="detailBol=false">节目{{detailRadio.programCount}}</li>
            <div class="slider" :class="{'activeSlider': !detailBol}"></div>
        </ul>
        <div class="detail" v-if="detailBol">
            <div class="anchor">
                <h2 class="title">
                    <span class="titleText">主播</span>
                </h2>
                <div class="anchorMain">
                    <img class="avatarUrl" :src="detailRadio.avatarUrl" alt="">
                    <div class="anchorRight">
                        <p class="nickName">
                            {{detailRadio.nickname}}
                        </p>
                    </div>
                </div>
            </div>
            <div class="brief">
                <h2 class="title">
                    <span class="titleText">电台内容简介</span>
                </h2>
                <div class="briefMain">
                    <p>分类:<span class="category">{{detailRadio.category}}</span></p>
                    <p>{{detailRadio.desc}}</p>
                </div>
            </div>
            <div class="comment">
                <h2 class="title">
                    <span class="titleText">精彩评论</span>
                </h2>
                <ul class="commentUl">
                    <li class="commentLi" v-for="(item, index) in detailRadio.commentDatas" :key="item.id">
                        <div class="avatarUrl">
                            <img :src="item.avatarUrl" alt="">
                        </div>
                        <div class="commentRight">
                            <div class="nickname">{{item.nickname}}</div>
                            <div class="commentContent">{{item.content}}</div>
                            <div class="programName">一{{item.programName}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="act" v-else>
            <ul class="singleUl" id="myLikeUl">
                <li class="firstLi">
                    <div class="firstLeft">共{{detailRadio.programCount}}</div>
                    <div class="firstRight">
                        <span class="iconfont icon-fenlei"></span>
                        多选
                    </div>
                </li>
                <li class="singleLi" v-for="(item, index) in actRadio.list" :key="item.id">
                    <span class="number">{{index + 1}}</span>
                    <div class="singleLiLeft">{{item.name}}</div>
                    <i class="iconfont icon-ic_more_vert_px"></i>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      detailBol: true
    }
  },
  computed: {
    // 电台详情
    detailRadio () {
      console.log(this.$store.state.detailRadio)
      return this.$store.state.detailRadio
    },
    // 电台节目
    actRadio () {
      return this.$store.state.actRadio
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../assets/styles/color.less');
@import url('../../../assets/styles/basis.less');
#detailRadioHeader{
    background: transparent;
}
.main{
    top: 0;
}
.homeMain{
    top: 0;
}
.detail{
    padding-bottom: 4.5rem;
}
.picUrl{
    height: 45%;
    width: 100%;
    position: relative;
    .picFooter{
        height: 6rem;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 1rem 1rem;
        color: white;
        .creator{
            float: left;
            width: 50%;
            height: 100%;
            text-align: left;
            p{
                width: 100%;
                padding: 0.5rem 0;
            }
            .name{
                font-size: 1.6rem;
            }
            .subCount{
                font-size: 1.2rem;
            }
        }
    }
    .dingyue{
        position: absolute;
        right: 1rem;
        bottom: 1rem;
        width: 7rem;
        height: 2.5rem;
        line-height: 2.5rem;
        border: 1px solid white;
        border-radius: 20px;
        color: white;
        text-align: center;
        i{
            padding-right: 0.5rem
        }
    }
}
.radioNav{
  position: relative;
  height: 2.5rem;
  line-height: 2.5rem;
  color: @fontGary;
  background: white;
  text-align: center;
  .activeSlider{
      left: 50%;
  }
  .activeLi{
      color: @fontRed;
  }
}
.radioNavLi{
    width: 50%;
    height: 100%;
    float: left;
}
.slider{
    position: absolute;
    height: 2px;
    background: @borderRed;
    width: 50%;
    bottom: 0;
    left: 0;
    transition: all 0.3s;
}
.anchorMain{
    height: 6rem;
    padding: 1rem;
    .avatarUrl{
        float: left;
        border-radius: 50%;
        width: 4rem;
        height: 4rem;
        display: block;
    }
    .anchorRight{
        float: left;
        padding-left: 1rem;
        height: 4rem;
        text-align: left;
        width: 15rem;
        color: #333;
        line-height: 4rem;
    }
}
.briefMain{
    text-align: left;
    padding-left: 0.5rem;
    line-height: 1.6rem;
    .category{
        border: 1px solid @borderRed;
        color: @fontRed;
        font-size: 1.2rem;
    }
}
.commentUl{
    background-color: @backF5;
}
.avatarUrl{
    img{
        border-radius: 50%;
    }
}
.firstLi{
    height: 2.5rem;
    line-height: 2.5rem;
    border-bottom: 1px solid #E1E1E2;
    text-align: left;
    color: #333333;
    border-bottom: 0;
    .firstLeft{
        float: left;
        width: 70%;
        height: 100%;
        font-size: 1.2rem;
    }
    .firstRight{
        width: 6rem;
        text-align: center;
        font-size: 1.2rem;
        color: #5C5C5C;
        height: 100%;
        float: right;
        span{
            font-size: 1.4rem;
        }
    }
}
.singleLiLeft{
    line-height: 4rem;
}
</style>

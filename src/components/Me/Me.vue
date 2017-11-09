<template>
  <div class="me" @click="showMe">
    <div class="meContent">
        <div class="meMain">
            <div class="loginMain" v-show="!loginBol">
                <p>登录网易云音乐</p>
                <p>320K高音质无限下载, 手机电脑多端同步</p>
                <div class="loginBtn" @click="login">立即登录</div>
            </div>
            <div class="loginMain loginYes" v-show="loginBol">
                <div class="touxian">
                    <img :src="userInfo.profile.avatarUrl">
                </div>
                <div class="userName">
                    {{userInfo.profile.nickname}}
                    <i>Lv.{{userInfo.account.type}}</i>
                    <span class="iconfont icon-qian" v-if="!qiandaoBol" @click.stop="qiandao"></span>
                    <span class="yiqiandao" v-else>已签到</span>
                </div>
            </div>
            <ul class="meUl">
                <li>我的消息</li>
                <li>会员中心</li>
                <li>商城</li>
                <li>在线听歌免流量</li>
                <li>我的好友</li>
                <li>附近的人</li>
                <li>个性换肤<span>官方红</span></li>
                <li>听歌识曲</li>
                <li>定时停止播放</li>
                <li>扫一扫</li>
                <li>音乐闹钟</li>
                <li>驾驶模式</li>
            </ul>
        </div>
        <ul class="userSet">
            <li class="nightModel"><i class=" iconfont icon-yejianmoshi"></i>夜间模式</li>
            <li class="set"><i class="iconfont icon-gengduo1"></i>设置</li>
            <li class="out"><i class="iconfont icon-tuichu18"></i>退出</li> 
        </ul>
    </div>
  </div>
</template>
<script>
export default {
  created () {

  },
  data () {
    return {
      // 是否签到
      qiandaoBol: false
    }
  },
  computed: {
    meBol () {
      return this.$store.state.meBol
    },
    // 用户是否登录
    loginBol () {
      return this.$store.state.loginBol
    },
    userInfo () {
      if (this.loginBol) {
        return this.$store.state.userInfo
      } else {
        // 头像, 用户名称, 用户等级
        return {profile: {avatarUrl: '', nickname: ''}, account: {type: ''}}
      }
    }
  },
  methods: {
    showMe () {
      this.$store.commit('CHANGEMEBOL')
    },
    // 点击登录
    login () {
      this.$router.push('/login')
    },
    // 点击签到
    qiandao () {
      this.qiandaoBol = !this.qiandaoBol
    }
  }
}
</script>
<style lang="less" scoped>
.slide-enter-active {
  transition: transform .3s ease;
}
.slide-leave-active {
  transition: transform .8s ease;
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-300px);
//   opacity: 0;
}
.me{
  position: fixed;
//   transform: translateX(-40px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
  .meContent{
    height: 100%;
    width: 100%;
    position: relative;
    // transform: translateX(0px);
    // transition: all 3s;
    .meMain::-webkit-scrollbar{display:  none};
    .meMain{
    position: absolute;
    top: 0;
    left: 0;
    right: 4.5rem;
    bottom: 4rem;
    z-index: 4;
    overflow: scroll;
    .loginMain{
        width: 100%;
        padding: 2rem 0;
        color: #ccc;
        background-color: #333;
        text-align: center;
        line-height: 1.5rem;
        font-size: 1.2rem;
        p:nth-child(1){
            padding-bottom: 0.3rem;
        }
        .loginBtn{
            width: 10rem;
            height: 2rem;
            line-height: 2rem;
            color: #fff;
            border-radius: 20px;
            border: 1px solid #E1E1E2;
            margin: 0.8rem auto;
        }
        .touxian{
            height: 8rem;
            width: 100%;
            padding: 1rem 0;
            img{
                display: block;
                border-radius: 50%;
                width: 6rem;
                height: 6rem;
            }
        }
    }
    .loginYes{
        position: relative;
        font-size: 1.4rem;
        color: white;
        padding-left: 1rem;
        i{
            display: inline-block;
            padding: .1rem .5rem;
            font-size: 1.2rem;
            font-style: italic;
            border-radius: 20px;
            border: 1px solid white;
            margin-left: .5rem;
        }
        .userName{
            text-align: left;
        }
        span{
            display: black;
            position: absolute;
            right: 1rem;
            bottom: 1.5rem;
        }
        .yiqiandao{
            color: #cccccc;
            text-align: center;
            height: 2rem;
            line-height: 1.8rem;
            font-size: 1.2rem;
            padding: .1rem 0.5rem;
            border: 1px solid #cccccc;
            border-radius: 20px;
        }
    }
    .meUl{
        background-color: #F5F5F7;
        li{
            position: relative;
            height:3.8rem;
            padding-left: 3.5rem; 
            background-position: 1rem center;
            background-repeat: no-repeat;
            background-size: 1.8rem 1.8rem;
            background-color: white;
            line-height: 3.8rem;
            font-size: 1.4rem;
            color: #111111;
            text-align: left;
            span{
                float: right;
                margin-right: 1rem;
            }
        }
        li:nth-child(1){
            background-image: url('./images/cm2_set_icn_mail@3x.png');
        }
        li:nth-child(2){
            background-image: url('./images/cm2_set_icn_vip@3x.png');
        }
        li:nth-child(3){
            background-image: url('./images/cm2_set_icn_store@3x.png');
        } 
        li:nth-child(4){
            margin-bottom: 0.5rem;
            background-image: url('./images/cm2_set_icn_combo@3x.png');
        }
        li:nth-child(5){
            background-image: url('./images/account3x.png');
        }
        li:nth-child(6){
            margin-bottom: 0.5rem;
            background-image: url('./images/cm2_set_icn_about@3x.png');
        }
        li:nth-child(7){
            background-image: url('./images/cm2_set_icn_skin@3x.png');
        }
        li:nth-child(8){
            background-image: url('./images/cm2_topbar_icn_mic_prs@3x.png');
        }
        li:nth-child(9){
            background-image: url('./images/cm2_set_icn_time@3x.png');
        }
        li:nth-child(10){
            background-image: url('./images/cm2_set_icn_scan@3x.png');
        }
        li:nth-child(11){
            background-image: url('./images/cm2_set_icn_alamclock@3x.png');
        }
        li:nth-child(12){
            background-image: url('./images/cm2_set_icn_vehicle@3x.png');
        }
        }
    }
    .userSet{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4rem;
            right: 4.5rem;
            border-top: 1px solid #E1E1E2;
            li{
                float: left;
                width: 33.3%;
                height: 100%;
                line-height: 4rem;
                color: #333;
                font-size: 1.4rem;
                background-color: white;
                text-align: center;
                i{
                    display: inline-block;
                    width: 2.5rem;
                    height: 4rem;
                    text-align: center;
                }
            }
        }
    }
</style>

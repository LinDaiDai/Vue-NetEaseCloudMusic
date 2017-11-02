<template>
    <div class="loginTop">
        <div class="headerBasis">
            <i class="iconfont icon-fanhui fanhui" @click="goBack"></i>
            {{title}}
        </div>
        <ul class="loginMain">
            <li>
                <i class="iconfont icon-shouji"></i>
                <span>+86</span>
                <input type="text" placeholder="请输入手机号" v-model="phone">
                <span class="iconfont icon-chuyidong" @click="clearText"></span>
            </li>
            <li>
                <i class="iconfont icon-ziyuan"></i>
                <input type="password" placeholder="请输入密码" v-model="password">
                <a v-if="aBol">忘记密码?</a>
            </li>
        </ul>
        <div class="loginBtn" @click="login">{{btnText}}</div>
    </div>
</template>
<script>
import { MessageBox, Indicator } from 'mint-ui'
export default {
  data () {
    return {
      phone: '',
      password: ''
    }
  },
  props: ['title', 'btnText', 'aBol'],
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    clearText () {
      this.phone = ''
    },
    components: {
      MessageBox,
      Indicator
    },
    login () {
      let userInfo = {phone: this.phone, password: this.password}
      Indicator.open()
      return this.$store.dispatch('login', userInfo)
        .then(res => {
          Indicator.close()
          if (res.status) {
            // 获取用户我的音乐页信息
            this.$store.dispatch('getMyMusic')
            console.log(this.$store.state.loginBol)
            MessageBox({
              'title': '提示',
              'message': res.msg
            })
            // 跳回我的音乐
            this.$router.push('/')
          } else {
            MessageBox({
              'title': '提示',
              'message': res.msg
            })
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../assets/styles/basis.less');
@import url('../../../assets/styles/color.less');
.loginTop{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .headerBasis{
        color: #ffffff;
        font-size: 1.6rem;
        line-height: 4.5rem;
        text-align: left;
    }
    .loginMain{
        position: absolute;
        top: 4.5rem;
        padding: 1rem;
        li{
            float: left;
            width: 100%;
            height: 4.5rem;
            line-height: 4.5rem;
            color: #ccc;
            font-size: 1.4rem;
            text-align: left;
            border-bottom: 1px solid #ccc;
            i{
                font-size: 2rem;
            }
            a{
                float:right;
                color: @fontBlue;
            }
            .icon-chuyidong{
                float: right;
            }
        }
    }
    .loginBtn{
        position: absolute;
        top: 18rem;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        border-radius: 20px;
        background-color: rgb(218, 15, 15);
        color: white;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        margin: 0 auto;
        font-size: 1.4rem;

    }
}
</style>

<template>
  <div class="login">
      <div class="loginHeader">
          <i class="iconfont icon-fanhui" @click="goBack"></i>
          <div class="logo"></div>
      </div>
      <div class="loginMain">
          <div class="cellphone" @click="loginPhone">手机号登录</div>
          <div class="register" @click="resigter">注册</div>
      </div>
    <login-footer otherText="其他登录方式"></login-footer>
  </div>
</template>
<script>
import LoginFooter from './components/LoginFooter.vue'
export default {
  components: {
    LoginFooter
  },
  methods: {
    loginPhone () {
      this.$router.push('/loginphone')
    },
    resigter () {
      this.$router.push('/resigter')
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.login{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 51;
    background:linear-gradient(to bottom,#f3d3d3 1%, #f0b7b7 20%, white);
    .loginHeader{
        width: 100%;
        height: 40%;
        position: relative;
        i{
            display: block;
            position: absolute;
            width: 3rem;
            height: 3rem;
            top: 1rem;
            left: 1rem;
            font-size: 2rem;
            color: white;
        }
        .logo{
            position: absolute;
            width: 8rem;
            height: 8rem;
            left: 50%;
            top: 50%;
            border-radius:20px;
            transform: translate(-50%, -50%);
            background-position: center;
            background-repeat: no-repeat;
            background-size: 80% 80%;
            background-color: rgb(218, 15, 15);
            background-image: url('./images/icon_logo_hover.png');
        }
    }
    .loginMain{
        width: 100%;
        height: 18rem;
        div{
            height: 3rem;
            width: 80%;
            margin: 1rem auto;
            border-radius:20px;
            border: 1px solid rgb(218, 15, 15);
            color: rgb(218, 15, 15);
            text-align: center;
            line-height: 3rem;
            font-size: 1.6rem;
        }
    }
    
}
</style>
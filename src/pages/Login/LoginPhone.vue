<template>
  <div class="loginPhone main">
    <login-top title="手机号登录" btnText="登录" aBol="true"></login-top>
  </div>
</template>
<script>
import LoginTop from './components/LoginTop.vue'
export default {
  components: {
    LoginTop
  }
}
</script>
<style lang="less" scoped>
.loginPhone{
  position: fixed;
  z-index: 51;
}
</style>

<template>
  <div class="loginPhone">
    <login-top title="手机号注册" btnText="下一步" aBol="false"></login-top>
    <login-footer otherText="其他注册方式"></login-footer>
  </div>  
</template>
<script>
import LoginFooter from './components/LoginFooter.vue'
import LoginTop from './components/LoginTop.vue'
export default {
  components: {
    LoginFooter,
    LoginTop
  }
}
</script>
<style lang="less" scoped>

</style>

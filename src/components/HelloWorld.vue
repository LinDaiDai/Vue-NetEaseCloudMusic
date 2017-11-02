<template>
  <div class="hello">
   <mt-swipe :auto="4000">
  <mt-swipe-item><img src="./banner1.jpg"></mt-swipe-item>
  <mt-swipe-item><img src="./banner2.jpg"></mt-swipe-item>
  <mt-swipe-item><img src="./banner3.jpg"></mt-swipe-item>
</mt-swipe>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.hello{
  width: 100%;
  height: 200px;
}
mt-swipe-item img{
  width: 100%;
  height: 100%;
}
</style>

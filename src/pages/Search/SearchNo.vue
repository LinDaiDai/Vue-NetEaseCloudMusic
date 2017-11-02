<template>
    <div class="main">
      <div class="title">
        <i class="iconfont icon-flyme_icon-"></i>
        歌手分类
        <i class="iconfont icon-you"></i>
      </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
@import url('../../assets/styles/basis.less');
@import url('../../assets/styles/color.less');
.title{
    text-align: center;
    font-size: @fontSizeMedium;
    color: @fontCcc;
    line-height: 4rem;
    padding: 0;
    border: 1px solid #E1E1E2;
    i{
        font-size: @fontSizeMediumX;
        color: #E1E1E2;
    }
    .icon-flyme_icon-{
        font-size: 3rem;
    }
}
</style>

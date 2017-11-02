<template>
  <div class="footer">
    <div class="other">{{otherText}}</div>
    <ul>
        <li>
            <i class="iconfont icon-weixin"></i>
            微信
        </li>
        <li>
            <i class="iconfont icon-QQ"></i>
            QQ
        </li>
        <li>
            <i class="iconfont icon-weibo"></i>
            微博
        </li>
        <li>
            <i class="iconfont icon-wangyi"></i>
            网易邮箱
        </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['otherText']
}
</script>
<style lang="less" scoped>
.footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 1.5rem;
    .other{
        height: 2rem;
        line-height: 2rem;
    }
    ul{
        padding: 0 1rem;
        li{
            float: left;
            height: 5rem;
            width: 25%;
            color: #cccccc;
            i{
                display: block;
                margin:0 auto;
                margin-bottom: .2rem;
                border: 1px solid #E1E1E2;
                width: 4rem;
                height: 4rem;
                border-radius: 50%;
                text-align: center;
                line-height: 4rem;
                font-size: 3rem;
            }
            .icon-weixin{
                color: greenyellow;
            }
            .icon-QQ{
                color: #63a6e6;
            }
            .icon-weibo{
                color: rgb(218, 15, 15);
            }
            .icon-wangyi{
                color: rgb(218, 15, 15);
            }
        }
    }
}
</style>

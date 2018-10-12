<template>
  <div class="header van-hairline--bottom">
    <span class="left" @click="back">
      <i class="back"></i>
    </span>
    <span class="title">{{title}}</span>
    <span class="right">
      <slot name="right"></slot>
    </span>
  </div>
</template>
<script>
export default {
  name: 'hHeader',
  props: {
    title: {
      type: String,
      required: true,
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
}
</script>
<style lang="scss" scoped>
  .header{
    width: 100%;
    height: 44px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 rem(15);
    box-sizing: border-box;
    position: fixed;
    top: 0;
    background: #FFF;
    z-index: 2;
    span{
      flex: 1;
      line-height: 44px;
      &.title{
        flex: 3;
        color: #333;
        font-family: $font_bold;
        font-size: rem(17);
        text-align: center;
      }
      &.right{
        text-align: right;
      }
    }
  }
  .back{
    display: inline-block;
    width: 10px;
    height: 15px;
    background: red;
    background: $icon_sprite;
    background-size: 29px 320px;
    background-position: -4px -103px;
    vertical-align: -2px;
  }
</style>


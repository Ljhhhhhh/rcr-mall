<template>
  <div class="title">
    <i></i>
    <span>{{title}}</span>
    <i></i>
  </div>
</template>
<script>
export default {
  name: 'hContentTitle',
  props: ['title']
}
</script>
<style lang="scss" scoped>
  .title{
    width: auto;
    height: auto;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center; 
    font-size: rem(15);
    line-height: rem(15);
    color: $font_theme;
    span{
      display: inline-block;
      margin: 0 rem(10);
      vertical-align: middle;
    }
    i{
      font-style: normal;
      display: inline-block;
      width: rem(5);
      height: rem(5);
      position: relative;
      font-size: 0;
      background: #CCC;
      vertical-align: middle;
      &::before{
        content: '';
        position: absolute;
        width: rem(65);
        height: 1px;
        background: #CCC;
        top: 50%;
      }
      &:first-child::before{
        left: rem(-65);
      }
      &:last-child:before{
        left: rem(5);
      }
    }
  }
</style>
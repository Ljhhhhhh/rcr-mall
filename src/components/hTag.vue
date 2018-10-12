<template>
  <span :style="theme">{{tag}}</span>
</template>
<script>
  export default {
    name: 'tag',
    props: ['tag', 'theme']
  }

</script>
<style lang="scss" scoped>
  span {
    display: inline-block;
    background: $color_theme;
    color: #FFF;
    width: rem(60);
    height: rem(18);
    font-size: rem(10);
    text-align: center;
    margin-right: rem(10);
  }

</style>

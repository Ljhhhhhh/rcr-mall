<template>
  <div class="to-top_container" v-show="show" @click.stop="scrollToTop">
    <img :src="iconUrl">
  </div>
</template>
<script>
export default {
  name: 'toTop',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      iconUrl: 'static/images/to-top_icon.png'
    }
  },
  methods: {
    scrollToTop() {
      this.$emit('scrollToTop')
    }
  }
}
</script>
<style lang="scss" scoped>
  .to-top_container{
    opacity: 0.85;
    filter: opacity(85);
    position: fixed;
    width: rem(48);
    height: rem(48);
    right: rem(15);
    bottom: rem(127);
    img{
      width: 100%;
      height: auto;
    }
  }
</style>

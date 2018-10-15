<template>
  <div class="container detail">
    <h-header title="本田 雅阁">
      <i class="share" slot="right" @click="share"></i>
    </h-header>
    <div class="scroll-wrap">
      <div class="scroll-content">
      </div>
    </div>
    <keep-alive>
      <h-consult></h-consult>
    </keep-alive>
  </div>
</template>
<script>
  import hHeader from '@/components/hHeader'
  import hConsult from '@/components/hConsult'
  import hTag from '@/components/hTag'
  import BScroll from 'better-scroll'
  export default {
    name: 'rentDetail',
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this._initPage()
    },
    methods: {
      share() {
        alert('APP实现分享功能')
      },
      _initPage() {
        this.scroll = new BScroll('.scroll-wrap', {
          click: true,
          probeType: 2,
        })
      },
    },
    components: {
      hHeader,
      hTag,
      hConsult,
    },
  }

</script>
<style lang="scss" scoped>
  .scroll-wrap {
    width: 100%;
    height: calc(100vh - 104px);
    overflow: hidden;
  }

  .share {
    display: inline-block;
    width: 19px;
    height: 17px;
    background: red;
    background: $icon_sprite;
    background-size: 31px 327px;
    background-position: -4px -224px;
    vertical-align: -3px;
  }

  .banner {
    width: 100%;
    height: auto;
    position: relative;
    margin-bottom: 20px;

    img {
      width: 100%;
      height: auto;
    }

    .indicators {
      position: absolute;
      bottom: rem(10);
      right: rem(15);
      color: #999;
      font-size: rem(12);
      font-family: $font_bold;
      letter-spacing: rem(2);
      z-index: 3;
    }
  }

</style>

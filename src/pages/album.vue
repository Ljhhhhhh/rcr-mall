<template>
  <transition name="slide">
    <div class="album-container container">
      <h-header title="车辆相册"></h-header>
      <div class="album-tab">
        <span v-for="(tab, i) in tabList" :key="i" :class="{active:activeIndex===i}" @click="changeType(i)">{{tab}}</span>
      </div>
      <div class="album-box">
        <van-swipe @change="onChange" :show-indicators="false" ref="album" :initial-swipe="initialSwipe">
          <van-swipe-item v-for="(item, i) in albumlist" :key="i">
            <img :src="item.url">
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="indicator">
        <span>{{albumIndex | padStartIndex(albumlist)}}</span>
        <span>/</span>
        <span>{{albumlist.length}}</span>
      </div>
    </div>
    </transition>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import hHeader from '@/components/hHeader'
  export default {
    name: 'Album',
    data() {
      return {
        activeIndex: 0, // 当前激活的tab
        albumIndex: 1, // 当前激活的图片
      }
    },
    mounted() {
      if (!this.albumlist.length || !this.$route.query.index) {
        this.$router.back()
      }
      this.albumIndex = this.$route.query.index
    },
    computed: {
      initialSwipe() {
        return this.$route.query.index - 1
      },
      tabList() {
        let tabList = []
        this.albumlist.forEach(album => {
          let type = album.type
          if (!tabList.includes(type)) {
            tabList.push(type)
          }
        })
        return tabList;
      },
      ...mapGetters([
        'albumlist'
      ])
    },
    methods: {
      changeType(i) {
        this.activeIndex = i
        // TODO: 点击tab时激活对应的图片
        for (let j = 0, len = this.albumlist.length; j < len; j++) {
          if (this.tabList[i] === this.albumlist[j].type) {
            this.$refs.album.swipeTo(j)
            break
          }
        }
      },
      onChange(index) {
        this.albumIndex = index + 1;
        this.tabList.forEach((tab, i) => {
          if (this.albumlist[index].type === tab) {
            this.activeIndex = i
          }
        })
      },
    },
    components: {
      hHeader,
    }
  }

</script>
<style lang="scss" scoped>
  .album-container {
    background: #333;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .album-tab {
    width: auto;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 40px;
    padding: 0 rem(75);
    margin: 60px auto 90px;

    span {
      flex: 1;
      color: #ccc;
      text-align: center;
      font-size: rem(15);
      min-width: rem(30);
      max-width: rem(30);
      position: relative;

      &.active {
        color: #FFF;
        font-family: $font_bold;

        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          background: #FFF;
          border-radius: rem(1);
        }
      }
    }
  }

  .album-box {
    width: auto;
    height: auto;

    img {
      width: 100%;
      height: auto;
    }
  }

  .indicator {
    text-align: center;
    margin-top: 15px;
    font-size: rem(15);
    color: #CCC;
  }

</style>

<template>
  <div class="city-select_container">
    <div class="search-box" ref="search">
      <div class="address-select" @click="back">
        <span>取消</span>
      </div>
      <div class="car-search">
        <van-search v-model="searchText" placeholder="请输入搜索关键词" show-action @on-change="onSearch" @search="onSearch">
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </div>
    </div>
    <div class="scroll-wrap">
      <h-scroll class="listview" ref="listview" @scroll="scroll" :listenScroll="listenScroll" :probeType="probeType">
        <ul>
          <li v-for="group in data" :key="group.title" class="list-group" ref="listGroup">
            <h2 class="list-group-title" v-show="group.items.length">{{group.title}}</h2>
            <div class="list-group-box">
              <span
               @click="selectItem(item)"
               v-for="item in group.items"
               :key="item.id"
               class="list-group-item"
               :class="{hot: item.isHot, history: item.isHistory}"
               >
                {{item.name}}
              </span>
            </div>
          </li>
        </ul>
        <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
          <ul>
            <li v-for="(item,index) in shortcutList" :key="item" class="item" :data-index="index" :class="{'current':currentIndex===index}">
              {{item}}
            </li>
          </ul>
        </div>
        <div class="list-fixed" v-show="fixedTitle && !searchText" ref="fixed">
          <h1 class="fixed-title">{{fixedTitle}}</h1>
        </div>
      </h-scroll>
    </div>
  </div>
</template>
<script>
import hScroll from '@/components/hScroll';
import {
  fetchAreas,
} from '@/api/common/areas';
import {
  getData,
} from '@/utils/dom';
import Storage from 'good-storage';
import {mapMutations} from 'vuex';

const ANCHOR_HEIGHT = 18;
const TITLE_HEIGHT = 40;
const HOT_NAME = '热门';
const HISTORY_NAME = '历史城市';
// const HOT_SINGER_LEN = 10;
export default {
  name: 'citySelect',
  created() {
    this.touch = {};
    this.listenScroll = true;
    this.listHeight = [];
    this.probeType = 3;
    this.getAreas();
  },
  mounted() {
    this._initPage();
  },
  data() {
    return {
      searchText: '',
      scrollY: -1,
      currentIndex: 0,
      diff: -1,
      hasHeight: false,
      data: [],
      listHeight: [],
      originalAreaList: [],
    };
  },
  computed: {
    shortcutList() {
      console.log('data:', this.data);
      return this.data.map(group => {
        if (!this.searchText) {
          return group.title.substr(0, 1);
        } else {
          if (group.title !== HOT_NAME && group.title !== HISTORY_NAME) {
            return group.title.substr(0, 1);
          }
        }
      });
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return '';
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
    },
  },
  methods: {
    back() {
      this.$router.back();
    },
    onSearch() {
      let data = this.originalAreaList.filter(val => {
        return val.name.includes(this.searchText);
      });
      this.data = this._normalizeList(data);
    },
    _initPage() {
      let docHei = document.documentElement.clientHeight;
      let searchHei = document.querySelector('.search-box').clientHeight;
      document.querySelector('.scroll-wrap').style.height = docHei - searchHei - 15 + 'px';
    },
    async getAreas() {
      if (!Storage.get('AreaList') || !Storage.get('AreaList').length) {
        let res = await fetchAreas();
        Storage.set('AreaList', res.data.rows);
      }
      // let res = await fetchAreas();
      this.originalAreaList = Storage.get('AreaList');
      this.data = this._normalizeList(this.originalAreaList);
    },
    _normalizeList(list) {
      let areaList = list;
      let areaListMap = {};
      areaList.forEach(area => {
        let initial = area.initial.toLocaleUpperCase();
        if (!areaListMap[initial]) {
          areaListMap[initial] = {
            title: initial,
            items: [],
          };
        }
        areaListMap[initial].items.push(area);
      });
      areaListMap.hot = {
        title: HOT_NAME,
        items: this.searchText ? [] : [
          {id: 330782, initial: 'Y', name: '义乌市', pid: 330700, isHot: true},
          {initial: 'H', name: '杭州市', pid: 330000, id: 330100, isHot: true},
          {initial: 'N', name: '宁波市', pid: 330000, id: 330200, isHot: true},
          {initial: 'S', name: '深圳市', pid: 440000, id: 440300, isHot: true},
        ],
      };
      if (Storage.get('searchCityHistory') && Storage.get('searchCityHistory').length) {
        areaListMap.history = {
          title: HISTORY_NAME,
          items: this.searchText ? [] : Storage.get('searchCityHistory'),
        };
      }

      let ret = [];
      let hot = [];
      let history = [];
      for (let key in areaListMap) {
        let val = areaListMap[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        } else if (areaListMap.history && val.title === HISTORY_NAME) {
          history.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      console.log(history.length);
      if (areaListMap.history && history.length) {
        return hot.concat(history).concat(ret);
      } else {
        return hot.concat(ret);
      }
    },
    selectItem(item) {
      item.isHistory = true;
      let s = Storage.get('searchCityHistory');
      if (!Array.isArray(s)) {
        s = [];
      }
      if (JSON.stringify(s).indexOf(JSON.stringify(item)) < 0) {
        s.unshift(item);
        if (s.length > 8) {
          s.pop();
        }
        Storage.set('searchCityHistory', s);
      }
      Storage.set('Area', item);
      this.setArea(item);
      this.$router.back();
    },
    refresh() {
      this.$refs.listview.refresh();
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, 'index');
      let firstTouch = e.touches[0];
      this.touch.y1 = firstTouch.pageY;
      this.touch.anchorIndex = anchorIndex;
      this._scrollTo(anchorIndex);
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0];
      this.touch.y2 = firstTouch.pageY;
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0; // |0的意思等同于  MATH.floor
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
      this._scrollTo(anchorIndex);
      console.log(anchorIndex);
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return;
      }
      if (index < 0) {
        index = 0;
      } else if (index > this.listHeight - 2) {
        index = this.listHeight - 2;
      }
      this.scrollY = -this.listHeight[index];
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
    },
    _calculateHeight() {
      this.listHeight = [];
      const list = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    ...mapMutations({
      setArea: 'SET_AREA',
    }),
  },
  watch: {
    searchText(val) {
      let data = this.originalAreaList.filter(d => {
        return d.name.includes(val);
      });
      this.data = this._normalizeList(data);
    },
    data() {
      setTimeout(() => {
        this._calculateHeight();
      }, 400);
    },
    scrollY(newY) {
      const listHeight = this.listHeight;
      // 滚动到顶部
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      // 在中间滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;
          this.diff = height2 + newY;
          return;
        }
      }
      // 滚动到底部，且-newY大于最后一个元素的上线
      this.currentIndex = listHeight.length - 2;
    },
    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0;
      if (this.fixedTop === fixedTop) {
        return;
      }
      this.fixedTop = fixedTop;
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
    },
  },
  components: {
    hScroll,
  },
};
</script>
<style scoped lang="scss">
  .city-select_container{
    margin-top: -44px;
    // background: linear-gradient(to bottom, $color_theme 0%, #fff 30%, #fff 100%);
  .search-box {
    display: flex;
    background: #F2F2F2;

    .van-search .van-cell {
      border-radius: 3px;
    }

    .address-select {
      flex: 1;
      max-width: 6em;
      line-height: 45px;
      display: flex;
      text-align: center;
      justify-content: space-around;
      align-items: center;
      font-size: rem(14);

      i {
        font-style: normal;
      }
    }

    .car-search {
      flex: 5;
    }
  }
    .scroll-wrap{
      border-top: 15px solid #FFF;
      height: auto;
      width: auto;
      padding: 0 rem(15);
      overflow: hidden;
      background: #FFF;
    }
  }
  .listview {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #FFF;
    border-radius: rem(5);

    .list-group {
      padding-bottom: 0;

      .list-group-title {
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        font-size: rem(14);
        color: $font_vice;
        background: #F2F2F2;
        margin-block-start: 0;
        margin-block-end: 0;
      }
      .list-group-box{
        display: flex;
        flex-wrap: wrap;
        // padding-right: rem(20);
        justify-content: flex-start;
      }
      .list-group-item {
        display: block;
        width: 100%;
        // padding: 0 rem(12);
        line-height: 30px;
        height: 30px;
        color: $font_theme;
        font-size: rem(14);
        padding: 0 rem(15);
        border-radius: rem(3);
        &:nth-child(2n) {
          background: #FaFaFa
        }
        &.hot, &.history{
          display: inline-block;
          padding: 0 rem(12);
          width: auto;
          background: #F2F2F2;
          border-radius: rem(3);
          border-radius: rem(3);
          margin: rem(5);
        }

        .avatar {
          width: 0px;
          height: 0px;
          border-radius: 50%;
          // display: none;
        }

        .name {
          // margin-left: 20px;
        }
      }
    }

    .list-shortcut {
      position: absolute;
      z-index: 30;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      padding: 20px 0;
      text-align: center;

      .item {
        padding: 3px;
        line-height: 1;
        color: #666;
        font-size: rem(14);

        &.current {
          color: $color_theme;
        }
      }
    }

    .list-fixed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;

      .fixed-title {
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        font-size: rem(14);
        color: $font_vice;
        background: #F2F2F2;
        margin-block-start: 0;
        margin-block-end: 0;
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }

</style>

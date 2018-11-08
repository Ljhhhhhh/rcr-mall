<template>
  <div class="container" ref="container">
    <h-header title="二手车" ref="header">
      <span slot="right" class="sale_btn" @click="goSale">卖车</span>
    </h-header>
    <div class="search-box" ref="search">
      <div class="address-select" @click="selectCity">
        <span>{{area.name || '选择城市'}}</span>
        <i class="triangle-down_icon"></i>
      </div>
      <div class="car-search">
        <van-search v-model="searchText" placeholder="请输入搜索关键词" show-action @blur="onSearch" @search="onSearch">
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </div>
    </div>
    <div class="orderby-select_box van-hairline--bottom">
      <span ref="select" v-for="(select, index) in selectList" :key="index" :class="{'selected': index===currentOpenSelect}"
        @click="changeSelect(index)">
        <em>{{select.currentName || select.name}}</em>
        <i class="triangle-down_icon" :class="{'turn-up': index===currentOpenSelect}"></i>
      </span>
      <span class="orderby-select_reset" @click="resetSelect" ref="reset"><img src="static/images/reset.png"></span>
      <transition name="topin" v-show="currentOpenSelect>-1">
        <div class="orderby-select_option" ref="options">
          <ul class="orderby-select_default" v-show="currentOpenSelect === 0">
            <li v-for="(option, i) in selectList[0].options" :key="i" :class="{selected:i===option.active}" @click="optionChange(0, i)"
              class="van-hairline--bottom">
              <span>{{option.tag}}</span>
              <van-icon color="#0198E7" name="success" v-show="i===selectList[0].active" />
            </li>
          </ul>
          <div class="brandScrollWrap" v-show="currentOpenSelect === 1">
            <h-list-view :len="currentOpenSelect" :data="selectList[1].options" @select="brandSelected"></h-list-view>
            <div class="reset-brand_btn" @click="brandSelected({name: null, id: null})">重置</div>
          </div>
          <ul class="orderby-select_first" v-show="currentOpenSelect === 2">
            <li v-for="(option, i) in selectList[2].options" :key="i" :class="{selected:i===selectList[2].active}"
              @click="optionChange(2, i)">{{option.tag}}</li>
          </ul>
          <ul class="orderby-select_price" v-show="currentOpenSelect === 3">
            <li v-for="(option, i) in selectList[3].options" :key="i" :class="{selected:i===selectList[3].active}"
              @click="optionChange(3, i)">{{option.tag}}</li>
          </ul>
        </div>
      </transition>
    </div>
    <h-scroll class="scroll-box" :listenScroll="true" @scroll="loadMore" :pullup="true" @scrollToEnd="scrollToEnd" ref="scrollCar">
      <div class="car-list_box">
        <div class="car-list_item van-hairline--bottom" v-for="(car, index) in carList" :key="index" @click="carDetail(car.id)">
          <div class="car-thumb">
            <p>{{car.acts}}</p>
            <img v-lazy="car.thumb">
          </div>
          <div class="car-info">
            <p class="title">{{car.title}} </p>
            <p class="price">厂商指导价：{{car.price | formatPrice}}元</p>
            <p class="highlight">首付<span>{{car.payment | formatPrice}}</span>元开回家</p>
          </div>
        </div>
      </div>
      <div class="load-state_msg" v-show="loadMoreHeight.loading === 2">
        <span>{{loadMoreHeight.msg}}</span>
        <icon name="loading" scale="1.5" class="load-state_icon" v-if="!loadMoreHeight.loadComplete"></icon>
        <icon name="stop" scale="1.5" class="load-complete_icon" v-else></icon>
      </div>
    </h-scroll>
    <transition name="van-fade">
      <div class="modal" @click="currentOpenSelect = -1" v-show="currentOpenSelect>-1">Fade</div>
    </transition>
    <!-- <transition name="topin">
      <div class="city-comp-box" v-show="cityObj.show">
        <h-city-select></h-city-select>
      </div>
    </transition> -->
  </div>
</template>
<script>
// import hCitySelect from '@/components/hCitySelect';
import hScroll from '@/components/hScroll';
import {
  fetchBrands,
} from '@/api/common/brand';
import hListView from '@/components/hListView';
import carSelectOptions from './config/carSelectOptions.js';
import {
  addClass,
  removeClass,
} from '@/utils/dom';
import {
  fetchCar,
} from '@/api/car/carList';
import {
  mapGetters,
} from 'vuex';
import Storage from 'good-storage';
export default {
  name: 'secondList',
  data() {
    return {
      carList: [],
      selectList: null,
      currentOpenSelect: -1,
      resetTime: null,
      defaultResponseData: {
        lx: 'olds',
        size: 5,
        page: 1,
      },
      selectResponseData: {},
      searchText: '',
      loadMoreHeight: {
        scrollBoxHeight: null,
        carListBoxHeight: null,
        loading: -1,
        loadComplete: false,
        carTotal: 0,
        msg: '加载中',
      },
    };
  },
  created() {
    this._initPage();
  },
  mounted() {
    this.getBrandList();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  computed: {
    ...mapGetters(['area']),
  },
  methods: {
    goSale() {
      this.$router.push({
        name: 'secondSale',
      });
    },
    carDetail(id) {
      console.log(id);
      this.$router.push({
        path: '/second-detail/' + id,
      });
    },
    loadMore(pos) {
      if (!this.loadMoreHeight.scrollBoxHeight) {
        this.loadMoreHeight.scrollBoxHeight = document.querySelector(
          '.scroll-box'
        ).offsetHeight;
      }
      if (!this.loadMoreHeight.carListBoxHeight) {
        this.loadMoreHeight.carListBoxHeight = document.querySelector(
          '.car-list_box'
        ).offsetHeight;
      }
      let scrollBoxHeight = this.loadMoreHeight.scrollBoxHeight;
      let carListBoxHeight = this.loadMoreHeight.carListBoxHeight;
      if (
        pos.y < scrollBoxHeight - carListBoxHeight - 60 &&
          this.loadMoreHeight.loading < 0
      ) {
        this.loadMoreHeight.loading = 2;
        if (
          this.defaultResponseData.size * this.defaultResponseData.page >=
            this.loadMoreHeight.carTotal
        ) {
          this.loadMoreHeight.loadComplete = true;
          this.loadMoreHeight.msg = '已加载全部';
          return false;
        }
        this.defaultResponseData.page = this.defaultResponseData.page + 1;
        this.getCarList(true);
      }
    },
    scrollToEnd() {
      this.loadMoreHeight.loading = -1;
      this.$refs.scrollCar.refresh();
    },
    resetSelect() {
      let resetDom = this.$refs.reset;
      resetDom.style.transition = 'all 1s ease-out';
      addClass(resetDom, 'circle');
      this.selectResponseData = {};
      this.getCarList();
      // console.log();
      this.selectList.forEach((item, index) => {
        item.currentName = null;
        if (index === 0) {
          item.active = 0;
        } else {
          item.active = null;
        }
      });
      this.resetTime = setTimeout(() => {
        resetDom.style.transition = 'none';
        removeClass(resetDom, 'circle');
      }, 1000);
    },
    brandSelected(item) {
      console.log(item);
      this.selectList[1].currentName = item.name;
      this.selectResponseData.brand = item.id;
      this.currentOpenSelect = -1;
      this.defaultResponseData.page = 1;
      this.getCarList();
    },
    optionChange(selectIndex, optionIndex) {
      let currentSelect = this.selectList[selectIndex];
      if (currentSelect.active === optionIndex) {
        currentSelect.active = null;
        currentSelect.currentName = null;
        this.selectResponseData[currentSelect.search] = null;
        if (selectIndex === 0) {
          currentSelect.active = 0;
          this.selectResponseData.stored = '';
          this.selectResponseData.order = '';
        }
      } else {
        currentSelect.active = optionIndex;
        currentSelect.currentName = currentSelect.options[optionIndex].tag;
        if (selectIndex === 0) {
          this.selectResponseData.stored =
              currentSelect.options[optionIndex].filed;
          this.selectResponseData.order =
              currentSelect.options[optionIndex].order;
        } else {
          this.selectResponseData[currentSelect.search] =
              currentSelect.options[optionIndex].tag;
        }
      }
      this.defaultResponseData.page = 1;
      this.getCarList();
      this.currentOpenSelect = -1;
    },
    changeSelect(index) {
      if (this.currentOpenSelect === index) {
        this.currentOpenSelect = -1;
      } else {
        this.currentOpenSelect = index;
      }
    },
    selectCity() {
      this.$router.push({
        name: 'citySelect',
      });
    },
    onSearch() {
      this.getCarList();
    },
    getCarSelectOptions() {
      this.selectList = carSelectOptions;
    },
    async getBrandList() {
      if (!Storage.get('brandList')) {
        let brandRes = await fetchBrands();
        brandRes.data.sort((a, b) => {
          return a.initial.charCodeAt(0) - b.initial.charCodeAt(0);
        });
        let brandObj = {};
        brandRes.data.forEach(brand => {
          if (!brandObj[brand.initial]) {
            brandObj[brand.initial] = {
              title: brand.initial,
              items: [],
            };
          }
          brandObj[brand.initial].items.push({
            name: brand.name,
            id: brand.id,
          });
        });

        let ret = [];
        for (let key in brandObj) {
          let val = brandObj[key];
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val);
          } else {
            console.log('other');
          }
        }
        Storage.set('brandList', ret);
      }
      this.selectList[1].options = Storage.get('brandList');
      let boxHeight = this.$refs.container.offsetHeight;
      let searchHeight = this.$refs.search.offsetHeight;
      let selectHeight = this.$refs.select[0].offsetHeight;
      let brandBox = this.$refs.options;
      let maxHeight = boxHeight - searchHeight - selectHeight - 30 + 'px';
      brandBox.style.maxHeight = maxHeight;
      document.querySelector('.brandScrollWrap').style.height = maxHeight;
    },
    async getCarList(loadMore = false) {
      // let defaultResponse = this.defaultResponseData;
      let response = Object.assign({},
        this.defaultResponseData,
        this.selectResponseData, {
          searchText: this.searchText,
        }
      );
      let carList = await fetchCar(response);
      // this.loadMoreHeight.loading = false;
      if (!loadMore) {
        this.carList = carList.data.rows;
        this.loadMoreHeight.carTotal = carList.data.total;
      } else {
        this.loadMoreHeight.loading = 1;
        this.carList = this.carList.concat(carList.data.rows);
      }
    },
    _initPage() {
      this.getCarList();
      this.getCarSelectOptions();
    },
  },
  components: {
    // hCitySelect,
    hScroll,
    hListView,
  },
  destroyed() {
    this.resetTime = null;
  },
};

</script>
<style lang="scss" scoped>
  .modal {
    width: 100%;
    height: calc(100vh - 130px);
    z-index: 2;
    opacity: 0.7;
    background: #000;
  }

  .header-chat_icon {
    vertical-align: middle;
  }

  .sale_btn {
    color: $color_theme;
    font-size: rem(15);
  }

  .search-box {
    display: flex;
    background: #f2f2f2;

    .van-search .van-cell {
      border-radius: 3px;
    }

    .address-select {
      flex: 1;
      min-width: 6em;
      line-height: 45px;
      display: flex;
      text-align: center;
      justify-content: space-around;
      align-items: center;

      i {
        font-style: normal;
      }
    }

    .car-search {
      flex: 5;
    }
  }

  .city-comp-box {
    position: fixed;
    top: 100px;
    bottom: 0;
    left: rem(15);
    right: rem(15);
    background-color: #333;
    border-radius: rem(3);
  }

  .orderby-select_box {
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: $font_theme;
    position: relative;

    span {
      flex: 2;
      text-align: center;
      height: 100%;
      line-height: 40px;

      &.selected {
        em {
          color: #0198e7;
        }
      }

      em {
        display: inline-block;
        font-style: normal;
        max-width: 4em;
        max-height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }

      i {
        vertical-align: middle;
      }

      &.orderby-select_reset {
        max-width: rem(30);
        text-align: center;

        &.circle {
          transform: rotate(720deg);
        }

        img {
          vertical-align: middle;
          width: rem(20);
          height: auto;
        }
      }
    }

    .orderby-select_option {
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
      border-right: rem(0.1) solid #fff;
      border-left: rem(0.1) solid #fff;
      width: auto;
      height: auto;
      z-index: 3;

      ul {
        width: 100%;
        height: auto;
        background: #fff;
        border-right: rem(14) solid #fff;
        border-left: rem(14) solid #fff;
        box-sizing: border-box;

        &.orderby-select_default {
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
              text-align: left;
            }

            &.selected {
              color: #0198e7;
            }
          }
        }

        &.orderby-select_first,
        &.orderby-select_price {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          padding-top: rem(25);

          li {
            flex: 1;
            min-width: rem(90);
            max-width: rem(90);
            line-height: rem(25);
            margin-bottom: rem(20);
            margin-right: rem(30);
            border-radius: rem(3);
            text-align: center;
            background: #f2f2f2;
            box-sizing: border-box;

            &:nth-child(3n) {
              margin-right: 0;
            }

            &.selected {
              color: $font_theme;
              box-shadow: 0 0 0 1px #0198e7;
              background: #e3f5ff;
            }
          }
        }
      }

      .brandScrollWrap {
        height: 100%;
        width: 100%;
        overflow: hidden;
        background: red;
        position: relative;

        .reset-brand_btn {
          position: absolute;
          right: rem(15);
          top: 0;
          line-height: 30px;
          padding: 0 rem(10);
          background: $color_theme;
          color: #fff;
          border-radius: rem(3);
        }
      }
    }
  }

  .scroll-box {
    width: 100%;
    height: auto;
    overflow: hidden;
    position: absolute;
    top: 85px;
    bottom: 0;

    .load-state_msg {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      text-align: center;
      line-height: 30px;
      z-index: 1;

      span {
        line-height: 30px;
        vertical-align: middle;
      }

      .load-state_icon {
        animation: rotate 1s linear infinite;
      }

      .load-complete_icon,
      .load-state_icon {
        line-height: 30px;
        vertical-align: middle;
      }
    }
  }

  .car-list_box {
    width: 100%;
    height: auto;
    z-index: 2;
    background: #fff;

    .car-list_item {
      width: auto;
      height: 90px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0 rem(15);
      padding: 20px 0;
      z-index: 3;
      background: #fff;

      .car-thumb {
        width: rem(135);
        position: relative;
        overflow: hidden;

        img {
          width: 100%;
          height: 90px;
        }

        p {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          text-align: center;
          background: $color_vice;
          color: #fff;
          font-size: rem(12);
          line-height: rem(20);
        }
      }

      .car-info {
        flex: 1;
        padding-left: rem(15);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;

        p.title {
          color: #2e2e2e;
          font-family: $font_bold;
          font-size: rem(15);
        }

        p.price {
          color: #999;
          font-size: rem(13);
        }

        p.highlight {
          color: $color_vice;

          span {
            font-size: rem(20);
            display: inline-block;
            padding: 0 rem(3);
          }
        }
      }
    }
  }

</style>

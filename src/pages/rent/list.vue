<template>
  <div class="container" ref="container">
    <h-header title="租车" ref="header">
      <p slot="right" class="search-car_btn">
        <van-icon class="search-car_icon" name="search" />
        <span>搜车</span>
      </p>
    </h-header>
    <div class="type-filter_box van-hairline--bottom" ref="filter">
      <div
        class="type-filter_item"
        :class="{'selected': filter.no===currentOpenSelect}"
        v-for="filter in filterOptions"
        :key="filter.no"
        @click="setFilter(filter.no)"
        >
        <span>{{filter.name}}</span>
        <i class="triangle-down_icon" :class="{'turn-up': filter.no===currentOpenSelect}"></i>
      </div>
      <div class="selected-data_list" v-show="selectedDataShow.length">
123
      </div>
      <div class="filter-options_box" ref="options">
        <div class="brandScrollWrap" v-show="currentOpenSelect === 1">
          <h-list-view :len="currentOpenSelect" :data="brandList" @select="brandSelected"></h-list-view>
        </div>
        <div class="filter-byprice_options" v-show="currentOpenSelect === 2">
          <span class="filter-byprice_option"
            :class="{selected:option===selectedData.downPay}"
            v-for="(option, index) in filterOptions[1].options"
            :key="index"
            @click="setByPrice(option)"
          >
          {{option}}
          </span>
        </div>
        <div class="filter-bymode_box" v-show="currentOpenSelect === 3">
          <!-- <div class="filter-bymodes"> -->
            <div class="mode-options_content" v-for="(modes, index) in filterOptions[2].options" :key="index">
              <span class="mode-options_name">{{modes.name}}</span>
              <ul class="mode-options_list">
                <li
                  class="mode-options_item"
                  :class="{selected:mode.id===(selectedData[modes.type] && selectedData[modes.type].id)}"
                  v-for="(mode, i) in modes.options"
                  :key="i"
                  @click="setByMode(modes.type, mode)"
                >
                  {{mode.name}}
                </li>
              </ul>
            </div>
            <div class="filter-bymode_sure" @click="filterHandle">确认</div>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <h-scroll class="scroll-box" :listenScroll="true" @scroll="loadMore" :pullup="true" @scrollToEnd="scrollToEnd" ref="scrollCar">
      <div class="car-list_box">
        <div v-for="(n, i) in 5" :key="i">
        <div class="car-list_item van-hairline--bottom" v-for="car in carList" :key="car.id">
          <div class="car-info_thumb"><img v-lazy="car.thumb"></div>
          <div class="car-info_desc">
            <p class="car-info_title"><strong>{{car.title}}</strong><h-tag class="car-driver_tag" v-if="car.tags" :tag="car.tags"></h-tag></p>
            <p class="car-info_mode">{{car.subTitle}}</p>
            <h-tag class="car-info_tags" v-if="car.acts" :tag="car.acts.substr(5)"></h-tag><!--v-for="(tag, index) in car.tags" :key="index"-->
            <p class="car-info_price"><span>￥<strong>{{car.payment}}</strong>/日均</span><span class="car-info_km"><i class="select-map_icon"></i>距离{{car.km || 2.3}}km</span></p>
          </div>
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
  </div>
</template>
<script>
import hHeader from '@/components/hHeader';
import hTag from '@/components/hTag';
import {fetchCar} from '@/api/car/carList';
import hScroll from '@/components/hScroll';
import hListView from '@/components/hListView';
import Storage from 'good-storage';
import {fetchBrands} from '@/api/common/brand';
import originFilterOptions from './config/index.js';
export default {
  name: 'rentList',
  data() {
    return {
      currentOpenSelect: -1,
      defaultResponseData: {
        lx: 'rentings',
        size: 1,
        page: 1,
      },
      selectedData: {
        lat: 29.30558,
        lon: 120.07468,
      },
      filterOptions: null,
      loadMoreHeight: {
        scrollBoxHeight: null,
        carListBoxHeight: null,
        loading: -1,
        loadComplete: false,
        carTotal: 0,
        msg: '加载中',
      },
      carList: [],
      // brandList: [],
      fixedBrandList: [],
    };
  },
  created() {
    this._initPage();
  },
  mounted() {
    this.getBrandList();
  },
  watch: {
    selectedData() {
      // this.filterHandle();
    },
  },
  computed: {
    brandList() {
      if (this.currentOpenSelect === 1) {
        return this.filterOptions[0].options;
      } else {
        return [];
      }
    },
    selectedDataShow() {
      let showArr = [];
      Object.keys(this.selectedData).map(key => {
        console.log(key);
        if (this.selectedData[key] && key !== 'lat' && key !== 'lon') {
          // showArr.push({
          //   [key]: this.selectedData[key],
          // });
          showArr.push(this.selectedData[key]);
        }
      });
      return showArr;
    },
  },
  methods: {
    setFilter(no) {
      if (this.currentOpenSelect === no) {
        this.currentOpenSelect = -1;
        return;
      }
      this.currentOpenSelect = no;
    },
    filterHandle() {
      this.currentOpenSelect = -1;
      this.defaultResponseData.page = 1;
      this.getCarList();
    },
    setByMode(type, mode) {
      console.log(type, mode);
      this.$set(this.selectedData, type, mode);
    },
    setByPrice(option) {
      if (this.selectedData.downPay && option === this.selectedData.downPay) {
        // delete this.selectedData.downPay;
        this.$set(this.selectedData, 'downPay', null);
        return;
      }
      this.$set(this.selectedData, 'downPay', option);
      // this.filterHandle();
    },
    brandSelected(item) {
      this.selectedData.brand = {
        name: item.name,
        id: item.id,
      };
      // this.filterHandle();
    },
    async getCarList(loadMore = false) {
      // let defaultResponse = this.defaultResponseData;
      let response = Object.assign({}, this.defaultResponseData, this.selectedData, {searchText: this.searchText});
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
      let boxHeight = this.$refs.container.offsetHeight;
      let filterHeight = this.$refs.filter.offsetHeight;
      // console.log(this.$refs.header.$el.offsetHeight);
      let headerHeight = this.$refs.header.$el.offsetHeight;
      let brandBox = this.$refs.options;
      // console.log('brandBox:', headerHeight);
      let maxHeight = boxHeight - filterHeight - headerHeight - 30 + 'px';
      brandBox.style.maxHeight = maxHeight;
      document.querySelector('.brandScrollWrap').style.height = maxHeight;
      this.filterOptions[0].options = Storage.get('brandList');
      // this.fixedBrandList = Storage.get('brandList');
    },
    loadMore(pos) {
      if (!this.loadMoreHeight.scrollBoxHeight) {
        this.loadMoreHeight.scrollBoxHeight = document.querySelector('.scroll-box').offsetHeight;
      }
      if (!this.loadMoreHeight.carListBoxHeight) {
        this.loadMoreHeight.carListBoxHeight = document.querySelector('.car-list_box').offsetHeight;
      }
      let scrollBoxHeight = this.loadMoreHeight.scrollBoxHeight;
      let carListBoxHeight = this.loadMoreHeight.carListBoxHeight;
      if (pos.y < scrollBoxHeight - carListBoxHeight - 60 && this.loadMoreHeight.loading < 0) {
        this.loadMoreHeight.loading = 2;
        if (this.defaultResponseData.size * this.defaultResponseData.page >= this.loadMoreHeight.carTotal) {
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
    getFilterOptions() {
      this.filterOptions = originFilterOptions;
    },
    _initPage() {
      this.getCarList();
      this.getFilterOptions();
    },
  },
  components: {
    hHeader,
    hTag,
    hScroll,
    hListView,
  },
};
</script>
<style lang="scss" scoped>
.modal{
    width: 100%;
    height: calc(100vh - 84px);
    z-index: 2;
    opacity: 0.7;
    background: #000;
  }
.search-car_btn{
  span, .search-car_icon{
    vertical-align: middle;
    color: $font_vice;
  }
}
.type-filter_box{
  width: auto;
  height: rem(40);
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  .type-filter_item{
    flex: 1;
    text-align: center;
    color: $font_theme;
    &.selected{
      span{
        color: #0198E7;
      }
    }
    span{
      margin-right: rem(5);
    }
  }
  .filter-options_box{
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    height: auto;
    z-index: 3;
    background: #FFF;
  }
  .brandScrollWrap{
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: red;
    position: relative;
  }
  .filter-byprice_options{
    display: flex;
    justify-content:flex-start;
    align-items: center;
    flex-wrap: wrap;
    padding-top: rem(25);
    width: auto;
    border-right: rem(15) solid #FFF;
    border-left: rem(15) solid #FFF;
    span.filter-byprice_option{
      flex: 1;
      min-width: rem(90);
      max-width: rem(90);
      line-height: rem(25);
      height: rem(25);
      margin-bottom: rem(20);
      margin-right: rem(30);
      border-radius: rem(3);
      text-align: center;
      background: #F2F2F2;
      box-sizing: border-box;
      &:nth-child(3n){
        margin-right: 0;
      }
      &.selected{
        color: $font_theme;
        box-shadow: 0 0 0 1px #0198E7;
        background: #E3F5FF;
      }
    }
  }
  .filter-bymode_box{
    width: auto;
    height: auto;
    padding: 0 rem(15);
    .mode-options_content{
      width: auto;
      height: auto;
      .mode-options_name{
        display: block;
        font-size: rem(14);
        color: $font_theme;
        font-family: $font_bold;
        font-weight: bold;
        margin: rem(15) 0;
      }
      .mode-options_list{
        width: auto;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .mode-options_item{
          flex: 1;
          min-width: rem(90);
          max-width: rem(90);
          line-height: rem(25);
          height: rem(25);
          margin-bottom: rem(20);
          margin-right: rem(30);
          border-radius: rem(3);
          text-align: center;
          background: #F2F2F2;
          box-sizing: border-box;
          &:nth-child(3n){
            margin-right: 0;
          }
          &.selected{
            color: $font_theme;
            box-shadow: 0 0 0 1px #0198E7;
            background: #E3F5FF;
          }
        }
      }
    }
    .filter-bymode_sure{
      width: auto;
      height: rem(40);
      border-radius: rem(3);
      background: $color_theme;
      color: #FFF;
      font-size: rem(15);
      margin:0 auto rem(15);
      line-height: rem(40);
      text-align: center;
    }
  }
  .selected-data_list{
    position: absolute;
    right: 0;
    left: 0;
    top: 40px;
    bottom: 0;
    height: rem(50);
    line-height: rem(50);
  }
}
.scroll-box {
    width: 100%;
    height: auto;
    overflow: hidden;
    position: absolute;
    top: 40px;
    bottom: 0;
    margin-top: 50px;
    .load-state_msg{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      text-align: center;
      line-height: 30px;
      z-index: 1;
      span{
        line-height: 30px;
        vertical-align: middle;
      }
      .load-state_icon{
        animation: rotate 1s linear infinite;
      }
      .load-complete_icon, .load-state_icon{
        line-height: 30px;
        vertical-align: middle;
      }
    }
  }
.car-list_box{
  width: auto;
  height: auto;
  .car-list_item{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    padding: rem(20) 0;
    margin: 0 rem(15);
    .car-info_thumb{
      flex: 1.4;
      margin-right: rem(16);
      img{
        width: 100%;
        height: auto;
      }
    }
    .car-info_desc{
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: auto;
      min-height: 90px;
      .car-info_title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        strong{
          font-family: $font_bold;
          font-weight: bold;
          color: #2E2E2E;
          font-size: rem(15);
        }
        .car-driver_tag{
          // float: right;
          background: #999;
          color: #FFF;
          margin-right: 0;
        }
      }
      .car-info_mode{
        color: #2E2E2E;
        font-size: rem(13);
      }
      .car-info_tags{
        border-radius: rem(8);
        margin-right: rem(5);
        font-size: rem(10);
        color: #FFF;
        background: $color_vice;
      }
      .car-info_price{
        font-size: rem(13);
        display: flex;
        justify-content: space-between;
        align-items: center;
        span:first-child{
          color: $color_vice;
          strong{
            font-size: 1.3em;
          }
        }
        span:last-child{
          // float: right;
          color: $font_vice;
          i{
            vertical-align: baseline;
            margin-right: rem(5);
            filter: grayscale(100%);
          }
        }
      }
    }
  }
}
</style>

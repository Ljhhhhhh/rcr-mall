<template>
  <div class="container">
    <h-header title="车辆详情" :hasBack="false">
      <van-icon name="chat" slot="right" size="22px" class="header-chat_icon" />
    </h-header>
    <div class="search-box">
      <div class="address-select" @click="selectCity">
        <span>金华</span>
        <i class="triangle-down_icon"></i>
      </div>
      <div class="car-search">
        <van-search v-model="value" placeholder="请输入搜索关键词" show-action @search="onSearch">
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </div>
    </div>
    <div class="orderby-select_box">
      <span>默认排序<i class="triangle-down_icon"></i></span>
      <span>品牌<i class="triangle-down_icon"></i></span>
      <span>首付<i class="triangle-down_icon"></i></span>
      <span>车价<i class="triangle-down_icon"></i></span>
    </div>
    <p>hello world</p>
    <transition name="slide">
      <router-view class="router-view_fullpage"></router-view>
    </transition>
    <transition name="topin">
      <div class="city-comp-box" v-show="cityObj.show">
        <h-city-select></h-city-select>
      </div>
    </transition>
  </div>
</template>
<script>
import hCitySelect from '@/components/hCitySelect';
export default {
  data() {
    return {
      value: '',
      cityObj: {
        show: false,
      },
    };
  },
  methods: {
    selectCity() {
      this.cityObj.show = !this.cityObj.show;
    },
    onSearch() {
      console.log(123);
    },
  },
  components: {
    hCitySelect,
  },
};
</script>
<style lang="scss" scoped>
  .header-chat_icon {
    vertical-align: middle;
  }
  .search-box{
    display: flex;
    background: #F2F2F2;
    .van-search .van-cell{
      border-radius: 3px;
    }
    .address-select{
      flex: 1;
      max-width: 6em;
      line-height: 45px;
      display: flex;
      text-align: center;
      justify-content:space-around;
      align-items: center;
      i{
        font-style: normal;
      }
    }
    .car-search{
      flex: 5;
    }
  }
  .city-comp-box{
    position: fixed;
    top: 100px;
    bottom: 0;
    left: rem(15);
    right: rem(15);
    background-color: #333;
    border-radius: rem(3);
  }
  .orderby-select_box{
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    span{
      flex: 1;
      text-align: center;
      i{
        display: block;
        padding-left: 1em;
      }
    }
  }
</style>

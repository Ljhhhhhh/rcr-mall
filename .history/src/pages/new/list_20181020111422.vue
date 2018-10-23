<template>
  <div class="container">
    <h-header title="车辆详情" :hasBack="false">
      <van-icon name="chat" slot="right" size="22px" class="header-chat_icon" />
    </h-header>
    <div class="search-box">
      <div class="address-select" @click="selectCity">
        <span>金华</span>
        <i class="triangle-down_icon">1</i>
      </div>
      <div class="car-search">
        <van-search v-model="value" placeholder="请输入搜索关键词" show-action @search="onSearch">
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </div>

    </div>
    <p>hello world</p>
    <transition name="slide">
      <router-view class="router-view_fullpage"></router-view>
    </transition>
    <transition name="topin">
      <h-city-select></h-city-select>
    </transition>
  </div>
</template>
<script>
import hCitySelect from '@/components/hCitySelect';
export default {
  data() {
    return {
      value: '',
    };
  },
  methods: {
    selectCity() {
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
</style>

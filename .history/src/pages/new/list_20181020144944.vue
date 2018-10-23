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
    <div class="orderby-select_box van-hairline--bottom">
      <span><em>默认排序</em><i class="triangle-down_icon"></i></span>
      <span><em>品牌</em><i class="triangle-down_icon"></i></span>
      <span><em>首付</em><i class="triangle-down_icon"></i></span>
      <span><em>车价</em><i class="triangle-down_icon"></i></span>
    </div>
    <div class="car-list_box">
      <div class="car-list_item van-hairline--bottom">
        <div class="car-thumb">
          <p>直降200</p>
          <img src="http://testimgs.chetianyi.com/uploads/cars/20181016/56c48603689643f398c573a3399518bd.jpg">
        </div>
        <div class="car-info">
          <p class="title">奥迪Q3 2018款 30TFSI 自动 时尚型 </p>
          <p class="price">厂商指导价：26.56万</p>
          <p class="highlight">首付<span>2.56</span>万开回家</p>
        </div>
      </div>
    </div>
    <p>hello world</p>
    <transition name="slide">
      <router-view class="router-view_fullpage"></router-view>
    </transition>
    <transition name="topin">
      <div class="city-comp-box" v-show="cityObj.show">
        <!-- <h-city-select></h-city-select> -->
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
    color: $font_theme;
    span{
      flex: 1;
      text-align: center;
      em{
        display: inline-block;
        padding-right: rem(5);
        font-style: normal;
      }
    }
  }
  .car-list_box{
    width: 100%;
    height: auto;
    .car-list_item{
      width: auto;
      height: 90px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 20px rem(15);
      padding: 20px 0;
      .car-thumb{
        width: rem(135);
        position: relative;
        overflow: hidden;
        img{
          width: 100%;
          height: 90px;
        }
        p{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          text-align: center;
          background: $color_vice;
          color: #FFF;
          font-size: rem(12);
          line-height: rem(20);
        }
      }
      .car-info{
        flex: 1;
        padding-left: rem(15);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        p.title{
          color:#2E2E2E;
          font-family: $font_bold;
          font-size: rem(15);
        }
        p.price{
          color: #999;
          font-size: rem(13);
        }
        p.highlight{
          color: $color_vice;
        }
      }
    }
  }
</style>

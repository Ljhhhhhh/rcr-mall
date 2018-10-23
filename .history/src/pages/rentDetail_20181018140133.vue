<template>
  <div class="container detail">
    <h-header :title="carInfo.name || ''">
      <i class="share" slot="right" @click="share"></i>
    </h-header>
    <div class="scroll-wrap">
      <div class="scroll-content">
        <div class="banner" v-if="bannerList.length">
          <swiper :options="swiperOption" ref="mySwiper" @slideChange="bannerChange">
            <swiper-slide v-for="(banner, index) in bannerList" :key="index">
              <img :src="banner.url">
            </swiper-slide>
          </swiper>
          <div class="indicators">
            {{bannerIndex | padStartIndex(bannerList)}}/{{bannerList.length}}
          </div>
        </div>
        <div class="car-info_box">
          <div class="car-info_title">
            <span>{{carInfo.name}}</span>
            <h-tag
             :tag="tag.tag"
             class="tag"
             v-for="(tag, index) in carInfo.tags" :key="index"
             :style="{background: '#999999',color:'#FFF'}" />
          </div>
          <div class="car-info_conf">
            <span v-for="(conf, index) in carInfo.conf" :key="index">{{conf}}</span>
          </div>
          <p class="car-info_offers">
            <span v-for="(active, index) in carInfo.actives" :key="index">{{active.name}}</span>
            <label>浙A***88</label>
          </p>
          <div class="car-info_price">
            <p>￥<strong>{{carInfo.payment}}</strong>日均</p><!-- <span>(市场价288元)</span> -->
            <p>￥<strong>{{}}</strong>/小时</p>
          </div>
        </div>
        <div class="partition"></div>
        <div class="net-info_box">
          <div class="net-info_content">
            <p class="net-info_title">
              <i></i>
              <span>义乌经发大道店-人车人</span>
            </p>
            <p>金华市义乌市经发大道455号</p>
            <p>营业时间：08:00-22:00</p>
            <p>服务热线：0579-88886666</p>
          </div>
          <div class="net-info_nevigate">
            <i></i>
            <span>导航</span>
          </div>
        </div>
        <div class="partition"></div>
        <div class="car-rent_process">
          <p class="car-rent_title">
            <i></i>
            <span>租车流程</span>
          </p>
          <div class="rent-process_box">
            <p class="rent-process_title">
              <i class="first"></i>
              <span>预约到店</span>
              </p>
            <p class="rent-process_desc">在APP内预约成功后，我们的销售顾问会在24小时内为您安排1对1服务</p>
          </div>
          <div class="rent-process_box">
            <p class="rent-process_title">
              <i class="second"></i>
              <span>支付费用</span>
              </p>
            <p class="rent-process_desc">在门店支付订单所需费用</p>
          </div>
          <div class="rent-process_box">
            <p class="rent-process_title">
              <i class="third"></i>
              <span>使用车辆</span>
              </p>
            <p class="rent-process_desc">用车过程中如遇到任何问题可随时联系取车门店，我 们会在第一时间解决您遇到的问题</p>
          </div>
          <div class="rent-process_box">
            <p class="rent-process_title">
              <i class="fourth"></i>
              <span>费用结算</span>
              </p>
            <p class="rent-process_desc">还车，结算租车费用。车辆押金实时退还，违章押金 会在还车后一个礼拜内退还</p>
          </div>
        </div>
      </div>
    </div>
    <keep-alive>
      <h-consult></h-consult>
    </keep-alive>
  </div>
</template>
<script>
import hHeader from '@/components/hHeader';
import hConsult from '@/components/hConsult';
import BScroll from 'better-scroll';
import clearupList from '@/utils/clearupAlbumlist';
import hTag from '@/components/hTag';
import {
  fetchCarAlbum,
} from '@/api/car/carAlbum';
import {carDetail} from '@/api/car/carDetail';
import 'swiper/dist/css/swiper.css';
import {
  swiper,
  swiperSlide,
} from 'vue-awesome-swiper';
export default {
  name: 'rentDetail',
  data() {
    return {
      carId: 14,
      carInfo: {},
      scroll: null,
      swiperOption: { // swipe配置
        loop: true,
      },
      bannerIndex: 1,
      bannerList: [],
      confListMap: [
        'gear_type',
        'liter',
        'seat_number',
      ], // 配置列表
      offerList: [
        '立减优惠',
        '满7减1',
      ], // 活动列表
    };
  },
  created() {
    // this.getBannerList();
    this.getCarDetail();
  },
  mounted() {
    this._initPage();
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  methods: {
    async getCarDetail() {
      let res = await carDetail(this.carId);
      let data = res.data;
      console.log(data);
      this.bannerList = clearupList(data.imgs);
      this.carInfo = data.modes[0];
      this.carInfo.tags = data.tags;
      this.carInfo.conf = [];
      this.confListMap.forEach(conf => {
        if (this.carInfo[conf]) {
          if (conf === 'seat_number') {
            this.carInfo[conf] += '座';
          }
          this.carInfo.conf.push(this.carInfo[conf]);
        }
      });
      this.carInfo.actives = data.acts;
      this.carInfo.payment = data.payment;
    },
    async getBannerList() {
      let res = await fetchCarAlbum();
      // 整理banner列表，使其按照type归类
      this.bannerList = clearupList(res.items);
    },
    bannerChange() {
      this.bannerIndex = this.swiper.realIndex + 1;
    },
    share() {
      alert('APP实现分享功能');
    },
    _initPage() {
      this.scroll = new BScroll('.scroll-wrap', {
        click: true,
        probeType: 2,
      });
    },
  },
  components: {
    hHeader,
    hTag,
    hConsult,
    swiper,
    swiperSlide,
  },
};

</script>
<style lang="scss" scoped>
  $rent_sprit: url('~static/images/rent-css_sprites.png') no-repeat;
  .partition{
    width: 100%;
    height: 10px;
    background: #F2F2F2;
    margin: 15px auto;
  }
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
  .car-info_box{
    width: auto;
    height: auto;
    padding: 0 rem(15);
    .car-info_title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: rem(18);
      span{
        flex: 1;
        color: $font_vice;
        font-size: rem(14);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tag{
        max-width: 5em;
        margin-right: 0;
        margin-left: rem(5);
      }
    }
    .car-info_conf{
      width: auto;
      height: auto;
      line-height: rem(15);
      margin-top: 15px;
      span{
        display: inline-block;
        padding: 0 rem(15);
        position: relative;
        font-family: $font_bold;
        color: $font_theme;
        font-size: rem(15);
        &::before{
          position: absolute;
          content: '';
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 7px;
          height: 7px;
          background: #999;
          border-radius: 50%;
        }
      }
    }
    .car-info_offers{
      line-height: rem(16);
      margin-top: 15px;
      span{
        display: inline-block;
        width: rem(50);
        height: rem(15);
        font-size: rem(10);
        line-height: rem(15);
        margin-right: rem(15);
        background: $color_vice;
        text-align: center;
        border-radius: rem(10);
        color: #FFF;
        padding: rem(2) rem(5);
      }
      label{
        float: right;
        color: #666;
        font-size: rem(13);
        line-height: rem(15);
        height: rem(15);
      }
    }
    .car-info_price{
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p:first-child{
        color: $color_vice;
        strong{
          font-size: 1.3em;
        }
        span{
          color: $font_vice;
          text-decoration: line-through;
        }
      }
      p:last-child{
        color: #999;
        strong{
          font-size: 1.3em;
          color: $font_vice;
        }
      }
    }
  }
  .net-info_box{
    width: auto;
    height: auto;
    padding: 0 rem(15);
    position: relative;
    .net-info_content{
      p.net-info_title{
        font-size: rem(15);
        color: $font_theme;
        text-indent: 0;
        margin: 0 0 14px 0;
        i{
          display: inline-block;
          width: 10px;
          height: 13px;
          background: $rent_sprit;
          background-size: 171px 32px;
          background-position: -2px -2px;
          vertical-align: middle;
        }
        span{
          display: inline-block;
          vertical-align: middle;
          margin-left: 5px;
        }
      }
      p{
        text-indent: 1em;
        line-height: rem(13);
        font-size: rem(13);
        margin-left: 5px;
        color: $font_vice;
        margin-top: 10px;
      }
    }
    .net-info_nevigate{
      position: absolute;
      right: rem(15);
      bottom: 0;
      width: 30px;
      height: auto;
      i{
        display: block;
        width: 30px;
        height: 30px;
        background: $rent_sprit;
        background-size: 180px 34px;
        background-position: -148px -2px;
      }
      span{
        display: block;
        color: $font_vice;
        font-size: rem(12);
        line-height: rem(12);
        margin-top: 5px;
        text-align: center;
      }
    }
  }
  .car-rent_process{
    width: auto;
    height: auto;
    padding: 0 rem(15);
    .car-rent_title{
      margin-bottom: 25px;
      i{
        display: inline-block;
        width: 13px;
        height: 13px;
        background: $rent_sprit;
        background-size: 171px 32px;
        background-position: -15px -2px;
        vertical-align: middle;
      }
      span{
        display: inline-block;
        vertical-align: middle;
        margin-left: 5px;
      }
    }
    .rent-process_box{
      width: auto;
      height: auto;
      padding-bottom: 17px;
      position: relative;
      &::before{
        position: absolute;
        content: '';
        width: 0;
        height: calc(100% - 25px);
        border-right: 1px dashed #363636;
        left: 12px;
        top: 24px;
      }
      &:last-child::before{
        display: none;
      }
      .rent-process_title{
        i{
          display: inline-block;
          width: 25px;
          height: 25px;
          background: $rent_sprit;
          background-size: 183px 33px;
          vertical-align: middle;
          margin-right: rem(10);
          &.first{
            background-position: -93px -2px;
          }
          &.second{
          background-position: -122px -2px;
          }
          &.third{
            background-position: -64px -2px;
          }
          &.fourth{
            background-position: -34px -2px;
          }
        }
        span{
          vertical-align: middle;
          font-family: $font_bold;
          color: $font_theme;
        }
      }
      .rent-process_desc{
        margin-top: 9px;
        padding-left: rem(38);
        font-size: rem(13);
        line-height: rem(18);
        color: $font_vice;
      }
    }
  }
</style>

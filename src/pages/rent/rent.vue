<template>
  <div class="container">
    <h-header title="租车" :hasBack="false" ref="header">
      <van-icon name="chat" slot="right" size="22px" class="header-chat_icon" />
    </h-header>
    <div class="rent-list_banner"></div>
    <div class="rent-main_control">
      <div class="rent-address_select van-hairline--bottom">
        <!-- <div class="address-select" @click="selectCity">
          <span>{{area.name || '选择城市'}}</span>
          <i class="triangle-down_icon"></i>
        </div> -->
        <div class="select-map_btn">
          <p><i class="select-map_icon"></i><span dir="rtl">{{address || '获取地址中...'}}</span></p>
          <!-- <div class="icon">
            <i class="triangle-down_icon"></i>
          </div> -->
        </div>
      </div>
      <div class="rent-time_select  van-hairline--bottom">
        <div class="rent-time" @click="selectTime('get')">
          <p class="rent-time_title">取车时间</p>
          <strong class="rent-time_date">{{timeObj.getCarTime | formatTime}}</strong>
          <!-- <p class="rent-time_clock">今天12：00</p> -->
        </div>
        <div class="rent-time_count">
          <div class="rent-time_calc">
            {{totalDay}}天
          </div>
        </div>
        <div class="rent-time" @click="selectTime('back')">
          <p class="rent-time_title">还车时间</p>
          <strong class="rent-time_date">{{timeObj.backCarTime | formatTime}}</strong>
          <!-- <p class="rent-time_clock">周一15：00</p> -->
        </div>
      </div>
      <div class="rent-back_btn">去选车</div>
    </div>
    <div class="rent-advantage_box">
      <div v-for="(advantage, index) in advantageList" :key="index">
        <p class="img"><img v-lazy="advantage.icon"></p>
        <p v-html="advantage.title"></p>
        <p v-html="advantage.desc"></p>
      </div>
    </div>

    <van-popup v-model="timeObj.datetimeShow" position="bottom" class="datetime-select_popup">
      <van-nav-bar
        right-text="确定"
        left-arrow
        @click-left="closeTime"
        @click-right="sureTime"
      >
      <span slot="title" class="datetime-title">取车时间</span>
      <span slot="left" class="datecancel-btn">取消</span>
      </van-nav-bar>
      <div class="datetime-type_toggle">
        <div class="datetime-type_item" :class="{active: timeObj.currentDateType==='get'}" @click="toggleTimeType('get')">
          <p class="datetime-type_title">取车时间</p>
          <p class="datetime-type_date">{{timeObj.getCarTime | formatTime}}</p>
        </div>
        <div class="datetime-type_item" :class="{active: timeObj.currentDateType==='back'}" @click="toggleTimeType('back')">
          <p class="datetime-type_title">还车时间</p>
          <p class="datetime-type_date">{{timeObj.backCarTime | formatTime}}</p>
        </div>
      </div>
      <van-datetime-picker
        v-if="timeObj.currentDateType==='get'"
        :show-toolbar="false"
        v-model="timeObj.getCarTime"
        type="date"
        :min-date="minDate"
        @confirm="datetimeSelect"
      />
      <van-datetime-picker
        v-else
        :show-toolbar="false"
        v-model="timeObj.backCarTime"
        type="date"
        :min-date="new Date(timeObj.getCarTime)"
        @confirm="datetimeSelect"
      />
    </van-popup>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import dayjs from 'dayjs';
import {getAppid} from '@/api/common/getAppid';
import wx from 'weixin-js-sdk';
// import axios from 'axios';
// import AMap from 'vue-amap';

export default {
  name: 'rent',
  data() {
    return {
      // AMap: Vue.AMap,
      timeObj: {
        datetimeShow: false,
        getCarTime: new Date(),
        backCarTime: new Date(),
        currentDateType: 'get',
      },
      minDate: new Date(),
      address: '',
      bannerUrl: 'static/images/rent-list_banner.png',
      advantageList: [
        {icon: 'static/images/rent-service_map.png', title: '100<sup>+</sup>城市', desc: '2000<sup>+</sup>服务网点'},
        {icon: 'static/images/rent-service_car.png', title: '200<sup>+</sup>车型', desc: '30000<sup>+</sup>车辆'},
        {icon: 'static/images/rent-service_advance.png', title: '7*24客服', desc: '金牌客服为您服务'},
      ],
    };
  },
  created() {
    this.getAppid();
  },
  computed: {
    totalDay() {
      return dayjs(this.timeObj.backCarTime).diff(dayjs(this.timeObj.getCarTime), 'days');
    },
    ...mapGetters([
      'area',
    ]),
  },
  methods: {
    async getAppid() {
      // let href = window.location.href;
      let href = 'http://testmb.chetianyi.com/#/rent';
      let res = await getAppid(href);
      let me = this;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.appid, // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.noncestr, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名
        jsApiList: ['getLocation'], // 必填，需要使用的JS接口列表
      });
      wx.ready(function() {
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: async function (res) {
            let lnglats = [res.longitude, res.latitude];
            // eslint-disable-next-line
            AMap.plugin('AMap.Geocoder', function() {
              // eslint-disable-next-line
              var geocoder = new AMap.Geocoder({});
              geocoder.getAddress(lnglats, function(status, address) {
                console.log(status, 121655614651, address);
                if (status === 'complete' && address.info === 'OK') {
                  // result为对应的地理位置详细信息
                  me.address = address.regeocode.formattedAddress;
                }
              });
            });
          },
          fail: function(err) {
            console.log('error:', err);
          },
        });
      });
      wx.error(function(err) {
        console.log('wxerr:', err);
      });
      // console.log(res);
    },
    toggleTimeType(type) {
      // if (type === 'back' && !this.timeObj.getCarTime) {
      //   type = 'get';
      // }
      this.timeObj.currentDateType = type;
    },
    closeTime() {
      this.timeObj.datetimeShow = false;
    },
    sureTime() {
      this.timeObj.datetimeShow = false;
    },
    datetimeSelect(val) {
      console.log(val);
    },
    onClickCancel() {},
    selectTime(type) {
      if (type) {
        this.toggleTimeType(type);
      }
      this.timeObj.datetimeShow = !this.timeObj.datetimeShow;
    },
  },
};
</script>
<style lang="scss" scoped>
.container{
  background: #F2F2F2;
}
.header-chat_icon {
  vertical-align: middle;
}
.rent-list_banner{
  width: 100%;
  padding-top: 42.67%;
  background: url('~static/images/rent-list_banner.png');
  background-size: cover;
  height: auto;
  font-size: 0;
}
.rent-advantage_box{
  position: fixed;
  bottom: 30px;
  right: 0;
  left: 0;
  padding: 0 rem(30);
  display: flex;
  justify-content: space-between;
  align-items: center;
  div{
    flex: 1;
    height: 85px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    font-size: rem(12);
    color: #999;
    p.img{
      height: 45px;
      position: relative;
      margin-top: 0;
      img{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 38px;
        width: auto;
        margin: auto;
      }
    }
  }
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
  .rent-main_control{
    width: auto;
    height: auto;
    margin: rem(-10) rem(15) 0;
    // padding-bottom: rem(25);
    padding: 0 rem(15) rem(25);
    background: #FFF;
    box-shadow:0 rem(2) rem(3) 0 rgba(4,0,0,0.2);
    border-radius:rem(3);
    .rent-address_select{
      // display: flex;
      justify-content: space-between;
      height: 45px;
      line-height: 45px;
      width: 100%;
      .select-map_btn{
        width: 100%;
        // flex: 1;
        // max-width: 65%;
        position: relative;
        // padding-left: rem(15);
        // background: linear-gradient(to bottom, #fff 30%, #ccc 30%, #ccc 70%, #fff 70%);
        // background-size: 1px 100%;
        // background-repeat: no-repeat;
        p{
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 3%;
          display: inline-block;
          line-height: 45px;
          font-size: rem(15);
          i{
            vertical-align: -2px;
            margin-right: rem(5);
            max-width: 10%;
          }
          span{
            display: inline-block;
            max-width: 90%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: middle;
          }
        }
        div.icon{
          position: absolute;
          right: rem(10);
          top: 50%;
          transform: translate(0, -50%);
        }
      }
    }
    .rent-time_select{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: rem(25) 0;
      position: relative;
      .rent-time{
        .rent-time_title{
          font-size: rem(13);
          color: $font_vice;
          margin-bottom: rem(20);
          line-height: rem(13);
        }
        .rent-time_date{
          font-size: rem(18);
          line-height: rem(18);
          font-family: $font_bold;
          font-weight: bold;
          color: $font_theme;
        }
        .rent-time_clock{
          font-size: rem(13);
          line-height: rem(13);
          color: $font_vice;
          margin-top: rem(9);
        }
      }
      .rent-time_count{
        position: absolute;
        left: 50%;
        top: 50%;
        text-align: center;
        width: rem(67);
        padding-bottom: rem(10);
        transform: translate(-50%, -30%);
        font-size: rem(13);
        color: $font_theme;
        background: url('~static/images/time_arrow.png') no-repeat;
        background-position: bottom;
        background-size: 67px 5px;
      }
    }
    .rent-back_btn{
      border-radius: rem(3);
      color: #FFF;
      width: auto;
      height: rem(40);
      line-height: rem(40);
      margin-top: rem(25);
      background: $color_theme;
      text-align: center;
      font-size: rem(15);
    }
  }
  .datetime-select_popup{
    .datetime-title{
      color: $font_theme;
      font-size: rem(18);
    }
    .datecancel-btn{
      color: #999;
      font-size: rem(15);
    }
    .datetime-type_toggle{
      height: rem(48);
      width: 100%;
      background: #F2F2F2;
      display: flex;
      .datetime-type_item{
        flex: 1;
        width: 50%;
        height: 100%;
        color: $font_theme;
        text-align: center;
        padding-top: rem(5);
        &.active{
          color: #FFF;
          background: $color_theme;
        }
        .datetime-type_title{
          font-size: rem(12);
          line-height: rem(20);
          margin: 0 auto;
        }
        .datetime-type_date{
          font-size: rem(13);
        }
      }
    }
  }
</style>

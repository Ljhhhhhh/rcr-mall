<template>
  <div class="container">
    <h-header title="卖车"></h-header>
    <div class="sale-car_info">
      <div class="sale-car_mode van-hairline--bottom">
        <span>品牌车系</span>
        <p @click="setMode"><span>{{carInfo.mode.name}}</span><i class="arrow-more_icon"></i></p>
      </div>
      <div class="sale-car_load van-hairline--bottom">
        <span>首次上牌</span>
        <p>
          <select id="load">
            <option v-for="(year, index) in yearList" :key="index" :value="year">{{year}}</option>
          </select>
          <label for="load" class="arrow-more_icon"></label>
          <!-- <v-select v-model="selected" :options="['foo','bar']"></v-select> -->
        </p>
      </div>
      <div class="sale-car_city van-hairline--bottom">
        <span>所在城市</span>
        <p @click="setCity"><span>{{area.name}}</span><i class="arrow-more_icon"></i></p>
      </div>
    </div>
    <div class="sale-btn">我要卖车</div>
    <router-view></router-view>
  </div>
</template>
<script>
import {
  mapGetters,
} from 'vuex';
export default {
  name: 'secondSale',
  data() {
    return {
      carInfo: {
        mode: {},
      },
    };
  },
  created() {
    this.getMode();
  },
  computed: {
    yearList() {
      let mode = this.carInfo.mode;
      let minyear = mode.minRegYear;
      let maxyear = mode.maxRegYear;
      let y = [];
      while (Number(minyear) <= maxyear) {
        y.push(minyear++);
      }
      return y;
    },
    ...mapGetters([
      'area',
    ]),
  },
  methods: {
    setCity() {
      this.$router.push({
        name: 'citySelect',
      });
    },
    setMode() {
      this.$router.push({
        name: 'carModeSelect',
      });
    },
    getMode() {
      let mode = this.$route.params.mode;
      if (mode && mode.name) {
        this.carInfo.mode = mode && mode.brand ? mode : {};
      }
    },
  },
};

</script>
<style lang="scss" scoped>
  .sale-car_info {
    width: auto;
    height: auto;
    padding: rem(18) rem(15) 0;

    .sale-car_mode,
    .sale-car_load,
    .sale-car_city {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        position: relative;
        padding-right: rem(15);
        color: $font_theme;

        select {
          border: none;
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          background: #FFF;
          font-size: rem(14);
          color: $font_theme;
        }
      }
    }
  }

  .sale-btn {
    width: auto;
    height: auto;
    margin: 30px rem(15) 0;
    background: $color_theme;
    color: #FFF;
    font-size: rem(15);
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: rem(3);
  }

</style>

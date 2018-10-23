<template>
  <div class="container" ref="container">
    <h-header title="车辆详情" :hasBack="false" ref="header">
      <van-icon name="chat" slot="right" size="22px" class="header-chat_icon" />
    </h-header>
    <div class="search-box" ref="search">
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
      <span ref="select" v-for="(select, index) in selectList" :key="index" :class="{'selected': index===currentOpenSelect}" @click="changeSelect(index)">
        <em>{{select.name}}</em>
        <i class="triangle-down_icon"  :class="{'turn-up': index===currentOpenSelect}"></i>
      </span>
      <transition name="topin" v-show="currentOpenSelect>-1">
        <div class="orderby-select_option" ref="options">
            <ul class="orderby-select_default" v-show="currentOpenSelect === 0">
              <li v-for="(option, i) in selectList[0].options" :key="i" :class="{selected:i===option.active}" class="van-hairline--bottom">
                <span>{{option.tag}}</span>
                <van-icon color="#0198E7" name="success" v-show="i===option.active" />
              </li>
            </ul>
            <div class="brandScrollWrap" v-show="currentOpenSelect === 1">
              <h-list-view :len="currentOpenSelect" :data="selectList[1].options"></h-list-view>
            </div>
        </div>
      </transition>
    </div>
    <h-scroll class="scroll-box">
      <div class="car-list_box">
        <div class="car-list_item van-hairline--bottom" v-for="(car, index) in carList" :key="index">
          <div class="car-thumb">
            <p>{{car.tag}}</p>
            <img :src="car.thumb">
          </div>
          <div class="car-info">
            <p class="title">{{car.name}} </p>
            <p class="price">厂商指导价：{{car.price}}万</p>
            <p class="highlight">首付<span>{{car.first}}</span>万开回家</p>
          </div>
        </div>
      </div>
    </h-scroll>
    <transition name="van-fade">
      <div class="modal" @click="currentOpenSelect = -1" v-show="currentOpenSelect>-1">Fade</div>
    </transition>
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
import hScroll from '@/components/hScroll';
import {fetchBrands} from '@/api/common/brand';
import hListView from '@/components/hListView';
export default {
  data() {
    return {
      carList: [{
        tag: '直降200',
        thumb: 'http://testimgs.chetianyi.com/uploads/cars/20181016/56c48603689643f398c573a3399518bd.jpg',
        name: '奥迪Q3 2018款 30TFSI 自动 时尚型',
        price: '26.56',
        first: '2.56',
      },
      {
        tag: '直降300',
        thumb: 'http://testimgs.chetianyi.com/uploads/cars/20181016/56c48603689643f398c573a3399518bd.jpg',
        name: '奥迪Q3 2018款 30TFSI 自动 时尚型',
        price: '26.56',
        first: '2.56',
      },
      {
        tag: '直降400',
        thumb: 'http://testimgs.chetianyi.com/uploads/cars/20181016/56c48603689643f398c573a3399518bd.jpg',
        name: '奥迪Q3 2018款 30TFSI 自动 时尚型',
        price: '26.56',
        first: '2.56',
      },
      {
        tag: '直降500',
        thumb: 'http://testimgs.chetianyi.com/uploads/cars/20181016/56c48603689643f398c573a3399518bd.jpg',
        name: '奥迪Q3 2018款 30TFSI 自动 时尚型',
        price: '26.56',
        first: '2.56',
      },
      {
        tag: '直降600',
        thumb: 'http://testimgs.chetianyi.com/uploads/cars/20181016/56c48603689643f398c573a3399518bd.jpg',
        name: '奥迪Q3 2018款 30TFSI 自动 时尚型',
        price: '26.56',
        first: '2.56',
      },
      {
        tag: '直降700',
        thumb: 'http://testimgs.chetianyi.com/uploads/cars/20181016/56c48603689643f398c573a3399518bd.jpg',
        name: '奥迪Q3 2018款 30TFSI 自动 时尚型',
        price: '26.56',
        first: '2.56',
      },
      {
        tag: '直降800',
        thumb: 'http://testimgs.chetianyi.com/uploads/cars/20181016/56c48603689643f398c573a3399518bd.jpg',
        name: '奥迪Q3 2018款 30TFSI 自动 时尚型',
        price: '26.56',
        first: '2.56',
      },
      ],
      selectList: [{
        name: '默认排序',
        class: 'orderby-select_default',
        options: [{
          tag: '默认排序',
          active: 0,
        },
        {
          tag: '销量最高',
          active: null,
        },
        {
          tag: '首付最低',
          active: null,
        },
        {
          tag: '月供最低',
          active: null,
        },
        {
          tag: '车价最低',
          active: null,
        },
        {
          tag: '车价最高',
          active: null,
        },
        ],
      },
      {
        name: '品牌',
        class: 'orderby-select_brand',
        options: [],
      },
      {
        name: '首付',
        class: 'orderby-select_first',
        options: [{
          tag: '默认排序',
          active: 0,
        },
        {
          tag: '首付最低',
          active: null,
        },
        {
          tag: '月供最低',
          active: null,
        },
        {
          tag: '车价最低',
          active: null,
        },
        {
          tag: '车价最高',
          active: null,
        },
        ],
      },
      {
        name: '车价',
        class: 'orderby-select_price',
        options: [{
          tag: '默认排序',
          active: 0,
        },
        {
          tag: '首付最低',
          active: null,
        },
        {
          tag: '车价最低',
          active: null,
        },
        {
          tag: '车价最高',
          active: null,
        },
        ],
      },
      ],
      currentOpenSelect: 0,
      value: '',
      cityObj: {
        show: false,
      },
    };
  },
  created () {
    this.getBrandList();
  },
  computed: {
    // currentOptions() {
    //   // console.log(this.selectList[this.currentOpenSelect]);
    //   // if (this.currentOpenSelect < 0) {
    //   //   return [];
    //   // }
    //   return this.selectList[this.currentOpenSelect] ? this.selectList[this.currentOpenSelect].options : [];
    // },
  },
  methods: {
    changeSelect(index) {
      console.log(index);
      if (this.currentOpenSelect === index) {
        this.currentOpenSelect = -1;
      } else {
        this.currentOpenSelect = index;
      }
    },
    selectCity() {
      this.cityObj.show = !this.cityObj.show;
    },
    onSearch() {
      console.log(123);
    },
    async getBrandList() {
      let brandRes = await fetchBrands();
      brandRes.data.sort((a, b) => {
        return a.initial - b.initial
      })
      console.log(brandRes);
      // this.selectList[1].options = brandRes.data;
      let brandObj = {};
      brandRes.data.forEach(brand => {
        // if (brand.initial)
        if (!brandObj[brand.initial]) {
          brandObj[brand.initial] = {
            title: brand.initial,
            items: [],
          };
        }
        brandObj[brand.initial].items.push({
          name: brand.name,
        });
      });

      let ret = [];
      let other = [{
        title: '#',
        items: [],
      }];
      for (let key in brandObj) {
        let val = brandObj[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else {
          other.items.push(val);
        }
      }
      // ret.sort();
      // ret.sort((a, b) => {
      //   return a.title - b.title;
      // });
      // console.log('ret:', ret.concat(other));

      this.selectList[1].options = ret;
      let boxHeight = this.$refs.container.offsetHeight;
      let searchHeight = this.$refs.search.offsetHeight;
      let selectHeight = this.$refs.select[0].offsetHeight;
      let brandBox = this.$refs.options;
      let maxHeight = boxHeight - searchHeight - selectHeight - 50 + 'px';
      brandBox.style.maxHeight = maxHeight;
      document.querySelector('.brandScrollWrap').style.height = maxHeight;
    },
  },
  components: {
    hCitySelect,
    hScroll,
    hListView,
  },
};
</script>
<style lang="scss" scoped>
  .modal{
    width: 100%;
    height: calc(100vh - 130px);
    z-index: 2;
    opacity: 0.7;
    background: #000;
  }
  .header-chat_icon {
    vertical-align: middle;
  }

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
      flex: 1;
      text-align: center;
      height: 100%;
      line-height: 40px;
      &.selected{
        em{
          color: #0198E7;
        }
      }

      em {
        display: inline-block;
        padding-right: rem(5);
        font-style: normal;
      }
    }

    .orderby-select_option {
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
      border-right: rem(15) solid #FFF;
      border-left: rem(15) solid #FFF;
      width: auto;
      height: auto;
      z-index: 3;

      ul {
        width: 100%;
        height: auto;
        background: #FFF;
        &.orderby-select_default {
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
              text-align: left;
            }

            &.selected {
              color: #0198E7;
            }
          }
        }
      }
      .brandScrollWrap{
        height: 100%;
        width: 100%;
        overflow: hidden;
        background: red;
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
  }

  .car-list_box {
    width: 100%;
    height: auto;

    .car-list_item {
      width: auto;
      height: 90px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0 rem(15);
      padding: 20px 0;

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
          color: #FFF;
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
          color: #2E2E2E;
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
          }
        }
      }
    }
  }

</style>

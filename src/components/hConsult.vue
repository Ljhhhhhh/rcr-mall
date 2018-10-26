<template>
  <div class="consult van-hairline--top">
    <div class="content">
      <div class="heart" @click="setHeart" :class="{'yes': following}">
        <i></i>
        <p>{{followState}}</p>
      </div>
      <van-button type="primary" class="btn" @click="toggleShow">立即咨询</van-button>
    </div>
    <van-popup v-model="show" position="bottom" :overlay="true" class="modal">
      <div class="popup-title van-hairline--bottom">
        <h3>立即咨询</h3>
        <p>金牌顾问第一时间为您服务</p>
        <!-- <van-icon name="close" class="close_btn" /> -->
        <i class="close_btn" @click="toggleShow"></i>
      </div>
      <div class="consult-form">
        <div class="consult-form_store van-hairline--bottom">
          <label>咨询门店</label>
          <div>
            <p>义乌人车人经发大道店</p>
            <span>距您3.5km</span>
          </div>
          <i class="arrow-more_icon" @click="selectStore"></i>
        </div>
        <div class="consult-form_tel van-hairline--bottom">
          <label>手机号</label>
          <p>13516988888</p>
        </div>
      </div>
      <div class="consult-now">
        <van-button type="primary" size="large" class="btn_now" @click="consultNow">立即咨询</van-button>
      </div>
    </van-popup>
    <h-store-select :show="storeSelect" @setedStore="setStore"></h-store-select>
  </div>
</template>
<script>
import hStoreSelect from '@/components/hStoreSelect';
import {OsAction} from '@/utils/contactOs';
export default {
  name: 'hConsult',
  props: {
    following: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    followState() {
      return this.following ? '已关注' : '关注';
    },
  },
  data() {
    return {
      show: false,
      storeSelect: false,
      // heart: {
      //   state: false,
      //   text: '关注',
      // },
    };
  },
  methods: {
    setHeart() {
      // this.heart.text = this.heart.state ? '关注' : '已关注';
      // this.heart.state = !this.heart.state;
      this.$emit('changeFollow');
    },
    setStore(id) {
      this.show = true;
      this.storeSelect = false;
      console.log(id);
    },
    selectStore() {
      // this.storeSelect = true
      // this.show = false
      // 选择门店 如果由web端实现，开启上面两行
      let contactObj = {
        msg: 'select store……',
      };
      let getOs = OsAction(contactObj);
      console.log(getOs);
      // webAction(contactObj);
      // alert('选择门店');
    },
    consultNow() {
      alert('咨询！');
    },
    toggleShow() {
      this.show = !this.show;
    },
  },
  components: {
    hStoreSelect,
  },
};
</script>
<style lang="scss" scoped>
  .consult {
    background: #FFF;
    position: fixed;
    width: auto;
    height: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 rem(25);

    .content {
      overflow: hidden;
    }

    .heart {
      width: 3em;
      height: auto;
      text-align: center;
      float: left;
      padding-top: 10px;

      i {
        display: inline-block;
        width: 24px;
        height: 21px;
        background: red;
        background: $icon_sprite;
        background-size: 32px 320px;
        background-position: -4px -268px;
        transition: all .3s ease;
      }

      &.yes {
        i {
          background-position: -4px -295px;
        }

        // p{
        //   color: #ff3344;
        // }
      }

      p {
        color: $font_theme;
        font-size: rem(10);
        line-height: rem(10);
        margin-top: 6px;
        transition: all .3s ease;
      }
    }

    .van-button--primary.btn {
      margin-top: 10px;
      background: #0198E7;
      border-color: #0198E7;
      width: rem(270);
      font-size: rem(15);
      float: right;
      height: 40px;
      line-height: 40px;
    }
  }

  .modal {
    .popup-title {
      text-align: center;
      padding: 20px 0;

      h3 {
        font-size: rem(15);
        color: $font_theme;
        font-family: $font_bold;
        line-height: rem(15);
        margin: 0 auto 10px;
      }

      p {
        font-size: rem(12);
        color: $font_vice;
      }

      .close_btn {
        position: absolute;
        width: rem(15);
        height: rem(15);
        right: rem(15);
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
        background: red;
        background: linear-gradient(top, #666, #666) no-repeat center, linear-gradient(left, #666, #666) no-repeat center;
        background-size: 100% 1px, 1px 100%;
      }
    }

    .consult-form {
      width: auto;
      padding: 0 rem(15) 0;

      .consult-form_store,
      .consult-form_tel {
        display: flex;
        align-items: top;
        justify-content: flex-start;
        height: 40px;

        label {
          flex: 1;
          max-width: rem(65);
          font-size: rem(14);
          color: $font_theme;
          margin-right: rem(15);
        }

        p {
          font-size: rem(14);
          color: $font_theme;
        }
      }

      .consult-form_store {
        position: relative;
        padding: 15px 0;

        label {
          line-height: rem(14);
        }

        p {
          color: $font_theme;
          line-height: rem(14);
          margin-bottom: 8px;
        }

        span {
          color: $font_vice;
          line-height: rem(12);
          font-size: rem(12);
        }
      }

      .consult-form_tel {
        line-height: 40px;
      }
    }

    .consult-now {
      width: auto;
      padding: 0 rem(15);
      margin: 38px auto 30px;

      .van-button--primary.btn_now {
        background: #0198E7;
        border-color: #0198E7;
        background-clip: content-box;
        font-size: rem(15);
        height: 40px;
        line-height: 40px;
      }
    }
  }
</style>

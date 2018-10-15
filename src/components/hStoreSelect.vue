<template>
<transition name='van-slide-bottom'>

  <div class="store-select_container" v-show="show">
    门店选择
    <van-button round type="danger" @click="setStore">圆形按钮</van-button>
  </div>
</transition>

</template>
<script>
export default {
  name: 'hStoreSelect',
  created() {
    console.log(this.$route);
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      storeId: -1,
      storeList: [],
    };
  },
  methods: {
    setStore() {
      this.$emit('setedStore', this.storeId);
    },
  },
};
</script>
<style lang="scss" scoped>
  .store-select_container{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #FFF;
    z-index: 2001;
  }
</style>

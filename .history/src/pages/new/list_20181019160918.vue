<template>
  <div class="container">
    <h-header title="车辆详情9999999999999999999" :hasBack="true">
      <!-- <i class="share" slot="right" @click="share"></i> -->
      <p slot="right">123</p>
    </h-header>
    <p>hello world</p>
    <transition name="slide">
      <router-view class="router-view_fullpage"></router-view>
    </transition>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
</style>

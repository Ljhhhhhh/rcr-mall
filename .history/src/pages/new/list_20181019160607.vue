<template>
  <div class="container">
    <h-header title="车辆详情" :hasBack="true">
      <!-- <i class="share" slot="right" @click="share"></i> -->
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

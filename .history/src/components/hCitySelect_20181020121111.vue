<template>
<div>
  <p>城市选择</p>
  <h-list-view :data="d"></h-list-view>
</div>
</template>
<script>
import hListView from '@/components/hListView';
export default {
  name: 'hCitySelect',
  data() {
    return {
      d: [1, 2, 3],
    }
  },
  components: {
    hListView,
  },
};
</script>
<style lang="scss" scoped>
</style>

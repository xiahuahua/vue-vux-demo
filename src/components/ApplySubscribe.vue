<template>
  <div>
    <tab>
      <tab-item selected>未读</tab-item>
      <tab-item>已读</tab-item>
    </tab>
  </div>
</template>
<style less>

</style>

<script>
  // import {tab,tabitem} from 'vux';
  import {Tab, TabItem} from 'vux'

  export default {
    name: 'applySubscribe',
    components: {
      Tab,
      TabItem
    },
  }
</script>

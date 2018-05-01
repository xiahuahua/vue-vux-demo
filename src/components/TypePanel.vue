<template>
    <div id="type-panel">
      <div class="panel-title">x</div>
      <div class="panel-content">
        <div class="panel-item">娱乐</div>
        <div class="panel-item">财经</div>
        <div class="panel-item">房产</div>
        <div class="panel-item">街拍</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "type-panel"
    }
</script>

<style lang="less">
  #type-panel{
    position: fixed;
    bottom: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    overflow:hidden;
    .panel-content{
      height: 1000px;
      overflow: auto;
    }
  }
</style>

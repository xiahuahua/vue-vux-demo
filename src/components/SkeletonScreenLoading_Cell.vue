<template>
  <div class="timeline-item_cell">
    <div v-for="item in cell_count" class="animated-background_cell">
      <div class="background-masker_cell header-top"></div>
      <div class="background-masker_cell header-left"></div>
      <div class="background-masker_cell header-right"></div>
      <div class="background-masker_cell header-bottom"></div>
      <div class="background-masker_cell subheader-left"></div>
      <div class="background-masker_cell subheader-right"></div>
      <div class="background-masker_cell subheader-bottom"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "skeleton-screen-loading-cell",
    props: {
      cell_count: {   // 可选字段，有默认值
        default: 5
      }
    }
  }
</script>

<style>
  .timeline-item_cell {
    background: #fff;
    border-color: #e5e6e9 #dfe0e4 #d0d1d5;
    border-radius: 3px;
    padding: 12px;
    margin: 0 auto;
  }

  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0
    }
    100% {
      background-position: 468px 0
    }
  }

  .animated-background_cell {
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 800px 104px;
    height: 40px;
    position: relative;
    margin-bottom: 20px;
  }

  .background-masker_cell {
    background: #fff;
    position: absolute;
  }

  /* Every thing below this is just positioning */

  .background-masker_cell.header-top,
  .background-masker_cell.header-bottom,
  .background-masker_cell.subheader-bottom {
    top: 0;
    left: 40px;
    right: 0;
    height: 10px;
  }

  .background-masker_cell.header-left,
  .background-masker_cell.subheader-left,
  .background-masker_cell.header-right,
  .background-masker_cell.subheader-right {
    top: 10px;
    left: 40px;
    height: 8px;
    width: 10px;
  }

  .background-masker_cell.header-bottom {
    top: 18px;
    height: 6px;
  }

  .background-masker_cell.subheader-left,
  .background-masker_cell.subheader-right {
    top: 24px;
    height: 6px;
  }

  .background-masker_cell.header-right,
  .background-masker_cell.subheader-right {
    width: auto;
    left: 300px;
    right: 0;
  }

  .background-masker_cell.subheader-right {
    left: 230px;
  }

  .background-masker_cell.subheader-bottom {
    top: 30px;
    height: 10px;
  }

  .background-masker_cell.content-top,
  .background-masker_cell.content-second-line,
  .background-masker_cell.content-third-line,
  .background-masker_cell.content-second-end,
  .background-masker_cell.content-third-end,
  .background-masker_cell.content-first-end {
    top: 40px;
    left: 0;
    right: 0;
    height: 6px;
  }

  .background-masker_cell.content-top {
    height: 20px;
  }

  .background-masker_cell.content-first-end,
  .background-masker_cell.content-second-end,
  .background-masker_cell.content-third-end {
    width: auto;
    left: 380px;
    right: 0;
    top: 60px;
    height: 8px;
  }

  .background-masker_cell.content-second-line {
    top: 68px;
  }

  .background-masker_cell.content-second-end {
    left: 420px;
    top: 74px;
  }

  .background-masker_cell.content-third-line {
    top: 82px;
  }

  .background-masker_cell.content-third-end {
    left: 300px;
    top: 88px;
  }
</style>

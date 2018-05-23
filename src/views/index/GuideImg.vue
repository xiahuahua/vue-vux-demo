<template>
  <div class="guide_img">
    <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"
            :height="screen_height"></swiper>
  </div>
</template>

<script>
  import {Swiper} from 'vux'

  const baseList = [{
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
    title: '送你一朵fua'
  }, {
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
    title: '送你一辆车'
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/5.jpg', // 404
    title: '送你一次旅行',
    fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/5.jpg', // 404
    title: '送你一次旅行',
    fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
  },{
    url: 'javascript:',
    img: 'https://static.vux.li/demo/5.jpg', // 404
    title: '送你一次旅行',
    fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
  }]

  export default {
    components: {
      Swiper
    },
    data() {
      return {
        demo01_list: baseList,
        demo01_index: 0,
        screen_height: '600px',
      }
    },
    created() {
      this.screen_height = document.documentElement.clientHeight + 'px';
    },
    ready() {
    },
    methods: {
      demo01_onIndexChange(index) {
        this.demo01_index = index
      },
    }
  }
</script>

<style lang="less">
  .guide_img {

    .text-scroll p {
      font-size: 12px;
      text-align: center;
      line-height: 30px;
    }

    @-webkit-keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
      }
      100% {
        opacity: 1;
        transform: none;
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
      }
      100% {
        opacity: 1;
        transform: none;
      }
    }

    .swiper-demo-img img {
      width: 100%;
    }

  }


</style>

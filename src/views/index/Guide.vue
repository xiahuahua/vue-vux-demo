<template>
  <div class="app_guide">
    <img src="../../assets/image/app_guide.jpg"/>
    <div class="close" @click="closeGuide">跳过  {{count_down}}s</div>
  </div>
</template>

<script>
  import store from '../../store/index'
  import {mapMutations} from 'vuex'

  export default {
    store,
    name: "guide",
    data(){
      return {
        count_down:3,
        interval:null
      }
    },
    created(){
      document.title = '夏花花欢迎你';
      let that = this;
      this.interval = setInterval(function(){
        if((that.count_down--)<=1){
          store.dispatch('set_app_is_guideApp',false);
          document.title = '资讯';
          window.clearInterval(that.interval);
        }
      },1000);
    },
    methods:{
      ...mapMutations(['set_app_is_guideApp']),
      closeGuide(){
        window.clearInterval(this.interval);
        store.dispatch('set_app_is_guideApp',false);
        document.title = '资讯';
      }
    }
  }
</script>

<style lang="less">
  .app_guide {
    position: absolute;
    width: 100%;
    z-index: 11;
    img {
      position: absolute;
      width: 100%;
    }
    .close {
      position: absolute;
      top: 20px;
      right: 20px;
      padding: 5px 14px;
      border: 1px solid #ffffff;
      font-size: 14px;
      border-radius: 14px;
      color: #ffffff;
    }
  }
</style>

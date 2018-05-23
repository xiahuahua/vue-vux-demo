<template>
  <div id="app">
    <!--登录loading页-->
    <!--<login-loading v-show="$store.state.app_is_login"></login-loading>-->

    <!--引导页图片-->
    <!--<guide-img></guide-img>-->

    <!--引导页-->
    <guide v-show="$store.state.app_is_guide"></guide>

    <!--主页面-->
    <div v-show="!$store.state.app_is_guide">
      <keep-alive>
        <transition name="fade">
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </transition>
      </keep-alive>
      <transition name="fade">
        <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是不被缓存的视图组件！ -->
        </router-view>
      </transition>
      <!--底部栏-->
      <app-footer v-show="isShow"></app-footer>
    </div>

  </div>
</template>

<style lang="less">
  @import '~vux/src/styles/reset';

  body {
    background-color: #fbf9fe;
    line-height: 1.2;
  }

  /* 开始过渡阶段,动画出去阶段 */
  .fade-enter-active,
  .fade-out-leave-active,
  .fade-enter-active,
  .fade-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    top: 0;
    position: absolute;
    backface-visibility: hidden;
  }

  /* 进入开始 */
  .fade-enter{
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  /* 出去终点 */
  .fade-leave-active{
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
</style>
<script>
  import AppFooter from './views/index/Footer'
  import Guide from './views/index/Guide'
  import LoginLoading from './components/LoginLoading'
  import GuideImg from './views/index/GuideImg'
  import store from './store'
  import {mapMutations} from 'vuex'

  export default {
    store,
    data() {
      return {
        isShow: true
      }
    },
    components: {
      AppFooter,
      Guide,
      LoginLoading,
      GuideImg
    },
    methods: {
      ...mapMutations(['set_app_tabbar_indexApp']),
      fetchDate() {
        let router = this.$route.path;
        console.log(router)
        if (router == '/home' || router == '/application' || router == '/mysettings' || router == '/dist/') {
          this.isShow = true;
          switch (router) {
            case '/home':
              store.dispatch('set_app_tabbar_indexApp', 0);
              break;
            case '/application':
              store.dispatch('set_app_tabbar_indexApp', 1);
              break;
            case '/mysettings':
              store.dispatch('set_app_tabbar_indexApp', 2);
              break;
            default:
              store.dispatch('set_app_tabbar_indexApp', 0);
          }
        } else {
          this.isShow = false;
        }

        //判断是否登录
        console.log(store.state.app_access_token)
      }
    },
    watch: {
      "$route": "fetchDate"
    }
  }

</script>

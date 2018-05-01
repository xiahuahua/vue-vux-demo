<template>
  <div id="fooder">
    <tabbar style="position:fixed">
      <tabbar-item :link="{path:'/home'}" :selected="$store.state.app_tabbar_index==0">
        <img slot="icon" src="../assets/image/ic_nav_news_normal.png">
        <img slot="icon-active" src="../assets/image/ic_nav_news_actived.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/application'}" :selected="$store.state.app_tabbar_index==1">
        <img slot="icon" src="../assets/image/ic_nav_app_normal.png">
        <img slot="icon-active" src="../assets/image/ic_nav_app_actived.png">
        <span slot="label">发现</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/mysettings'}" :selected="$store.state.app_tabbar_index==2">
        <img slot="icon" src="../assets/image/ic_nav_my_normal.png">
        <img slot="icon-active" src="../assets/image/ic_nav_my_pressed.png">
        <span slot="label">我</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<style lang='less'>
  #fooder{
    .weui-tabbar__icon{
      width: 22px;
      height: 22px;
       img{
        width: 22px;
        height: 22px;
      }
    }
    .weui-tabbar{
      height: 56px;
      background-color: #ffffff;
    }
    .weui-tabbar__item{
      padding: 10px 0 0;
    }
  }
</style>
<script>
  import { Tabbar,TabbarItem } from 'vux'
  export default{
    name: 'AppFooter',
    components: {
      Tabbar,
      TabbarItem,
    },
    data(){
      return{
        index:0
      }
    },
    methods:{
       onclick1(){
          console.log(1);
       }
    }

  }

</script>

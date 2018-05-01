<template>
  <div>
    <!--<app-header></app-header>-->
    <div style="position:fixed;width: 100%;z-index: 1;">
      <tab :line-width="2" v-model="index" style="position:relative">
        <tab-item :selected="tag === item" v-for="item in taglist" @click="tag = item">{{item}}</tab-item>
      </tab>
    </div>

    <div v-if="index === 0">
      <recommend></recommend>
    </div>
    <div v-if="index === 1">
      <subscibe></subscibe>
    </div>
    <!--<div v-if="index === 2"><question-list></question-list></div>-->
    <!--<div v-if="index === 3"><event-list></event-list></div>-->
  </div>
</template>
<style>
  /* @import '~vux/dist/vux.css'; */
  body {
    line-height: 1.2; /* 设置行间距为1.2 ,默认是1.6的太大*/
  }
</style>
<script>
  import {Tab, TabItem} from 'vux'
  import AppHeader from './Header'
  import NewsList from './NewsList'
  import BlogList from './BlogList'
  import QuestionList from './QuestionList'
  import EventList from './EventList'
  import Recommend from './Recommend'
  import Subscibe from './Subscibe'
  import store from '../store'
  import {mapMutations} from 'vuex'

  const list = () => ['推荐', '订阅']

  export default {
    store,
    components: {
      Tab,
      TabItem,
      AppHeader,
      NewsList,
      BlogList,
      QuestionList,
      EventList,
      Recommend,
      Subscibe,

    },
    data() {
      return {
        tag: '资讯',
        taglist: list(),
        index: store.state.home_tab_index//获取当前tab选中的位置
      }
    },
    ready() {
    },
    methods: {
      ...mapMutations(['set_home_tab_indexApp', 'get_home_tab_indexApp']),
      index_change() {
        //console.log(this.index)
        //this.$store.commit('set_home_tab_index',this.index);
        store.dispatch('set_home_tab_indexApp', this.index);//给store中的home_tab_index赋值
        console.log(store.state.home_tab_index);
      }
    },
    created() {
      console.log(this.get_home_tab_indexApp);
    },
    watch: {
      "index": "index_change"
    }
  }
</script>

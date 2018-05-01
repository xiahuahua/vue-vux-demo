<template>
  <div style="height:100%;">
    <div style="position:fixed;width: 100%;z-index: 1;">
      <tab :line-width="2" v-model="index" style="position:relative">
        <tab-item :selected="tag === item" v-for="item in taglist" @click="tag = item">{{item}}</tab-item>
      </tab>
    </div>
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
      <div v-if="index === 0">
        <demo-content></demo-content>
      </div>
      <div v-if="index === 1">
        <subscibe></subscibe>
      </div>

    </view-box>
  </div>
</template>

<script>
  import {Tab, TabItem, ViewBox} from 'vux'
  import store from '../store'
  import DemoContent from './DemoContent'
  import Subscibe from './Subscibe'
  import {mapMutations} from 'vuex'

  const list = () => ['推荐', '订阅']

  export default {
    store,
    name: "demo",
    components: {
      ViewBox,
      Tab,
      TabItem,
      DemoContent,
      Subscibe,
      mapMutations
    },
    data() {
      return {
        tag: '资讯',
        taglist: list(),
        index: store.state.home_tab_index//获取当前tab选中的位置
      }
    },
    created() {
      //alert(document.body.scrollHeight+"/"+document.body.clientHeight+"/"+document.body.clientHeight+"/"+document.body.offsetHeight+"/"+window.screen.height+"/"+window.screen.availHeight)
      console.log(document.body.clientWidth)
      console.log(document.body.clientHeight)
      console.log(document.body.offsetWidth)
      console.log(document.body.offsetHeight)
      console.log(document.body.scrollWidth)
      console.log(document.body.scrollHeight)
      console.log(document.body.scrollTop)
      console.log(document.body.scrollLeft)
      console.log(window.screenTop)
      console.log(window.screenLeft)
      console.log(window.screen.height)
      console.log(window.screen.width)
      console.log(window.screen.availHeight)
      console.log(window.screen.availWidth)
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

<style scoped>

</style>

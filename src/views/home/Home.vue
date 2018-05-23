<template>
    <div style="height:100%;">
        <div style="position:fixed;width: 100%;z-index: 1;height:44px;background:#ffffff;">
            <div class="home_tab">
                <tab :line-width="5" custom-bar-width="40px" v-model="index" style="position:relative">
                    <tab-item :selected="tag === item" v-for="item in taglist" @click="tag = item">{{item}}</tab-item>
                </tab>
            </div>

        </div>
        <view-box ref="viewBox" body-padding-top="44px" body-padding-bottom="50px">
            <div v-if="index === 0">
                <news-list></news-list>
            </div>
            <div v-if="index === 1">
                <recommend></recommend>
            </div>
            <div v-if="index === 2">
                <question-list></question-list>
            </div>
            <div v-if="index === 3">
                <event-list></event-list>
            </div>
            <div v-if="index === 4">
                <blog-list></blog-list>
            </div>

        </view-box>
    </div>
</template>

<script>
    import {Tab, TabItem, ViewBox} from 'vux'
    import store from '../../store/index'
    import Subscibe from './Subscibe'
    import Recommend from './Recommend'
    import NewsList from './NewsList'
    import BlogList from './BlogList'
    import QuestionList from './QuestionList'
    import EventList from './EventList'
    import {mapMutations} from 'vuex'

    const list = () => ['首页', '资讯', '问答', '活动', '博客']

    export default {
        store,
        name: "demo",
        components: {
            ViewBox,
            Tab,
            TabItem,
            Recommend,
            Subscibe,
            NewsList,
            BlogList,
            QuestionList,
            EventList,
            mapMutations
        },
        data() {
            return {
                tag: '首页',
                taglist: list(),
                index: store.state.home_tab_index,//获取当前tab选中的位置
            }
        },
        methods: {
            ...mapMutations(['set_app_is_loginApp', 'set_home_tab_indexApp', 'set_app_access_tokenApp', 'set_app_user_infoApp', 'set_app_user_typeApp', 'get_home_tab_indexApp']),
            index_change() {
                //console.log(this.index)
                //this.$store.commit('set_home_tab_index',this.index);
                store.dispatch('set_home_tab_indexApp', this.index);//给store中的home_tab_index赋值
                console.log(store.state.home_tab_index);
            }
        },
        created() {

        },
        watch: {
            "index": "index_change"
        }
    }
</script>

<style lang="less">

</style>

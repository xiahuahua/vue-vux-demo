<template>
    <div id="myranking">
        <div style="height:100%;">
          <div style="position:fixed;width: 100%;z-index: 1;background:#ffffff;height: 44px;">
            <div class="rank-box">
                <tab :line-width="5" v-model="index" style="position:relative" custom-bar-width="40px">
                    <tab-item  v-for="item in taglist" @on-item-click="change">{{item}}</tab-item>
                </tab>
            </div>
        </div>
        <div v-if="index === 0">
            <MyRankSubscibe></MyRankSubscibe>
        </div>
        <div v-if="index === 1">
            <MyRankCollec></MyRankCollec>
        </div>
    </div>
</div>
</template>
<style lang="less">
    body {
        line-height: 1.2; /* 设置行间距为1.2 ,默认是1.6的太大*/
    }
    #myranking{
        .rank-box{
                position: absolute;
                top: 0;
                left: 5rem;
                right: 5rem;
            .vux-tab .vux-tab-item {
                background: #ffffff;
                font-size: 17px;
            }
            .vux-tab .vux-tab-item.vux-tab-selected {
                color: #000000;
                font-size: 17px;
            }
        }
        .rank-box:after{
            content: '';
            display: block;
            height: 0px;
            width: 0px;
            clear: both;
        }
        .vux-tab-bar-inner{
            width:55px!important;
            height:5px;
        }
        .vux-tab:after{
            content: '';
            display: block;
            height: 0px;
            width: 0px;
            clear: both;
        }

    }

</style>
<script>
    import {Tab, TabItem} from 'vux'
    import AppHeader from '../index/Header'
    import NewsList from '../home/NewsList'
    import BlogList from '../home/BlogList'
    import QuestionList from '../home/QuestionList'
    import EventList from '../home/EventList'
    import Recommend from '../home/Recommend'
    import Subscibe from '../home/Subscibe'
    import store from '../../store/index'
    import MyRankCollec from './MyRankCollec'
    import MyRankSubscibe from './MyRankSubscibe'

    const list = () => ['订阅量', '收藏量']

    export default {
        store,
        name:'MyRanking',
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
            MyRankSubscibe,
            MyRankCollec
        },
        data() {
            return {
                tag: '排行',
                taglist: list(),
                index:0
            }
        },
        ready() {
        },
        methods: {
            change(index){
                this.index=index;
            }
        }
    }
</script>

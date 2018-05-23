<template>
    <div style="position: relative;">
        <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore"
                  @on-pulldown-loading="refresh" v-model="status" ref="scroller"
                  height="-101px"
                  :pulldown-config="{content:'下拉可以刷新',downContent:'下拉可以刷新',upContent:'松开立即刷新',loadingContent:'正在加载中...'}">
            <div class="box2">
                <!--搜索-->
                <div class="search-item" @click="search">
                    <div class="search-icon"></div>
                    <div class="search-content">| 请输入你想搜索的内容</div>
                </div>
                <ul id="info-list">
                    <li v-for="item in datalist" class="info-item" v-show="isShow"
                        @click="_getInfoDetail(item.id,item.title,item.author,item.pubDate,item.category,item.categoryId)">
                        <div class="info-type">{{item.title|formatKeyword}}</div>
                        <div class="info-read">{{item.id}}</div>
                        <div class="info-titile">{{item.title|formatTitle}}</div>
                        <div class="info-img">
                            <img v-lazy="item.url"/>
                        </div>
                        <div class="info-footer">
                            <div class="info-footer-left">
                                <!--<img v-lazy="item.thumbnailUrl"/>-->
                                <img v-lazy="item.thumbnailUrl"/>
                            </div>
                            <div class="info-footer-right">
                                <span class="info-right-row font-bold">{{item.title|formatKeyword}}</span>
                                <span class="info-right-row font-light">{{item.url}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <skeleton-screen-loading v-show="!isShow" :ssl_count="5"
                                         style="position: relative;top: -15px;"></skeleton-screen-loading>
                <divider>我是有底线的</divider>
            </div>
            <!--pullup slot-->
            <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
                 style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
                <span v-show="status.pullupStatus === 'default'"></span>
                <span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'"
                      :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
                <span v-show="status.pullupStatus === 'loading'"><spinner type="lines"></spinner></span>
            </div>
        </scroller>
    </div>
</template>

<script>
    import SkeletonScreenLoading from '../../components/SkeletonScreenLoading'
    import axios from 'axios'
    import {Divider} from 'vux'
    import {Scroller, Spinner} from 'vux'
    import store from '../../store/index'

    export default {
        store,
        name: "demo-content",
        components: {
            Divider,
            SkeletonScreenLoading,
            Scroller,
            Spinner
        },
        props: {
            isload_recommend: {
                default: false
            }
        },
        data() {
            return {
                datalist: [],
                isShow: false,
                status: {
                    pullupStatus: 'default',
                    pulldownStatus: 'default'
                },
                rows: 10,
                page: 1,
            }
        },
        created() {
            this.__getDataList();
        },
        mounted() {

        },
        methods: {
            __getDataList() {
                var that = this;
                this.page = 1;
                let data = {page: 1, rows: this.rows * this.page}
                axios.get('/photos', {params: data})
                    .then(function (response) {
                        console.log(response.data);//获取数据
                        let res_data = response.data;
                        if (res_data.length > 0) {
                            that.datalist = res_data.slice(0, 10);
                            that.$nextTick(() => {
                                console.log("$nextTick")
                                that.isShow = true;
                            })
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            _getInfoDetail(_infoid, _title, _author, _pubDate, _category, _categoryId) {
                console.log(_infoid)
                this.$router.push({
                    path: '/articleDetail',
                    query: {
                        id: _infoid,
                        author: _author,
                        title: _title,
                        pubDate: _pubDate,
                        category: _category,
                        categoryId: _categoryId
                    }
                });
            },
            search() {
                this.$router.push({path: '/search'});
            },
            __getDataListByAccountMore() {
                var that = this;
                this.page = this.page + 1;
                let data = {page: 1, rows: this.rows * this.page};
                axios.get('/xqjyw/zixun/getLanmulistPage', {params: data})
                    .then(function (response) {
                        console.log(response.data);//获取数据
                        let res_data = response.data;
                        if (res_data.total > 0) {
                            that.datalist = res_data.rows;
                            that.$nextTick(() => {
                                that.$refs.scroller.donePullup()
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            loadMore() {
                console.log('--进入加载方法--')
                setTimeout(() => {
                    this.__getDataListByAccountMore();
                }, 800)
            },
            refresh() {
                setTimeout(() => {
                    this.__getDataList();
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.$refs.scroller.donePulldown()
                            this.pullupEnabled && this.$refs.scroller.enablePullup()
                        }, 10)
                    })
                }, 1000)
            }
        },
        filters: {
            formatKeyword: function (value) {
                var keyword = value;
                if (keyword.length > 8) {
                    keyword = keyword.substring(0, 8) + '...';
                }
                return keyword;
            },
            formatTitle: function (value) {
                var tit = value;
                if (tit.length > 17) {
                    tit = tit.substring(0, 17) + '...';
                }
                return tit;
            }
        }
    }
</script>

<style lang="less">
    @import "../../styles/theme";

    .search-item {
        position: absolute;
        margin: 10px auto 16px;
        padding: 0;
        left: 16px;
        right: 16px;
        background-color: #ffffff;
        height: 28px;
        border: 1px solid #cccccc;
        border-radius: 28px;
        text-align: center;
        font-size: 0px;
        .search-icon {
            position: relative;
            display: inline-block;
            background: url("../../assets/image/icon-searchfind.png") no-repeat center center;
            background-size: 60%;
            width: 23px;
            height: 23px;
            margin-top: 3px;
            vertical-align: top;
        }
        .search-content {
            position: relative;
            display: inline-block;
            height: 28px;
            color: #C8C9CA;
            font-size: 13px;
            line-height: 30px;
            font-weight: 100;
        }
    }

    #info-list {
        display: flex;
        flex-direction: column;
        padding: 57px 16px 15px 16px;
        list-style: none;
        .info-item {
            position: relative;
            width: 100%;
            height: 384px;
            border-bottom: 1px solid @cutoff-line-color;
            margin-bottom: 16px;
        }
        .info-type {
            position: absolute;
            z-index: 1;
            top: 15px;
            left: 16px;
            margin: 0px;
            font-size: 15px;
            font-weight: 100;
            color: #fff;
            height: 30px;
            text-shadow: 1px 1px 1px #000000;
        }
        .info-read {
            position: absolute;
            display: inline-block;
            z-index: 1;
            top: 15px;
            right: 16px;
            margin: 0px;
            font-size: 16px;
            font-weight: 100;
            color: #fff;
            height: 30px;
            text-shadow: 1px 1px 1px #000000;
        }
        .info-read:before {
            position: absolute;
            background: url("../../assets/image/ic_read.png") no-repeat center center;
            background-size: 100%;
            width: 24px;
            height: 24px;
            content: '';
            top: -4px;
            left: -30px;
        }
        .info-titile {
            position: absolute;
            z-index: 1;
            padding: 12px 16px;
            margin: 0px;
            font-size: 16px;
            font-weight: 200;
            color: #fff;
            top: 30px;
            text-shadow: 1px 1px 1px #000000;
        }
        .info-img {
            position: absolute;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 300px;
            border-radius: 5px;
            img {
                position: absolute;
                border-radius: 5px;
                width: 100%;
                height: 300px;
                margin: 0;
                padding: 0;
            }
        }
        .info-footer {
            position: absolute;
            width: 100%;
            bottom: 16px;
            height: 52px;
            .info-footer-left {
                height: 54px;
                line-height: 54px;
                width: 52px;
                text-align: left;
                display: inline-block;
                vertical-align: top;
                margin-right: 12px;
                img {
                    width: 50px;
                    height: 50px;
                    border: 1px solid @button-tab-border-color;
                    border-radius: 50%;
                }
            }
            .info-footer-right {
                display: inline-block;
                height: 54px;
                width: calc(~"100% - 96px");
                .info-right-row {
                    display: block;
                    height: 27px;
                    line-height: 27px;
                }
                .font-bold {
                    font-size: 18px;
                    font-weight: 400;
                }
                .font-light {
                    font-size: 14px;
                    font-weight: 100;
                    color: #999;
                }
            }
        }
        .info-item:last-child {
            border: 0px;
            margin: 0px;
        }
    }

    .vux-divider {
        font-size: 12px;
    }

</style>

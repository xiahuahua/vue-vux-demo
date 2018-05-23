<template>
    <div id="mysign">
        <div class="banner">
            <h3>连续签到，奖励更多</h3>
            <img src="../../assets/image/bannerqiandaor.png"/>
            <h4>明日签到奖励<span>{{tomorrowjifen}}</span>积分</h4>
            <i>已签到</i>
            <h5 @click="SignRule"><img src="../../assets/image/ic_jifenrule.png"/>签到规则</h5>
        </div>
        <x-dialog v-model="showSignIn" hide-on-blur :dialog-style="{'max-width': '100%'}">
            <div class="img-box">
                <div class="rule">
                    <h4>积分规则</h4>
                    <i></i>
                </div>
                <p>1.连续1-2天，每天可持续获取5积分；</p>
                <p>2.连续3-4天，每天可获取7积分；</p>
                <p>3.连续5-6天，每天可获取9积分；</p>
                <p>4.连续7天及以上，每天可获取10积分；</p>
                <h5>连续签到，每日签到获得更多奖励</h5>
            </div>
            <div @click="showSignIn=false">
                <span class="vux-close"></span>
            </div>
        </x-dialog>
        <vue-event-calendar :events="demoEvents" @month-changed="handleMonthChanged"
                            @day-changed="handleDayChanged"></vue-event-calendar>
    </div>
</template>
<style lang="less">
    #mysign {
        .title {
            color: #000000;
        }
        .events-wrapper {
            display: none;
        }
        .img-box {
            height: 200px;
            padding: 27px;
        }
        .banner {
            // height: 260px;
            text-align: center;
            color: #38383a;
            padding-top: 1px;
            border-bottom: 12px solid @secondary-color;
            h3 {
                margin-top: 10px;
                font-size: 15px;
                font-weight: 500;
                height: 30px;
            }
            h4 {
                font-size: 16px;
                margin-top: 15px;
                height: 30px;
                span {
                    font-weight: 600;
                    font-size: 20px;
                    margin: 0px 5px;
                }
            }
            h5 {
                font-size: 12px;
                font-weight: 500;
                margin-bottom: 16px;
                img {
                    width: 16px;
                    vertical-align: bottom;
                    margin-right: 3px;
                }
            }
            img {
                width: 100%;
            }
            i {
                display: block;
                margin: 7px auto 7px;
                width: 200px;
                height: 24px;
                text-align: center;
                line-height: 24px;
                border-radius: 15px;
                background-color: #73C1F2;
                border: 0.0625rem solid #8ac8f9;
                font-size: 16px;
                color: #ffffff;
                font-style: normal;
                padding: 2px 0;
            }
        }
        .img-box {
            height: initial;
            text-align: initial;
            padding: 16px;
            .rule {
                text-align: center;
                margin-bottom: 16px;
                i {
                    display: block;
                    margin: auto;
                    width: 65px;
                    height: 3px;
                    background-color: @ornament-color;
                }
                h4 {
                    font-size: 16px;
                    font-weight: 400;
                }
            }
            h5 {
                font-size: 16px;
                margin: 13px 0px 0px;
                font-weight: 400;
            }
            h5:before {
                content: '';
                display: inline-block;
                position: relative;
                top: 2px;
                height: 15px;
                width: 4px;
                background-color: @ornament-color;
                margin-right: 5px;
            }
            p {
                font-size: 14px;
                margin-bottom: 3px;
                font-weight: 300;
            }
        }
        .vux-close {
            position: absolute;
            width: 28px;
            height: 28px;
            background: url('../../assets/image/ic_close.png') no-repeat center;
            background-size: 80%;
            top: 10px;
            right: 10px;
        }
        .cal-header {
            padding-bottom: 0px;
        }
        .cal-header > div {
            padding: 10px 15px 10px;
        }
    }
</style>
<script>
    import {Group, Cell, Flexbox, FlexboxItem, XDialog} from 'vux'
    import axios from 'axios'
    import store from '../../store/index'

    export default {
        store,
        name: 'MySignAttend',
        components: {
            Group,
            Cell,
            Flexbox,
            FlexboxItem,
            XDialog
        },
        data() {
            return {
                showSignIn: false,
                demoEvents: [],
                tomorrowjifen: 888
            }
        },
        created() {
            this.getSignList();
        },
        methods: {
            handleDayChanged(day) {
            },
            handleMonthChanged(mouth) {
            },
            SignRule() {
                this.showSignIn = true;
            },
            getSignList() {  //获取当月的签到数据
                var that = this;
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                if (month < 10) {
                    month = '0' + month;
                }
                var day = date.getDay();
                if (day < 10) {
                    day = '0' + day;
                }
                var today = year + '/' + month + '/' + day;
                this.demoEvents.push({date: today, title: ''});
            },
            dateForMatter(date) {  //日期格式化，将YY-MM-DD转化为YY/MM/DD
                console.log("nnnnn=" + date);
                var da = [];
                da = date.split("-");
                var datestring = '';
                for (var j = 0; j < da.length; j++) {
                    if (j == (da.length - 1)) {
                        datestring += da[j];
                    } else {
                        datestring += da[j] + '/';
                    }
                }
                return datestring;
                console.log("ss=" + datestring);
            }
        }
    }
</script>

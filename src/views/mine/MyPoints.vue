<template>
  <div id="mypoint">
    <div class="point_banner">
      <div class="left">
        总积分：<i>{{jifentotal}}</i>
      </div>
      <div class="right" @click="showSignIn=true">
        <i>
          <img src="../../assets/image/ic_jifenrule.png"/>
        </i>积分规则
      </div>
    </div>
    <group v-for="month in monthinfo">
      <cell :title="month.qiandaoMonth+'月'" :value="'获取：+'+month.yueNum" class="monthsign">
        <i slot="icon" class="mouthicon"></i>
      </cell>
      <cell :title="'签到奖励'" :value="'+'+day.jifen" :inline-desc="day.qiandaoDate" v-for="day in month.jifenList"></cell>
    </group>
    <x-dialog v-model="showSignIn" hide-on-blur :dialog-style="{'max-width': '100%'}">
      <div class="img-box">
        <div class="rule">
          <h4>积分规则</h4>
          <i></i>
        </div>
        <h5>如何获取积分？</h5>
        <p>1.连续1-2天，每天可持续获取5积分；</p>
        <p>2.连续3-4天，每天可获取7积分；</p>
        <p>3.连续5-6天，每天可获取9积分；</p>
        <p>4.连续7天及以上，每天可获取10积分；</p>
      </div>
      <div @click="showSignIn=false">
        <span class="vux-close"></span>
      </div>
    </x-dialog>
  </div>

</template>
<style lang="less">

  #mypoint {
    .point_banner {
      height: 81px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 15px;
      border-bottom: 9px solid @secondary-color;
    }

    .point_banner .left {
      font-weight: 600;
      color: #525151;
    }

    .point_banner .left i {
      font-size: 32px;
      font-style: normal;
    }

    .point_banner .right {
      color: #6f7c85;
      font-size: 14px;
      cursor: pointer;
      i {
        position: relative;
        top: 1px;
        vertical-align: middle;
        margin-right: 4px;
        img {
          height: 14px;
        }
      }
    }
    .mouthicon {
      width: 4px;
      height: 15px;
      background-color: #00c4fd;
    }
    .weui-cells {
      margin-top: 0px;
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
    .img-box {
      text-align: initial;
      padding: 16px 16px 13px 16px;

      h5 {
        font-size: 16px;
        margin: 16px 0px;
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
      .rule {
        text-align: center;
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
    }
    .vux-label-desc {
      padding-right: 0px;
    }
    .weui-cell__ft {
      font-size: 15px;
    }
    .monthsign {
      .vux-cell-primary {
        label {
          display: flex;
          align-items: center;
        }
        label:before {
          content: '';
          display: inline-block;
          width: 4px;
          height: 15px;
          background-color: @ornament-color;
          margin-right: 5px;
        }
      }
      .weui-cell__ft {
        color: #000000;
      }
    }
    .vux-label {
      font-size: 15px;
    }
    .weui-cells:before{
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 0px;
        border-top: 0.0625rem solid #ffffff;
    }
    .weui-cell:before{
        content: " ";
        position: absolute;
        left: 16px;
        top: 0;
        right: 16px;
    }
    .weui-cells:after{
      content: " ";
      position: absolute;
      left: 16px;
      bottom: 0;
      right: 16px;
      height: 0.0625rem;
    }
  }


</style>

<script>
  import {Group, Cell, XDialog} from "vux"
  import axios from 'axios'
  import store from '../../store/index'

  export default {
    components: {
      Cell,
      Group,
      XDialog
    },
    name: 'myPoints',
    data() {
      return {
        showSignIn: false,
        jifentotal: '',//总积分
        monthinfo: [],//[{"jifenList":[{"createTime":"2018-04-10 16:32:44","jifen":"7","qiandaoYear":"2018","qiandaoDate":"2018-04-10","qiandaoMonth":"04","qiandaoName":"教师0401"},{"createTime":"2018-04-08 10:55:48","jifen":"5","qiandaoYear":"2018","qiandaoDate":"2018-04-08","qiandaoMonth":"04","qiandaoName":"教师0401"},{"createTime":"2018-04-09 09:37:04","jifen":"5","qiandaoYear":"2018","qiandaoDate":"2018-04-09","qiandaoMonth":"04","qiandaoName":"教师0401"}],"yueNum":17.0,"qiandaoMonth":"04"}],//月积分信息
        dayinfo: [],//日签到信息
        monthjifentotal: 0,//月签到总积分
        user_people: '',
        user_peoplename: '',
        app_access_token: ''
      }
    },
    created() {
      this.__getUserInfo();
      this.getMingXiJifen();
    },
    methods: {
      __getUserInfo() {
        this.user_people = store.state.app_user_info.account;
        this.user_peoplename = store.state.app_user_info.displayName;
        this.app_access_token = store.state.app_access_token;
      },
      getMingXiJifen() { //计算总积分
        var that = this;
        var info = {qiandaoAccount: this.user_people};
        axios.get('/xqjyw/zixun/findQiandao_jifenMingxi', {params: info})
          .then(function (response) {
            that.jifentotal = response.data.zongNum;
            that.monthinfo = response.data.list;
          })
      }
    }
  }
</script>

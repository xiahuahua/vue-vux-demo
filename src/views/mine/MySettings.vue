<template>
  <div id="myset">
    <div>
      <div class="banner">
        <cropper :headerImage="headimg"  @getHeaderImage="newHeaderImage">
        </cropper>　
        <div class="banner-info">
          <div class="banner-info-box">
            <h3>夏花花</h3>
            <p>
              <i><img src="../../assets/image/ic_male.png"></i>
              <span>男</span>
            </p>
          </div>
        </div>
        <span @click="SignIn(true)" v-if="isSign" class="signbut">已签到</span>
        <span @click="SignIn(false)" v-else class="signbut">签到</span>
      </div>
      <div class="news-wrap">
        <cell title="我的收藏" is-link :link="{path:'/myCollection'}">
          <img slot="icon" width="15" src="../../assets/image/ic_shouchang.png">
        </cell>
        <cell title="我的积分" :value="user_integral" :link="{path:'/myPoints'}" is-link>
          <img slot="icon" width="15" src="../../assets/image/ic_jifen.png">
        </cell>
        <cell title="排行" is-link :link="{path:'/myRanking'}">
          <img slot="icon" width="15" src="../../assets/image/ic_ranking.png">
        </cell>
        <cell title="系统消息" is-link :link="{path:'/mySysyemMsg'}" @click.native="sys_cell">
          <img slot="icon" width="15" src="../../assets/image/ic_sytemxiaoxi.png"/>
          <badge v-show="is_sys_hd"></badge>
        </cell>
      </div>
    </div>

    <x-dialog v-model="showSignIn" hide-on-blur :dialog-style="{'max-width': '100%'}">
      <div class="img-box">
        <img src="../../assets/image/my-signIn-success.png" style="max-width:100%">
      </div>
      <div @click="showSignIn=false">
        <span class="vux-close"></span>
      </div>
    </x-dialog>
  </div>

</template>
<style lang="less">
  html, body {
    height: 100%;
  }

  body {
    background-color: #ffffff;
  }

  #myset {
    position: relative;
    .banner {
      position: relative;
      width: 100%;
      height: 96px;
      border-bottom: 12px solid #f6f6f6;
      padding-top: 0.03125rem;
      .banner-info {
        float: left;
        display: flex;
        align-items: center;
        height: 100%;
      }
      .touxiang {
        display: flex;
        float: left;
        align-items: center;
        width: 64px;
        height: 100%;
        border-radius: 50%;
        font-style: normal;
        padding: 0px 15px;
        img {
          height: 64px;
        }
      }
      .banner-info-box {
        h3 {
          font-size: 15px;
          color: rgba(0, 0, 0, 0.8);
          margin: 3px 0px 10px 95px;
        }
        p {
          span {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.6);
            margin-left: 0px;
          }
          i {
            img {
              position: relative;
              left: -3px;
              width: 15px;
              height: 15px;
              margin-left: 95px;
              vertical-align: middle;
            }
          }
        }
      }
      .signbut {
        position: absolute;
        display: block;
        width: 57px;
        height: 25px;
        top: 35.5px;
        right: 16px;
        text-align: center;
        line-height: 25px;
        font-size: 15px;
        color: #ffffff;
        background-color: #72bff3;
        border-radius: 13px;
        box-shadow: 1px 9px 0px #e6e4e4;
      }
    }
    .weui-cell__hd {
      margin-right: 10px;
      img {
        width: 22px;
      }
    }
    .news-wrap {
      .weui-cell {
        height: 50px;
        padding: 1px 16px;
        line-height: 0.03125rem;
        font-size: 15px;
        color: rgba(0, 0, 0, 0.9);
      }
      .weui-cell:before {
        right: 16px;
      }
    }
    .news-wrap:after {
      content: '';
      display: block;
      width: 92%;
      height: 1px;
      background-color: rgba(217, 217, 217, 0.5);
      margin: auto;
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
    .weui-cell_access {
      .weui-cell__ft {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.9);
      }
    }
    .vux-divider {
      font-size: 12px;
    }
  }


</style>
<script>
  import {Group, Cell, Flexbox, FlexboxItem, XDialog, Badge} from 'vux'
  import axios from 'axios'
  import store from '../../store/index'
  import cropper from '../../components/cropper'

  export default {
    store,
    name: 'MySettings',
    components: {
      Group,
      Cell,
      Flexbox,
      FlexboxItem,
      XDialog,
      Badge,
      cropper
    },
    data() {
      return {
        showSignIn: false,
        isSign: false,
        jifentoday: 5,
        user_people: '',
        user_peoplename: '',
        app_access_token: '',
        user_integral: 88,
        time: 3,
        nickname: '',
        nickinfo: '',
        is_sys_hd: true,//系统消息红点
        overtimes_index: 0,
        headimg:'data:image/jpeg;base64,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'
      }
    },
    created() {
    },
    activated() {
    },
    methods: {
      SignIn(isSign) {  //签到
        if (!isSign) {
            this.isSign = true;
            this.showSignIn = true;
            setInterval(()=>{
                this.TimeClose();
            }, 1000);
            this.user_integral = 888;
        } else {
          this.$router.push({path: '/mySignAttend'});
        }
      },
      TimeClose() {
        this.time--;
        if (this.time == 0) {
          this.showSignIn = false;
        }
      },
      sys_cell() {
        this.is_sys_hd = false;
      },
      newHeaderImage(newImg){
        this.headimg=newImg;
        this.headerImage = newImg;
        var info = {touxiang:newImg,account:this.user_people};
        // axios.get('/xqjyw/zixun/edit_touxiang', {params: info})
        const params = new URLSearchParams();
        params.append('touxiang', newImg);
        params.append('account', this.user_people);
        axios.post('/xqjyw/zixun/edit_touxiang', params)
          .then(function (response) {
            console.log('上传头像方法--/xqjyw/zixun/find_touxiang----');
            console.log('传参='+info);
            console.log('返回值='+response.data);
          })
      },
    }
  }
</script>


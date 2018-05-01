<template>
  <div id="myset">
    <div>
      <div class="banner">
        <i>
          <img src=""/>
        </i>
        <p>奇趣菜菜屋</p>
        <span @click="SignIn">签到</span>
      </div>
      <!--<img class="img_1" src="../assets/image/bg_cir.png">-->
      <div class="news-wrap">
        <cell title="我的收藏" is-link :link="{path:'/myCollection'}">
          <img slot="icon" width="15" src="../assets/image/8.png">
        </cell>
        <cell title="我的积分" :value="50" :link="{path:'/myPoints'}" is-link>
          <img slot="icon" width="15" src="../assets/image/6.png">
        </cell>
        <cell title="排行" is-link :link="{path:'/myRanking'}">
          <img slot="icon" width="15" src="../assets/image/7.png">
        </cell>
        <cell title="系统消息" is-link :link="{path:'/mySysyemMsg'}">
          <img slot="icon" width="15" src="../assets/image/9.png"/>
        </cell>
      </div>
    </div>

    <x-dialog v-model="showSignIn" hide-on-blur :dialog-style="{'max-width': '100%'}">
      <div class="img-box">
        <img src="../assets/image/my-signIn-success.png" style="max-width:100%">
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

  #myset {
    .weui-cell__hd {
      margin-right: 3px;
      img {
        width: 18px;
        height: 18px;
      }
    }

  }

  body {
    background-color: #ffffff;
  }

  .banner {
    position: relative;
    width: 100%;
    height: 135px;
    background: -webkit-linear-gradient(top, #b5e1fe, #e0f4ff);
    padding-top: 0.5px;
  }

  .banner i {
    display: block;
    width: 64px;
    height: 64px;
    margin: 23px auto 5px;
    border-radius: 50%;
    background: url("../assets/image/10.jpg") no-repeat center;
  }

  .banner p {
    text-align: center;
    font-size: 15px;
  }

  .banner span {
    position: absolute;
    display: block;
    width: 59px;
    height: 31px;
    top: 50px;
    right: 12.5px;
    text-align: center;
    line-height: 31px;
    font-size: 14px;
    color: #ffffff;
    font-weight: 600;
    background: -webkit-linear-gradient(bottom, #90afff, #9ce1fe);
    border-radius: 20px;
    box-shadow: 1px 1px 10px #99d2ff;
    border: 1px solid #8ac8f9;
  }

  .news-wrap {
    .weui-cell {
      height: 50px;
      padding: 1px 7.5px;
      line-height: 0.5px;
      font-size: 14px;
    }
  }

  .vux-close{
    position: absolute;
    width: 28px;
    height: 28px;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAClklEQVRoge2Za3HrMBCFPwiGIAhhEDNoGFxBKIOaQcOgZlAziBkkDBIGMYP0x0pjpze1Xuu6P3JmPNPU0uocaR+SBU888WewBd6AA3AEbt+eI/Dp2mxX4vgfauADuAID0AENsHPvps/OvesQQVfgHTC/xnaCDTLTN6B15FKxYxTzwS8JqZBZ88Q1BjXO1g1xr8WwQfz45P7WRg1c3BhG2/gG8dkWWYWlUCFudUVxkjz5RstgBFqURKxB3qN1Y2eveIX4Y6vDJwud45CFPRKwS/p8CBUS2E1qxxpJa0tkm1TUCBeT0ulA2HWSDBba6Uhw5Zo4xR1SQUtg3VghNzWRnABR2ka0q5AYyRVhEVI2sn2PxGUQV+L3NrkiLGnkfZ9zqNEO2VWmIFWEJZ28HyeYWPaIb6ciVoQlj7zHCXida9CTX3VDIixl5EEmuJ1rcCZvb+/xkwhLOXmQ2e/nGtyQNFqC7yIsOuRBuM1uLTQEwCjCn9qsgk0Ya9SP0BIAstw3RIQWagJZUkuAdbZeKSt2j+z2cw0ulAWxH2TqNqUVe4qGgICessOL5bHPa4kIptGGvEIG4WyjIeI8Yx8Q/79mGLbEZZsSEYbIHelAWhxY0lJlyQbwFNOwJf7wYMnfmKWKOBAZnzVxS2UpK1IpImrEM6LP5z3hVdhTXmH9h6wQYo64d9igW5VL4M8oJrXjHtk4rflZxSBZcfYMMAfNbUAODuTXJUBcaWA9ER0KHrC2CBVMRSz9eX2x2xqDxMSRZbLTDgnYnoUTR4PuvVaN3F4OFGSbVBjGe61P4CWxfwX84/6i0GiRS4FB6sXAeHx8c+S2k+fF/f+d8Q75gqzmmnXmDhvEBVrEjy8I0cH97t07y0qz/cQTD/AFKdLOJOTyEeIAAAAASUVORK5CYII=");
    background-size: 100%;
    top: 0;
    right: 0;
  }


</style>
<script>
  import {Group, Cell, Flexbox, FlexboxItem, XDialog} from 'vux'

  export default {
    name: 'MySettings',
    components: {
      Group,
      Cell,
      Flexbox,
      FlexboxItem,
      XDialog
    },
    data(){
      return{
        showSignIn:false,
      }
    },
    methods:{
      SignIn(){
        this.showSignIn = true;
      }
    }
  }


</script>


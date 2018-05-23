<template>
  <div id="application">
    <div class="groupitem">
      <div class="itemtitle">功能类型1</div>
      <grid>
        <grid-item :label="'csdn'"
                   @click.native="href_to('https://www.csdn.net')">
          <img slot="icon" src="../../assets/image/ic_csdn.png"/>
        </grid-item>
        <grid-item :label="'百度'" @click.native="href_to('http://www.baidu.com')">
          <img slot="icon" src="../../assets/image/ic_baidu.png"/>
        </grid-item>
      </grid>
      <div class="itemtitle">功能类型2</div>
      <grid>
        <grid-item :label="'掘金'" @click.native="href_to('https://juejin.im')">
          <img slot="icon" src="../../assets/image/ic_juejin.png"/>
        </grid-item>
        <grid-item :label="'网易'" @click.native="href_to(garden_url)">
          <img slot="icon" src="../../assets/image/ic_wangyi.png"/>
        </grid-item>
        <grid-item :label="'微信'" @click.native="href_to(gardenId_wx)">
          <img slot="icon" src="../../assets/image/ic_wx.png"/>
        </grid-item>
      </grid>
    </div>
    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="这是一个弹出框" position="bottom"></toast>
  </div>
</template>
<style lang="less">
  body {
    background-color: #efeff4 !important;
  }

  #application {
    margin-top: 16px;
    position: absolute;
    width: 100%;
    .itemtitle {
      display: flex;
      align-items: center;
    }

    .itemtitle:before {
      content: '';
      display: inline-block;
      position: relative;
      top: 1px;
      width: 4px;
      height: 15px;
      margin: 0px 5px 0px 16px;
      background-color: #72bff3;
    }

    .weui-grid {
      height: 80px;
      text-align: center;
      font-size: 6.5px;
      color: #000000;
    }

    .weui-grid .weui-grid__label {
      font-size: 13px;
      margin: 4px 0px 12px;
      color: rgba(0, 0, 0, 0.9);
    }
    .weui-grid:before {
      border-right: 1px solid #ffffff;
    }
    .weui-grid:after {
      border-bottom: 1px solid #ffffff;
    }
    .weui-grids:before {
      border-top: 1px solid #ffffff;
    }
    .weui-grids {
      margin: 16px 0px;
      padding-bottom: 16px;
      border-bottom: 5px solid #f6f6f6;
      a {
        width: 25% !important;
      }
    }
    .weui-grid__icon {
      img {
        height: 20px;
        width: 20px;
        margin: auto;
      }
    }
  }


</style>
<script>
  import {Grid, GridItem, GroupTitle, Group, Toast} from 'vux'
  import store from '../../store/index'
  import axios from 'axios'

  export default {
    store,
    components: {
      Group,
      Grid,
      GridItem,
      GroupTitle,
      Toast
    },
    data() {
      return {
        gardenId: '',
        garden_url: '',
        gardenId_wx: '',
        showPositionValue: false,
      }
    },
    created() {
    },
    methods: {
      href_to(_url) {
        if (_url == '') {
          this.showPositionValue = true;
        } else {
          this.$router.push({path: '/iframe', query: {url: _url}});
        }
      }
    }
  }
</script>



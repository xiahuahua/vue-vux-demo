<template>
  <div id="search">

    <div class="search-item-temp">
      <div class="search-back" @touchend="searchCancel()" @click="searchCancel()">返回</div>
      <div class="search-input">
        <img src="../../assets/image/icon-searchfind.png" alt="搜索">
        <input type="text"
               placeholder="请输入您想搜索的内容"
               v-model="key"
               @focus="focus()"
               v-focus
        />
      </div>
      <div class="search-btn" @click="search()">搜索</div>
    </div>

    <!--<div class="search">-->
    <!--<div class="search-goback" @touchend="searchCancel()" @click="searchCancel()">返回</div>-->
    <!--<div class="search-input">-->
    <!--<img src="./../assets/image/icon-search.png" alt="搜索">-->
    <!--<form @submit.prevent="search(key)">-->
    <!--<input type="text"-->
    <!--placeholder="点击搜索"-->
    <!--v-model="key"-->
    <!--@focus="focus()"-->
    <!--v-focus>-->
    <!--</form>-->
    <!--</div>-->
    <!--<div class="search-cancel"-->
    <!--:class="{ 'search-cancel-show' : searchShow }"-->
    <!--@touchend="search()"-->
    <!--@click="search()">-->
    <!--搜索-->
    <!--</div>-->
    <!--</div>-->
    <div class="hotkey">
      <div class="search-title">推荐搜索</div>
      <div class="search-history">
        <div class="search-history-item" v-for="item in hotkey" @click="search_history(item.Name)">{{item.Name}}</div>
      </div>

      <div class="search-title mg-top50" v-show="searchHistory.length">历史搜索
        <span class="panel-close" @click="closehistory"></span>
      </div>
      <div class="search-history">
        <div class="search-history-item" v-for="item in searchHistory" @click="search_history(item.search)">
          {{item.search}}
        </div>
      </div>

    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import axios from 'axios'
  import store from '../../store/index'

  // 注册一个全局自定义指令 v-focus
  Vue.directive('focus', {
    // 当绑定元素插入到 DOM 中。
    inserted: function (el) {
      el.focus();
    }
  });
  export default {
    store,
    data() {
      return {
        key: '',
        hotkey: [{Name:'阿里巴巴'},{Name:'百度'},{Name:'网易'}],
        searchRes: null,
        searchHistory: [{search:'腾讯'},{search:'微博'},{search:'今日头条'}],
        searchShow: false,
        menuShow: false,
        menuedIndex: 0,
        menus: {},
        isAlbumShow: false,
        isSingerShow: false,
        mid: 0,
        singermid: 0,
        user_people: '',
        user_peoplename: '',
        app_access_token: ''
      }
    },
    created: function () {
      //this.__getUserInfo();
      //this._getHotKey();
      //this._getHistory();
    },
    beforeRouteLeave(to, from, next) {
      console.log('beforeRouteEnter');
      console.log(to)
      console.log(from)
      if (to.name == 'searchContent') {
        to.meta.keepAlive = true;
      }
      next();
    },
    methods: {
      __getUserInfo() {
        this.user_people = store.state.app_user_info.account;
        this.user_peoplename = store.state.app_user_info.displayName;
        this.app_access_token = store.state.app_access_token;
      },
      search: function () {
        if (this.key.trim() != '') {
          this.$router.push({path: '/searchContent', query: {key: this.key.trim()}});
        }
      },
      search_history: function (key) {
        this.key = key
      },
      _getHotKey: function () {
        let that = this;
        let data = {}
        axios.get('/xqjyw/zixun/findHotKey', {params: data})
          .then(function (response) {
            console.log(response.data);//获取数据
            if (response.data.msg == 'success') {
              that.hotkey = response.data.result;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      _getHistory: function () {//获取历史查询信息
        let that = this;
        let data = {serachAccout: this.user_people}
        axios.get('/xqjyw/zixun/findHistorical_SearchByAccout', {params: data})
          .then(function (response) {
            console.log(response.data);//获取数据
            that.searchHistory = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      focus: function () {
        this.searchShow = true
        this.$emit('searchshow')
      },
      searchCancel: function () {
        this.searchShow = false
        this.key = ''
        this.searchRes = null
        this.$router.push({path: '/home'})
      },
      closehistory() {
        let that = this;
        let data = {serachAccout: this.user_people}
        axios.get('/xqjyw/zixun/deleteLishi_sousuo', {params: data})
          .then(function (response) {
            console.log(response.data);//获取数据
            that.searchHistory = [];
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style lang="less">
  @import "../../styles/theme";

  #search {
    font-size: 16px;
  }

  /**/
  .search-item-temp {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    border-bottom: 1px solid @secondary-color;
    background-color: @secondary-color;
    .search-back {
      position: absolute;
      display: inline-block;
      width: 50px;
      height: 45px;
      top: 0;
      left: 16px;
      font-size: 15px;
      font-weight: 400;
      line-height: 45px;
      text-align: left;
      color: @search-font-color;
    }
    .search-input {
      position: absolute;
      display: flex;
      align-items: center;
      left: 58px;
      top: 0px;
      right: 58px;
      height: 30px;
      background-color: #ffffff;
      border-radius: 20px;
      border: 1px solid @secondary-color;
      margin: 6px 0;
      overflow: hidden;
      img {
        position: absolute;
        height: 14px;
        width: 14px;
        padding: 8px;
      }
      input {
        position: absolute;
        height: 30px;
        top: 0;
        left: 30px;
        right: 0px;
        border-radius: 0px;
        outline: none;
        width: calc(~"100% - 42px");
        border: 0;
        font-size: 14px;
      }
    }
    .search-btn {
      display: inline-block;
      position: absolute;
      width: 50px;
      height: 45px;
      top: 0;
      right: 16px;
      font-size: 15px;
      font-weight: 400;
      color: @search-font-color;
      line-height: 45px;
      text-align: right;
    }
  }

  /**/

  .search-goback {

    display: flex;
    width: 55px;
    padding: 10px 0 10px 20px;
    height: 40px;
    line-height: 40px;
  }

  .search {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 0;
    background: #fff;
    z-index: 1;
  }

  .search-cancel-show {
    width: 55px;
  }

  .hotkey {
    margin-top: 55px;
    margin-bottom: 50px;
    background: #eeeeee;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 16px;
    right: 16px;
  }

  .hotkey ul {
    list-style: none;
    background: #fff;
  }

  .hotkey ul li {
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    cursor: pointer;
  }

  .hotkey ul li .hotkey-index {
    padding-right: 10px;
  }

  .hotkey ul li .hotkey-k {
    flex-grow: 1;
  }

  .search-history {
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    padding: 4px 0px 0px 0px;
  }

  .search-history .search-history-item {
    margin: 12px 16px 0 0rem;
    height: 30px;
    line-height: 30px;
    padding: 0px 12px;
    border: 1px solid #B1B2B3;
    border-radius: 20px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.8);
    font-size: 15px;
  }

  .result-item .result-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .result-item .result-author {
    color: #929292;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex-grow: 1;
  }

  .action-button img {
    width: 20px;
  }

  @media screen and (min-width: 68vh) {
    .search {
      width: 68vh;
    }
  }

  .search-title {
    position: relative;
    background-color: #fff;
    padding: 10px 0px 16px 0px;
    font-size: 16px;
    border-bottom: 1px solid #F2F3F3;
    .panel-close {
      position: absolute;
      top: 8px;
      right: 0px;
      width: 24px;
      height: 24px;
      background: url('../../assets/image/ic_close.png') no-repeat center;
      background-size: 80%;
    }
  }

  .search-title:before {
    content: '';
    display: inline-block;
    position: relative;
    top: 2px;
    width: 4px;
    height: 15px;
    margin: 0px 5px 0px 0px;
    background-color: #72bff3;
  }


</style>

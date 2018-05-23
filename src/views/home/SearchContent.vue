<template>
  <div class="search_content">
    <div class="search_content_title" @click="back_search()"><span class="search_icon"></span>{{key}}</div>

    <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore"
              @on-pulldown-loading="refresh" v-model="status" ref="scroller"
              height="-46px"
              :pulldown-config="{content:'下拉可以刷新',downContent:'下拉可以刷新',upContent:'松开立即刷新',loadingContent:'正在加载中...'}">
      <div class="box2" ref="searchList">
        <group v-show="isLoading">
          <cell v-for="item in searchDataList" :title="item.title"
                :inline-desc="item.description?item.description+'...':item.pubDate"
                @click.native="getDetail(item)"></cell>
        </group>

        <skeleton-screen-loading-cell :cell_count="10" v-show="!isLoading"></skeleton-screen-loading-cell>
        <div class="no_data_search" v-show="isNoData"></div>
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
  import {Spinner, Group, Cell, Divider, Scroller} from 'vux'
  import axios from 'axios'
  import SkeletonScreenLoadingCell from '../../components/SkeletonScreenLoading_Cell'
  import store from '../../store/index'

  export default {
    store,
    name: "search-content",
    components: {
      Spinner,
      Group,
      Cell,
      Divider,
      Scroller,
      SkeletonScreenLoadingCell
    },
    data() {
      return {
        key: '搜索中...',//搜索关键字
        searchDataList: [],
        isLoading: false,
        isNoData: false,
        user_people: '',
        user_peoplename: '',
        app_access_token: '',
        status: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
        rows: 10,
        page: 1,
      }
    },
    created() {
      this.__getUserInfo();
      this.__getSearchDatail();
    },
    beforeRouteLeave(to, from, next) {
      console.log('to:'+to.name);
      console.log('from:'+from.name);
      console.log(from);
      if(to.name == 'search'){
        this.$destroy();
      }
      next();
    },
    // activated() {
    //   console.log('activated')
    //   console.log(this.$route.meta.isBack)
    //   let _isBack = this.$route.meta.isBack;
    //   if (_isBack) {
    //     this.searchDataList = [];
    //     this.isLoading = false;
    //     this.isNoData = false;
    //     this.status.pullupStatus = 'default';
    //     this.status.pulldownStatus = 'default';
    //     this.rows = 10;
    //     this.page = 1;
    //     this.__getSearchDatail();
    //   }
    // },
    methods: {
      __getUserInfo() {
        this.user_people = store.state.app_user_info.account;
        this.user_peoplename = store.state.app_user_info.displayName;
        this.app_access_token = store.state.app_access_token;
      },
      __getSearchDatail() {
        let that = this;
        let query_data = this.$route.query;
        //console.log(query_data);
        this.key = query_data.key;
        let data = {
          search: query_data.key,
          searchName: this.user_peoplename,
          serachAccout: this.user_people,
          access_token: this.app_access_token,
          page: 1,
          rows: this.rows * this.page
        }
        axios.get('/xqjyw/zixun/getnewsbySearch', {params: data})
          .then(function (response) {
            console.log(response.data);//获取数据
            if (response.data.length > 0) {
              that.searchDataList = response.data;
              that.$nextTick(() => {
                that.isLoading = true;
              })
            } else {
              that.isLoading = true;
              that.isNoData = true;
            }

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getDetail(item) {
        let _infoid = item.guid;
        let _title = item.title;
        let _author = item.author;
        let _pubDate = item.pubDate;
        let _category = item.category;
        let _categoryId = item.categoryId;
        this.$router.push({
          path: '/articleDetail',
          query: {id: _infoid, author: _author, title: _title, pubDate: _pubDate, category: _category , categoryId:_categoryId}
        });
      },
      back_search() {//返回搜索页面
        this.$router.back();
      },
      loadMore() {
        setTimeout(() => {
          var that = this;
          this.page = this.page + 1;
          let data = {
            search: this.key,
            searchName: this.user_peoplename,
            serachAccout: this.user_people,
            access_token: this.app_access_token,
            page: 1,
            rows: this.rows * this.page
          }
          axios.get('/xqjyw/zixun/getnewsbySearch', {params: data})
            .then(function (response) {
              console.log(response.data);//获取数据
              if (response.data.length > 0) {
                that.searchDataList = response.data;
                that.$nextTick(() => {
                  that.$refs.scroller.donePullup()
                })
              }
            })
            .catch(function (error) {
              console.log(error);
            });
          // setTimeout(() => {
          //   this.$refs.scroller.donePullup()
          // }, 10)
        }, 800)
      },
      refresh() {
        setTimeout(() => {
          this.__getSearchDatail();
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.scroller.donePulldown()
              this.pullupEnabled && this.$refs.scroller.enablePullup()
            }, 10)
          })
        }, 1000)
      }
    }
  }
</script>

<style lang="less">
  .search_content {
    .weui-cells {
      margin-top: 0px;
    }
  }

  .search_content_title {
    padding: 10px 20px;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    .search_icon {
      position: relative;
      display: inline-block;
      background: url("../../assets/image/icon-search.png") no-repeat center center;
      background-size: 90%;
      width: 28px;
      height: 28px;
      vertical-align: top;
    }
  }

  .no_data_search {
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url("../../assets/image/no_data.jpg") no-repeat center center;
    background-size: 100%;
    height: 500px;
  }

</style>

<template>

  <div class="mycolle">
    <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore"
              @on-pulldown-loading="refresh" v-model="status" ref="scroller"
              height=""
              :pulldown-config="{content:'下拉可以刷新',downContent:'下拉可以刷新',upContent:'松开立即刷新',loadingContent:'正在加载中...'}">
      <div class="box2">
        <group>
          <cell v-show="isLoading" v-for="item in collectDataList" :title="item.title" :inline-desc="'关键词：'+item.completed"
                @click.native="getDetail(item)">
          </cell>
          <skeleton-screen-loading-cell v-show="!isLoading" :cell_count="10"></skeleton-screen-loading-cell>
          <divider>我是有底线的</divider>
        </group>
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
    <div class="no_data_collect" v-show="isNoData"></div>
  </div>
</template>

<style lang="less">
  .mycolle {
    .vux-label-desc {
      padding-right: 0px;
    }
    .weui-cell {
      //height: 71px;
      padding: 16px 16px;
      .vux-label {
        font-size: 15px;
        line-height: 150%;
      }
      .vux-label-desc {
        font-size: 13px;
        color: rgba(0,0,0,0.6);
        div {
          margin-top: 6px;
        }
      }
      .weui-cells{
          line-height: normal;
      }
    }
    .weui-cell:before{
      left: 16px;
      right: 16px;
    }
    .weui-cells:after{
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 0px;
    }
    .vux-divider{
      font-size: 12px;
    }
  }

  .no_data_collect {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url("../../assets/image/no_collect.jpg") no-repeat center center;
    background-size: 100%;
  }
</style>
<script>

  import {Group, Cell, Scroller, Spinner, Divider} from "vux";
  import SkeletonScreenLoadingCell from '../../components/SkeletonScreenLoading_Cell'
  import axios from 'axios'
  import store from '../../store/index'

  export default {
    store,
    name: 'myCollection',
    components: {
      Cell,
      Group,
      SkeletonScreenLoadingCell,
      Scroller,
      Spinner,
      Divider
    },
    data() {
      return {
        collectDataList: [],
        isLoading: false,
        isNoData: false,//无数据展示控制
        status: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
        rows: 10,
        page: 1
      }
    },
    created() {
      this.__getMyCollectDatail();
    },
    methods: {
      __getMyCollectDatail() {
        let that = this;
        axios.get('todos', {})
          .then(function (response) {
            console.log(response.data);//获取数据
            if (response.data.length > 0) {
              that.collectDataList = response.data.slice(0,10);;
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
        let _infoid = item.id;
        let _title = item.title;
        let _author = item.author;
        let _pubDate = item.pubDate;
        let _category = item.category;
        this.$router.push({
          path: '/articleDetail',
          query: {id: _infoid, author: _author, title: _title, pubDate: _pubDate, category: _category}
        });
      },
      loadMore() {
        setTimeout(() => {
          var that = this;
          this.page = this.page + 1;
          axios.get('/todos', {})
            .then(function (response) {
              console.log(response.data);//获取数据
              let res_data = response.data;
              if (res_data.length > 0) {
                that.collectDataList = response.data.slice(0,that.page*that.rows);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
          setTimeout(() => {
            this.$refs.scroller.donePullup()
          }, 10)
        }, 800)
      },
      refresh() {
        setTimeout(() => {
          this.__getMyCollectDatail();
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

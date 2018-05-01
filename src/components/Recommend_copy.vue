<template>
  <div id="recommend">
    <!--<h3>{{$store.state.count}}</h3>-->
    <!--<button @click="add">+</button>-->
    <!--<button @click="reduce">-</button>-->

    <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore"
              @on-pulldown-loading="refresh" v-model="status" ref="scroller"
              :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中...'}">
      <div class="box2">
        <!--搜索-->
        <div class="search-item" @click="search">
          <div class="search-icon"></div>
          <div class="search-content">| 请输入你想搜索的内容</div>
        </div>
        <!--列表-->
        <ul id="rec-list" v-show="isShow">
          <li v-for="item in datalist" class="rec-item">
            <div class="rec-title">{{item.title}}</div>
            <div class="rec-img">
              <img v-lazy="item.url"/>
            </div>
            <div class="rec-footer">
              <div class="rec-left"><img v-lazy="item.thumbnailUrl"/></div>
              <div class="rec-right">
                <span class="rec-right-row font-bold">政策解读</span>
                <span class="rec-right-row font-light">2018-01-28</span>
              </div>
            </div>
          </li>
        </ul>
        <skeleton-screen-loading v-show="!isShow" style="position: relative;top: 40px;"></skeleton-screen-loading>
      </div>
      <!--pullup slot-->
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
           style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
        <span v-show="status.pullupStatus === 'default'"></span>
        <span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'"
              :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
        <span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
    </scroller>
  </div>
</template>

<script>
  import SkeletonScreenLoading from './SkeletonScreenLoading'
  import axios from 'axios'
  // import store from '../store'
  // import { mapState,mapMutations } from 'vuex';
  import {Scroller, Spinner} from 'vux'

  export default {
    name: "Recommend",
    components: {
      SkeletonScreenLoading,
      Scroller,
      Spinner
    },
    data() {
      return {
        datalist: [],
        isShow: false,
        n: 10,
        status: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        }
      }
    },
    mounted() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      var that = this;
      axios.get('https://jsonplaceholder.typicode.com/photos')
        .then(function (response) {
          console.log(response.data.slice(0, 10));
          that.datalist = response.data.slice(0, 10);
          that.$nextTick(() => {
            console.log("$nextTick")
            that.isShow = true;
          })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {
      search() {
        this.$router.push({path: '/search'});
      },
      loadMore() {
        setTimeout(() => {
          var that = this;
          axios.get('https://jsonplaceholder.typicode.com/photos')
            .then(function (response) {
              console.log(response.data.slice(0, 20));
              that.datalist = response.data.slice(0, 20);
              that.$nextTick(() => {
                console.log("$nextTick")
                that.isShow = true;
              })
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
          this.n = 10
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.scroller.donePulldown()
              this.pullupEnabled && this.$refs.scroller.enablePullup()
            }, 10)
          })
        }, 2000)
      }
    }
    // methods:mapMutations([
    //   'add','reduce'
    // ]),
    // computed:{
    //   ...mapState(["count"]),
    //   count(){
    //     return this.$store.getters.count;
    //   }
    // },
    // store
  }
</script>

<style lang="less">
  #recommend {
    position: relative;
    top: 45px;
    .search-item {
      position: absolute;
      margin: 10px auto;
      padding: 0;
      left: 20px;
      right: 20px;
      background-color: #ffffff;
      height: 28px;
      border: 1px solid #cccccc;
      border-radius: 28px;
      text-align: center;
      .search-icon {
        position: relative;
        display: inline-block;
        background: url("../assets/image/icon-search.png") no-repeat center center;
        background-size: 80%;
        width: 28px;
        height: 28px;
        vertical-align: top;
      }
      .search-content {
        position: relative;
        display: inline-block;
        height: 28px;
        color: #9b9b9b;
        font-size: 13px;
        line-height: 30px;
      }
    }
  }

  #rec-list {
    position: relative;
    margin: 0;
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    top: 50px;
    .rec-item {
      position: relative;
      padding: 0;
      list-style: none;
      border-bottom: 1px solid #ccc;
      height: 388px;
      margin-bottom: 20px;
      .rec-title {
        position: absolute;
        margin: 0px;
        color: #fff;
        padding: 15px 20px;
        z-index: 1;
        font-size: 16px;
        font-weight: 100;
      }
      .rec-img {
        position: absolute;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 300px;
      }
      .rec-img img {
        position: absolute;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 300px;
        border-radius: 5px;
      }
      .rec-footer {
        position: absolute;
        margin: 0;
        padding: 0;
        width: 100%;
        top: 320px;
        .rec-left {
          width: 50px;
        }
        .rec-left img {
          position: absolute;
          margin: 0;
          padding: 0;
          width: 50px;
          height: 50px;
        }
        .rec-right {
          margin-left: 60px;
          .rec-right-row {
            display: block;
            height: 25px;
            line-height: 25px;
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
    }
    .rec-item:last-child {
      border: 0px;
    }
  }
</style>

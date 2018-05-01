<template>
  <div style="position: relative;">
    <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore"
              @on-pulldown-loading="refresh" v-model="status" ref="scroller"
              height="-101px"
              :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中...'}">
      <div class="box2">
        <!--搜索-->
        <div class="search-item" @click="search">
          <div class="search-icon"></div>
          <div class="search-content">| 请输入你想搜索的内容</div>
        </div>
        <ul id="info-list">
          <li v-for="item in datalist" class="info-item" v-show="isShow">
            <div class="info-titile">{{item.title}}</div>
            <div class="info-img">
              <img v-lazy="item.url"/>
            </div>
            <div class="info-footer">
              <div class="info-footer-left">
                <img v-lazy="item.thumbnailUrl"/>
              </div>
              <div class="info-footer-right">
                <span class="info-right-row font-bold">政策解读</span>
                <span class="info-right-row font-light">2018-01-28</span>
              </div>
            </div>
          </li>
        </ul>
        <skeleton-screen-loading v-show="!isShow" style="position: relative;top: -15px;"></skeleton-screen-loading>
        <divider>我是有底线的</divider>
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
  import {Divider} from 'vux'
  import {Scroller, Spinner} from 'vux'

  export default {
    name: "demo-content",
    components: {
      Divider,
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
  }
</script>

<style lang="less">
  @import "../styles/theme";

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

  #info-list {
    display: flex;
    flex-direction: column;
    padding: 50px 15px 15px 15px;
    list-style: none;
    .info-item {
      position: relative;
      width: 100%;
      height: 380px;
      border-bottom: 1px solid #cccccc;
      margin-bottom: 30px;
    }
    .info-titile {
      position: absolute;
      z-index: 1;
      padding: 15px 20px;
      margin: 0px;
      font-size: 16px;
      font-weight: 100;
      color: #fff;
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
      bottom: 13px;
      height: 54px;
      .info-footer-left {
        height: 54px;
        line-height: 54px;
        width: 80px;
        text-align: center;
        display: inline-block;
        vertical-align: top;
        img {
          width: 50px;
          height: 50px;
          border: 2px solid @theme-color;
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

</style>

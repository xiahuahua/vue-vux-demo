<template>
  <div id="mySysMsg">
    <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore"
              @on-pulldown-loading="refresh" v-model="status" ref="scroller"
              height=""
              :pulldown-config="{content:'下拉可以刷新',downContent:'下拉可以刷新',upContent:'松开立即刷新',loadingContent:'正在加载中...'}">
      <div class="box2">
        <group v-show="isLoading">
          <cell v-for="item in systemDataList" :title="item.body" :inline-desc="item.email"
                @click.native="hdState(item)">
            <img slot="icon" src="../../assets/image/ic_sytemxiaoxi.png"/>
            <badge v-show="item.HDtype=='Yes'"></badge>
            <!--<span slot="inline-desc">{{item.neirong}}</span>-->
          </cell>
        </group>
        <skeleton-screen-loading-cell v-show="!isLoading" :cell_count="10"></skeleton-screen-loading-cell>
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
    <div class="no_data_sys" v-show="isNoData"></div>
  </div>
</template>
<style lang="less">
  body {
    background-color: #ffffff !important;
  }

  #mySysMsg {
    font-size: 14px;
    .weui-cell__ft {
      font-size: 12px;
      width: 10px;
    }
  }

  #mySysMsg img {
    width: 22px;
    height: 22px;
    margin-right: 10px;
  }

  #mySysMsg {
    .weui-cell {
      /*height: 55px;*/
      padding: 16px 16px;
      .vux-label-desc {
        font-size: 13px;
        color: rgba(0,0,0,0.6);
        span {
          display: inline-block;
          width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: keep-all;
          letter-spacing: 1px;
        }
      }
      .vux-label {
        font-size: 15px;
        line-height: 150%;
      }
    }

  }

  .hd {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #f74c31;
    left: 25px;
    border-radius: 10px;
    top: 25px;
  }

  .no_data_sys {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url("../../assets/image/no_data.jpg") no-repeat center center;
    background-size: 100%;
  }

</style>
<script>
  import {Group, XImg, Cell, Badge, Scroller, Spinner, Divider} from "vux";
  import axios from 'axios'
  import SkeletonScreenLoadingCell from "../../components/SkeletonScreenLoading_Cell";
  import store from '../../store/index'

  export default {
    store,
    name: 'MySysyemMsg',
    components: {
      SkeletonScreenLoadingCell,
      XImg,
      Group,
      Cell,
      Badge,
      Scroller,
      Spinner,
      Divider
    },
    data() {
      return {
        isLoading: false,
        isNoData: false,
        systemDataList: [],//[{"infoPeople":"js0401","createTime":"2018-04-10 17:07:21","HDtype":"Yes","id":"cac1d1087dd24b2fa7e6b0ed5358de6b","type":"SC","neirong":"您收藏了《教育部办公厅印发通知加快推进校外培训机构专项治理工作》的文章","infoPeopleName":"教师0401"},{"infoPeople":"js0401","createTime":"2018-04-10 16:58:30","HDtype":"Yes","id":"061c5a17cd2c42aa85c7d1d055a20d3c","type":"DY","neirong":"您取消订阅了《各区动态》的文章","infoPeopleName":"教师0401"},{"infoPeople":"js0401","createTime":"2018-04-10 16:58:30","HDtype":"Yes","id":"58d8037ba65a4b94ab878c38b4db0810","type":"DY","neirong":"您订阅了《上海教育》的文章","infoPeopleName":"教师0401"},{"infoPeople":"js0401","createTime":"2018-04-10 16:58:22","HDtype":"Yes","id":"0656fe63613940ebaeb5b0061dfeb70e","type":"DY","neirong":"您订阅了《各区动态》的文章","infoPeopleName":"教师0401"},{"infoPeople":"js0401","createTime":"2018-04-10 16:58:22","HDtype":"Yes","id":"ce7413a16be548c69adefc382a7ade9e","type":"DY","neirong":"您取消订阅了《上海教育》的文章","infoPeopleName":"教师0401"},{"infoPeople":"js0401","createTime":"2018-04-10 16:51:34","HDtype":"Yes","id":"b1ece29c826741ac9d26f85a0e705b3f","type":"DY","neirong":"您取消订阅了《各区动态》的文章","infoPeopleName":"教师0401"},{"infoPeople":"js0401","createTime":"2018-04-10 16:51:33","HDtype":"Yes","id":"2726a2bf618c434e8f22231e21bf67e9","type":"DY","neirong":"您订阅了《各区动态》的文章","infoPeopleName":"教师0401"},{"infoPeople":"js0401","createTime":"2018-04-10 16:51:32","HDtype":"Yes","id":"5fc1e11fcbeb45359aa5e2b792d62fa8","type":"DY","neirong":"您订阅了《上海教育》的文章","infoPeopleName":"教师0401"},{"infoPeople":"js0401","createTime":"2018-04-10 16:51:31","HDtype":"Yes","id":"bfab9dc8de7d4127ab495cc6f2a40ce3","type":"DY","neirong":"您取消订阅了《各地要闻》的文章","infoPeopleName":"教师0401"},{"infoPeople":"js0401","createTime":"2018-04-10 16:51:25","HDtype":"Yes","id":"3cdbfbb9020d40379aa994a3f9de4313","type":"DY","neirong":"您订阅了《各地要闻》的文章","infoPeopleName":"教师0401"}],
        status: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
        rows: 10,
        page: 1
      }
    },
    created() {
      this._getSystemDataList();
    },
    methods: {
      _getSystemDataList() {
        let that = this;
        axios.get('/comments', {})
          .then(function (response) {
            console.log(response.data);//获取数据
            if (response.data.length > 0) {
              that.systemDataList = response.data.slice(0,10);
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
      hdState(item) {
        item.HDtype = 'No'
        let data = {id: item.id}
        axios.get('/xqjyw/zixun/editInfo_quxiao', {params: data})
          .then(function (response) {
            console.log(response.data);//获取数据
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      loadMore() {
        setTimeout(() => {
          var that = this;
          this.page = this.page + 1;
          axios.get('/comments', {})
            .then(function (response) {
              console.log(response.data);//获取数据
              let res_data = response.data;
              if (res_data.length > 0) {
                that.systemDataList = response.data.slice(0,that.page*that.rows);
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
          this._getSystemDataList();
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

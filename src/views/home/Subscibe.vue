<template>
  <div id="recommend">
    <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore"
              @on-pulldown-loading="refresh" v-model="status" ref="scroller"
              height="-101px"
              :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中...'}">
      <div class="box2">
        <!--搜索-->
        <div class="tool-item">
          <div class="search-item-left" @click="search">
            <div class="search-icon"></div>
            <div class="search-content">| 请输入你想搜索的内容</div>
          </div>
          <div id="type-item-right" class="type-item-down" @click="search_type_all">全部分类</div>
        </div>
        <ul id="info-list">
          <li v-for="item in datalist" class="info-item" v-show="isShow"
              @click="_getInfoDetail(item.id,item.title,item.author,item.pubDate,item.category)">
            <div class="info-type">{{item.keywords|formatKeyword}}</div>
            <div class="info-read">{{item.readNum}}</div>
            <div class="info-titile">{{item.title}}</div>
            <div class="info-img">
              <img v-lazy="item.url"/>
            </div>
            <div class="info-footer">
              <div class="info-footer-left">
                <!--<img v-lazy="item.thumbnailUrl"/>-->
                <img src="../../assets/image/ic_lanmuhead.png"/>
              </div>
              <div class="info-footer-right">
                <span class="info-right-row font-bold">{{item.category}}</span>
                <span class="info-right-row font-light">{{item.pubDate}}</span>
              </div>
            </div>
          </li>
        </ul>
        <skeleton-screen-loading v-show="!isShow" style="position: relative;top: -15px;"></skeleton-screen-loading>

        <div class="no_data_subscribe" v-show="isNoData"></div>
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
    <popup v-model="show12" position="bottom" height="100%">
      <div class="panel-title"><span class="panel-title-content">
        <img src="../../assets/image/fenleititle.png">
      </span>
        <span class="panel-close" @click="panelClose"></span>
      </div>
      <div class="panel-content" v-for="item in typelist">
        <div class="panel-typeAll">{{item.lanmuName}}</div>
        <div class="panel-type-list">
          <div class="panel-type" v-for="type in item.lanmuList" :class="{'panel-type-check':type.isSub}"
               @click="subscibe_type(type)">{{type.lanmuName}}
          </div>
        </div>
      </div>
      <divider>我是有底线的</divider>
    </popup>
  </div>
</template>

<script>
  import {Popup, Divider, Scroller, Spinner} from 'vux'
  import SkeletonScreenLoading from '../../components/SkeletonScreenLoading'
  import axios from 'axios'
  import store from '../../store/index'

  export default {
    store,
    name: "Subscibe",
    components: {
      Popup,
      Divider,
      Scroller,
      Spinner,
      SkeletonScreenLoading
    },
    data() {
      return {
        datalist: [],
        show12: false,
        isShow: false,
        isNoData: false,
        n: 10,
        status: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
        typelist: [],
        rows: 5,
        page: 1,
        user_people: '',
        user_peoplename: '',
        app_access_token: ''
      }
    },
    created() {
      this.__getUserInfo();
      this.__getDataList();//获取订阅数据
    },
    mounted() {
      this._getTypeAll();//获取全部类型
    },
    methods: {
      __getUserInfo() {
        if (store.state.app_user_info == undefined) {
          console.log('订阅-未登录状态')
          window.open('http://api.age06.com/oauth2/authorize?response_type=code&client_id=28574929&redirect_uri=http%3a%2f%2fm.age06.com%2fdist&scope=web_news%20garden_news&display=page')
          return
        }else{
          console.log('订阅-已登录状态')
          console.log("account:" + store.state.app_user_info.account)
          console.log("displayName:" + store.state.app_user_info.displayName)
          this.user_people = store.state.app_user_info.account;
          this.user_peoplename = store.state.app_user_info.displayName;
          this.app_access_token = store.state.app_access_token;
        }
      },
      __getDataList() {
        var that = this;
        this.page = 1;
        let data = {dingyuePeople: this.user_people, page: 1, rows: this.rows * this.page}
        axios.get('/xqjyw/zixun/findDingyuelistPage', {params: data})
          .then(function (response) {
            console.log(response.data);//获取数据
            let res_data = response.data;
            if (res_data.total > 0) {
              that.datalist = res_data.rows;
              that.$nextTick(() => {
                console.log("$nextTick")
                that.isShow = true;
                that.isNoData = false;
              })
            } else {
              that.datalist = [];
              that.isShow = true;
              that.isNoData = true;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      _getTypeAll() {//获取全部订阅内容
        var that = this;
        axios.get('/xqjyw/zixun/findDingyue')
          .then(function (response) {
            //console.log(response.data)
            that.typelist = response.data;
            that._getTypeByUser();//获取用户订阅状态
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      _getTypeByUser() {//获取用户订阅状态
        let that = this;
        //let user_type = [{lanmuId:'7b9906d0-81b8-489e-85d7-5565b14c87bf'},{lanmuId:'ec0ce7ee-e493-437b-a0af-516519b1fbb1'}];
        let data = {dingyuePeopleName: this.user_peoplename, dingyuePeople: this.user_people};//数据
        axios.get('/xqjyw/zixun/findDingyueByPeople', {params: data})
          .then(function (response) {
            console.log(response.data);
            let user_type = response.data;
            user_type.forEach((val, i) => {
              //console.log(val.guid)
              that.dispose(val.lanmuId);
            })
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      dispose(_id) {//处理是否订阅数据
        console.log('dispose')
        console.log(_id)
        this.typelist.forEach((value, index) => {//循环遍历数组
          //let type_children = value.lanmuList.find((ele)=>(ele.guid == _id));//find()方法返回数组中符合测试函数条件的第一个对象
          //console.log(type_children.isSub)
          //this.$set(type_children,'isSub',true);
          //console.log(value);
          value.lanmuList.forEach((val, i) => {
            if (val.lanmuId == _id) {
              this.$set(val, 'isSub', true);
            }
          });
        })
      },
      _getInfoDetail(_infoid, _title, _author, _pubDate, _category) {
        console.log(_infoid)
        this.$router.push({
          path: '/articleDetail',
          query: {id: _infoid, author: _author, title: _title, pubDate: _pubDate, category: _category}
        });
      },
      search() {
        this.$router.push({path: '/search'})
      },
      search_type_all() {
        console.log('全部分类');
        document.title = '全部分类';
        this.show12 = true;
      },
      subscibe_type(type) {//订阅栏目
        let that = this;
        console.log(type)
        console.log(typeof type.isSub)
        let data = {
          lanmuId: type.lanmuId,
          dingyuePeopleName: that.user_peoplename,
          dingyuePeople: that.user_people,
          title: type.lanmuName
        };//数据
        console.log(data);
        if (typeof type.isSub == 'undefined') {
          this.$set(type, 'isSub', true);
          axios.get('/xqjyw/zixun/saveLanmu_Dingyue', {params: data})
            .then(function (response) {
              console.log(response.data);//获取数据
            })
            .catch(function (error) {
              console.log(error);
            });

        } else {
          type.isSub = !type.isSub;
          if (type.isSub) {//是否已订阅
            axios.get('/xqjyw/zixun/saveLanmu_Dingyue', {params: data})
              .then(function (response) {
                console.log(response.data);//获取数据
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            axios.get('/xqjyw/zixun/deleteLanmu_Dingyue', {params: data})
              .then(function (response) {
                console.log(response.data);//获取数据
              })
              .catch(function (error) {
                console.log(error);
              });
          }

        }
      },
      loadMore() {
        setTimeout(() => {
          var that = this;
          this.page = this.page + 1;
          let data = {dingyuePeople: this.user_people, page: 1, rows: this.rows * this.page}
          axios.get('/xqjyw/zixun/findDingyuelistPage', {params: data})
            .then(function (response) {
              console.log(response.data);//获取数据
              let res_data = response.data;
              if (res_data.total > 0) {
                that.datalist = res_data.rows;
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
          this.__getDataList();
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.scroller.donePulldown()
              this.pullupEnabled && this.$refs.scroller.enablePullup()
            }, 10)
          })
        }, 2000)
      },
      panelClose() {//关闭面板
        this.show12 = false;
        document.title = '资讯';
        this.__getDataList();
      }
    },
    filters:{
      formatKeyword:function(value){
        var keyword=value;
        if(keyword.length>8){
          keyword=keyword.substring(0,8)+'...';
        }
        return keyword;
      }
    }
  }
</script>

<style lang="less">
  @import "../../styles/theme";

  #recommend {
    .type-item-down:after {
      content: '';
      display: block;
      position: absolute;
      right: 6px;
      top: 0px;
      width: 15px;
      height: 100%;
      background: url('../../assets/image/ic_arrowdown.png') no-repeat center;
      background-size: 10px 4px;
    }
  }

  .tool-item {
    position: absolute;
    margin: 10px auto;
    padding: 0px;
    height: 28px;
    left: 16px;
    right: 16px;
    .search-item-left {
      position: absolute;
      left: 0px;
      right: 100px;
      border: 1px solid #C8C9CA;
      border-radius: 28px;
      height: 28px;
      text-align: left;
      background-color: #ffffff;
      font-size: 0px;
      .search-icon {
        position: relative;
        display: inline-block;
        background: url("../../assets/image/icon-searchfind.png") no-repeat center center;
        background-size: 40%;
        width: 14px;
        height: 14px;
        vertical-align: top;
        padding: 7px;
      }
      .search-content {
        position: relative;
        display: inline-block;
        height: 28px;
        color: #C8C9CA;
        font-size: 13px;
        line-height: 30px;
      }
    }
    #type-item-right {
      position: absolute;
      width: 80px;
      right: 10px;
      height: 28px;
      line-height: 28px;
      color: rgba(0, 0, 0, 0.8);
      font-weight: 200;
      font-size: 15px;
    }
  }

  /*全部分类控制面板*/
  .panel-title {
    padding: 16px 20px 10px;
    background-color: #ffffff;
    font-size: 16px;
    text-align: center;
    .panel-title-content {
      display: inline-block;
      position: relative;
      height: 28px;
      line-height: 28px;
      font-size: 20px;
      img{
        width: 180px;
      }
    }
    .panel-close {
      position: absolute;
      right: 15px;
      width: 28px;
      height: 28px;
      background: url('../../assets/image/ic_close.png') no-repeat center;
      background-size: 80%;
    }
  }

  .panel-typeAll:before {
    content: '';
    display: inline-block;
    position: relative;
    top: 2px;
    width: 4px;
    height: 15px;
    margin-right: 5px;
    background-color: #72bff3;
  }

  .panel-content {
    position: relative;
    background-color: #ffffff;
    .panel-typeAll {
      display: block;
      // display: flex;
      // align-items: center;;
      font-size: 16px;
      font-weight: 400;
      padding: 16px 16px 0px;

    }
    .panel-typeAll:after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: rgba(0, 0, 0, 0.05);
      margin-top: 16px;
    }
    .panel-type-list {
      display: flex;
      flex-wrap: wrap;
      padding: 0 10px 21px 0;
      .panel-type {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        border: 1px solid #cccccc;
        color: rgba(0, 0, 0, 0.8);
        padding: 0px 12px;
        margin: 16px 0 0 16px;
        border-radius: 20px;
        font-size: 15px;
        height: 30px;
        line-height: 30px;
      }
      .panel-type-check {
        background-color: @theme-color;
        border: 1px solid @theme-color;
        color: #ffffff;
        // text-shadow: 1px 1px 1px #000000;
        display: inline-block;
      }
    }
    .panel-type-list:after{
        position: absolute;
        bottom: 0px;
        left: 16px;
        right: 16px;
        content: '';
        display: block;
        height: 5px;
        background-color: @secondary-color;
      }
  }
    #recommend .panel-content:last-child{
      background-color: red;
      .panel-type-list:after{
        position: absolute;
        bottom: 0px;
        left: 16px;
        right: 16px;
        content: '';
        display: block;
        height: 5px;
        background-color: #ffffff;
      }
    }

  .no_data_subscribe {
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url("../../assets/image/no_subscribe.jpg") no-repeat center center;
    background-size: 100%;
    height: 500px;
  }

</style>

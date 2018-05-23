<template>
  <div id="articledetail">
    <h2>{{title}}</h2>
    <div class="articleinfo">
      <span>{{author}}</span>
      <span>{{creattime}}</span>
      <span class="collect" :class="{'collect_check':isCollect}" @click="collect">{{isCollect?'已收藏':'收藏'}}</span>
    </div>
    <!--<div class="articleimg">-->
    <!--<img :src="img"/>-->
    <!--</div>-->
    <div class="articlecont" v-html="content" v-show="isShow">
    </div>
    <skeleton-screen-loading v-show="!isShow" :ssl_count="2"
                             style="position: relative;top: 20px;"></skeleton-screen-loading>
    <div class="like" @click="__setLikeAndRead('DZ')">{{like_num}}<span
      :class="isLike?'icon_like_active':'icon_like'"></span>
    </div>
  </div>
</template>
<style lang="less">
  @import "../styles/theme";

  #articledetail {
    padding: 10px 16px;
    h2 {
      font-size: 20px;
    }
    .articleinfo {
      position: relative;
      margin: 10px 0px;
      font-size: 13px;
      color: #827f7f;
      span {
        margin-right: 5px;
      }
      .collect {
        position: absolute;
        top: -6px;
        right: -3px;
        border: 1px solid #9b9b9b;
        border-radius: 5px;
        padding: 5px 10px;
      }
      .collect_check {
        position: absolute;
        top: -6px;
        right: 0px;
        border: 1px solid @theme-color;
        border-radius: 5px;
        padding: 5px 10px;
        background-color: @theme-color;
        color: #ffffff;
      }
    }
    .articlecont {
      margin-top: 30px;
      font-size: 14px;
      color: #38383a;
      text-align: left;
      word-wrap: break-word;
      word-break: normal;
      line-height: 150%;
      padding-bottom: 10px;
      p {
        text-indent: 2em;
        text-align: justify;
        word-wrap: break-word;
        word-break: normal;
        img {
          text-indent: 0;
        }
      }
      img {
        display: block;
        width: 100%;
        padding: 10px 0;
        margin-left: 0;
      }
    }
    .articleimg {
      margin-bottom: 10px;
      img {
        width: 100%;
      }
    }
    .timeline-wrapper {
      padding: 0;
    }
    .like { //点赞
      display: block;
      font-size: 12px;
      color: #38383a;
      height: 20px;
      line-height: 22px;
      // margin-left: 10px;
      text-align: center;
      height: 50px;
      width: 50px;
      margin: auto;
      .icon_like {
        display: block;
        background: url("../assets/image/ic_like.png") no-repeat center center;
        background-size: 100%;
        width: 25px;
        height: 25px;
        vertical-align: top;
        margin: auto;
        margin-bottom: 16px;
      }
      .icon_like_active {
        display: block;
        background: url("../assets/image/ic_like_active.png") no-repeat center center;
        background-size: 100%;
        width: 25px;
        height: 25px;
        vertical-align: top;
        margin: auto;
        margin-bottom: 16px;
      }
    }
  }
</style>
<script>
  import axios from 'axios'
  import SkeletonScreenLoading from './SkeletonScreenLoading'
  import store from '../store/index'

  export default {
    store,
    name: 'ArticleDetail',
    components: {
      SkeletonScreenLoading
    },
    data() {
      return {
        newsId: '',
        title: '',
        author: '',
        creattime: '',
        fuid: '',
        img: '',
        content: '',
        isShow: false,//ssl骨架显示判断
        isCollect: false,
        user_people: '',
        user_peoplename: '',
        app_access_token: '',
        like_num: 0,//点赞数量
        isLike: false,//是否点赞
        is_teacher: '',
        is_parent: true,
        is_garden: '',
        is_xingzheng: '',
        isType: 'no'//是否登录
      }
    },
    created() {
      this.__getUserInfo();
      this.__getDataDatail();
      this.__setLikeAndRead('YD');//已阅、点赞
    },
    mounted() {
      this.__getDataCollect();//是否已收藏
    },
    methods: {
      __getUserInfo() {
        if (store.state.app_user_info) {
          this.user_people = store.state.app_user_info.account;
          this.user_peoplename = store.state.app_user_info.displayName;
          this.app_access_token = store.state.app_access_token;
        }else{
          this.app_access_token = store.state.app_access_token;
        }
        // this.user_people = 'zhouxingxing';
        // this.user_peoplename = '周星星';
        // this.app_access_token = '55458e45bc4f4bf2bbbc65da44a9f5b8';
      },
      __getDataDatail() {
        let _info = this.$route.query;
        console.log(_info)
        this.newsId = _info.id;
        this.title = _info.title;
        this.author = _info.author ? _info.category : _info.author;
        this.creattime = _info.pubDate;
        this.fuid = _info.categoryId;

        if (store.state.app_user_info == undefined) {//注册用户登录
          this.isType = 'no'
        } else if (store.state.app_user_type == undefined) {//是否是认证用户
          this.isType = 'yes'
        } else {
          this.is_teacher = store.state.app_user_type.isTeacher;
          this.is_parent = store.state.app_user_type.isParent;
          this.is_garden = store.state.app_user_type.isGardenAdmin;
          this.is_xingzheng = store.state.app_user_type.isOrganizationAdmin;
          this.isType = 'yes'
        }

        let that = this;
        let data = {
          newsId: _info.id,
          clickPeopleName: this.user_peoplename,
          clickPeople: this.user_people,
          access_token: this.app_access_token,
          fuId: this.fuid,
          teacher: this.is_teacher,
          parent: this.is_parent,
          garden: this.is_garden,
          xingzheng: this.is_xingzheng,
          isType: this.isType
        }
        axios.get('/xqjyw/zixun/getnewsbyId', {params: data})
          .then(function (response) {
            console.log(response.data);//获取数据
            if (response.data.msg == "success") {
              that.content = response.data.content;
              that.$nextTick(() => {
                that.isShow = true;
              })
            } else {
              //保存处理
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      __setLikeAndRead(_state) {
        let data = {
          lanmuId: this.newsId,
          dzName: this.user_peoplename,
          account: this.user_people,
          type: _state,
          title: this.title,
          fuId: this.fuid,
          teacher: this.is_teacher,
          parent: this.is_parent,
          garden: this.is_garden,
          xingzheng: this.is_xingzheng,
        };
        if (_state === 'DZ') {
          this.isLike = !this.isLike;
          if (this.isLike) {
            this.like_num++;
          } else {
            this.like_num--;
          }
        }
        axios.get('/xqjyw/zixun/saveDianzanAndYiyue', {params: data})
          .then(function (response) {
            console.log(response.data);//获取数据
            if (response.data.msg == 'success') {

            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      __getDataCollect() {
        let that = this;
        let data = {
          lanmuId: this.newsId,
          collectionPeopleName: this.user_peoplename,
          collectionPeople: this.user_people
        }
        axios.get('/xqjyw/zixun/findCollection', {params: data})
          .then(function (response) {
            console.log(response.data);//获取数据
            if (response.data.msg == 'success') {
              that.like_num = response.data.result[0].DZNUM;
              if (response.data.result[0].DZ > 0) {
                that.isLike = true;
              }
              if (response.data.result[0].SC > 0) {
                that.isCollect = true;
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      collect() {
        if (store.state.app_user_info == undefined) {
          window.open('http://api.age06.com/oauth2/authorize?response_type=code&client_id=28574929&redirect_uri=http%3a%2f%2fm.age06.com%2fdist&scope=web_news%20garden_news&display=page')
          return
        }

        let that = this;
        let data = {
          lanmuId: this.newsId,
          collectionPeopleName: this.user_peoplename,
          collectionPeople: this.user_people,
          title: this.title,
          fuId: this.fuid,
          teacher: this.is_teacher,
          parent: this.is_parent,
          garden: this.is_garden,
          xingzheng: this.is_xingzheng,
        }
        this.isCollect = !this.isCollect;
        if (this.isCollect) {//取消收藏
          axios.get('/xqjyw/zixun/saveCollection', {params: data})
            .then(function (response) {
              console.log(response.data);//获取数据
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          axios.get('/xqjyw/zixun/deleteCollection', {params: data})
            .then(function (response) {
              console.log(response.data);//获取数据
            })
            .catch(function (error) {
              console.log(error);
            });
        }

      }
    }
  }
</script>

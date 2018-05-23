import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/Home'
import NewsDetail from '../views/home/NewsDetail.vue'
import Application from '../views/application/Application'
import MySettings from '../views/mine/MySettings.vue'
import Search from '../views/home/Search'
import MyCollection from '../views/mine/MyCollection'
import MySysyemMsg from '../views/mine/MySysyemMsg'
import MyRanking from '../views/mine/MyRanking'
import MyPoints from '../views/mine/MyPoints'
import ArticleDetail from '../components/ArticleDetail'
import MySignAttend from '../views/mine/MySignAttend'
import SearchContent from '../views/home/SearchContent'
import Iframe from '../components/Iframe'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '*',
      component: Home,
      meta: {
        keepAlive: true, // 需要被缓存
        title: '资讯'
      }
    },
    {
      path: '/home',
      component: Home,
      meta: {
        keepAlive: true, // 需要被缓存
        title: '资讯'
      }
    },
    {
      path: '/newsdetail',
      component: NewsDetail
    },
    {
      path: '/application',
      component: Application,
      meta: {
        title: '应用'
      }
    },
    {
      path: '/mysettings',
      component: MySettings,
      meta: {
        keepAlive: true, // 需要被缓存
        title: '我的'
      }
    },
    {
      path: '/search',
      component: Search,
      name: 'search',
      meta: {
        title: '搜索'
      }
    },
    {
      path: '/myPoints',
      component: MyPoints,
      meta: {
        title: '我的积分'
      }
    },
    {
      path: '/myCollection',
      component: MyCollection,
      meta: {
        title: '我的收藏'
      }
    },
    {
      path: '/mySysyemMsg',
      component: MySysyemMsg,
      meta: {
        title: '系统消息'
      }
    },
    {
      path: '/myRanking',
      component: MyRanking,
      meta: {
        keepAlive: true, // 需要被缓存
        title: '排行'
      }
    }, {
      path: '/articleDetail',
      component: ArticleDetail,
      meta: {
        title: '资讯详情'
      }
    }, {
      path: '/mySignAttend',
      component: MySignAttend,
      meta: {
        keepAlive: true, // 需要被缓存
        title: '签到详情'
      }
    }, {
      path: '/searchContent',
      component: SearchContent,
      name: 'searchContent',
      meta: {
        keepAlive: true, // 需要被缓存
        title: '搜索结果',
      }
    }, {
      path: '/iframe',
      component: Iframe,
      meta: {
        title: '应用'
      }
    }
  ]
})

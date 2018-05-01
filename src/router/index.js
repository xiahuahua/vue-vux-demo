import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import NewsDetail from '../components/NewsDetail.vue'
import Application from '../components/Application'
import MySettings from '../components/MySettings.vue'
import Search from '../components/Search'
import MyCollection from '../components/MyCollection'
import MySysyemMsg from '../components/MySysyemMsg'
import MyRanking from '../components/MyRanking'
import MyPoints from '../components/MyPoints'
import ArticleDetail from '../components/ArticleDetail'
import MySignAttend from '../components/MySignAttend'
import SearchContent from '../components/SearchContent'
import Iframe from '../components/Iframe'

Vue.use(Router)

export default new Router({
  mode: 'history',
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

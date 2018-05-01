import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

export default new vuex.Store({
  state: {
    count: 1,
    home_tab_index: 0,
    app_tabbar_index: 0,
    app_is_guide: true,//引导页控制
    app_is_login: true,//回调登录控制
  },
  mutations: {
    set_home_tab_index(state, value) {
      state.home_tab_index = value;
    },
    set_app_tabbar_index(state, value) {
      state.app_tabbar_index = value;
    },
    set_app_is_guide(state, value) {
      state.app_is_guide = value;
    },
    set_app_is_login(state, value) {
      state.app_is_login = value
    },
    set_app_access_token(state, value) {
      state.app_access_token = value;
    },
    set_app_user_info(state, value) {
      state.app_user_info = value;
    },
    set_app_user_type(state, value) {
      state.app_user_type = value;
    }
  },
  actions: {
    set_home_tab_indexApp({commit}, platform) {
      commit('set_home_tab_index', platform);
    },
    set_app_tabbar_indexApp({commit}, platform) {
      commit('set_app_tabbar_index', platform);
    },
    set_app_is_guideApp({commit}, platform) {
      commit('set_app_is_guide', platform);
    },
    set_app_is_loginApp({commit}, platform) {
      commit('set_app_is_login', platform);
    },
    set_app_access_tokenApp({commit}, platform) {
      commit('set_app_access_token', platform);
    },
    set_app_user_infoApp({commit}, platform) {
      commit('set_app_user_info', platform);
    },
    set_app_user_typeApp({commit}, platform) {
      commit('set_app_user_type', platform);
    }
  },
  getters: {
    getApp: (state) => state.count,
    get_home_tab_indexApp: state => {
      return state.home_tab_index
    }
  }
})

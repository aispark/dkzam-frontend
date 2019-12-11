import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bottomNav: "",
    appBarTitle: "Delivery Order"
  },
  mutations: {
    updateBottomNav(state, bottomNav) {
      state.bottomNav = bottomNav;
    },
    updateAppBarTitle(state, appBarTitle) {
      state.appBarTitle = appBarTitle;
    }
  },
  actions: {
    updateBottomNav({ commit }, payload) {
      commit("updateBottomNav", payload);
    },
    updateAppBarTitle({ commit }, payload) {
      commit("updateAppBarTitle", payload);
    }
  },
  modules: {}
});

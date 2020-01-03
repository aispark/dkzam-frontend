import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bottomNav: "",
    appBarTitle: "Delivery Order",
    dispatchers: [
      {
        dispatcherCode: "100",
        dispatcher: "더쿠잼",
        dispatcherTel1: "010-7561-7461",
        dispatcherTel2: "",
        dispatcherPostNo: "22359",
        dispatcherAddr: "인천 중구 운남동 170-47"
      },
      {
        dispatcherCode: "200",
        dispatcher: "박준혁",
        dispatcherTel1: "010-4830-3290",
        dispatcherTel2: "",
        dispatcherPostNo: "22359",
        dispatcherAddr: "인천 중구 운남동 170-47"
      },
      {
        dispatcherCode: "300",
        dispatcher: "도쿄의하루",
        dispatcherTel1: "070-7913-7771",
        dispatcherTel2: "",
        dispatcherPostNo: "22382",
        dispatcherAddr:
          "인천광역시 중구 공항동로3길 72 인천공항 FEDEX 롯데글로벌로지스"
      }
    ]
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

import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "order",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Order.vue"),
    meta: {
      layout: "BottomLayout",
      appBarTitle: "주문"
    }
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    meta: {
      layout: "NoFrameLayout"
    }
  },
  {
    path: "/invoice",
    name: "invoice",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Invoice.vue"),
    meta: {
      layout: "BottomLayout",
      appBarTitle: "송장"
    }
  },
  {
    path: "/externalOrder",
    name: "externalOrder",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ExternalOrder.vue"),
    meta: {
      layout: "BottomLayout",
      appBarTitle: "송하인 지정 주문"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(function(to, from, next) {
  store.dispatch("updateBottomNav", to.name);
  store.dispatch(
    "updateAppBarTitle",
    (to.meta && to.meta.appBarTitle) || "Delivery Order"
  );

  next(); // 페이지 전환
});

export default router;

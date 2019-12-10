import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "order",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Order.vue"),
    meta: {
      layout: "BottomLayout"
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
      layout: "BottomLayout"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

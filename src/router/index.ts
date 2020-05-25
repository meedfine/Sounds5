import Vue from "vue";
import VueRouter from "vue-router";
import CommonLayout from "../components/Layout/Common.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/localMusic"
  },
  {
    path: "/findMusic",
    component: CommonLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/FindMusic/Index.vue")
      }
    ]
  },
  {
    path: "/localMusic",
    component: CommonLayout,
    children: [
      {
        path: "",
        name: "LocalMusic",
        component: () => import("@/views/LocalMusic/Index.vue")
      }
    ]
  },
  {
    path: "/trayMenu",
    name: "trayMenu",
    component: () => import("@/views/Tray/Tray.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/vxe-table",
    name: "vxe-table",
    component: () => import("@/views/vxe-table.vue"),
  },
  {
    path: "/father",
    name: "father",
    component: () => import("@/views/father.vue"),
  },
  {
    path: "/video",
    name: "video",
    component: () => import("@/views/video.vue"),
  },
  {
    path: "/video1",
    name: "video1",
    component: () => import("@/views/video1.vue"),
  },
  {
    path: "/videoIframe",
    name: "videoIframe",
    component: () => import("@/views/videoIframe.vue"),
  },
  {
    path: "/layoutVideo",
    name: "layoutVideo",
    component: () => import("@/views/layoutVideo.vue"),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

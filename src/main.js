import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VxeUITable from "vxe-table";
import "vxe-table/lib/style.css";
import "./styles/vxtable-variables.css";
import VideoPlayer from "vue-video-player";

import "video.js/dist/video-js.css";

import "vue-video-player/src/custom-theme.css";
import ElementUI from "element-ui";
import "./styles.scss";
import "./styles/index.scss";
Vue.use(ElementUI, {
  size: "medium",
});

Vue.use(VideoPlayer);

Vue.use(VxeUITable);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

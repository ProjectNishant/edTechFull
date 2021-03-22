
import Vue from "vue";
import App from "./App";
import router from "./router/index";
import VueCarousel from 'vue-carousel';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// Install BootstrapVue
Vue.use(BootstrapVue)


// import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
// Vue.use(BootstrapVue);
Vue.use(PaperDashboard);
Vue.use(VueCarousel);
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

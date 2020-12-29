import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Meta from 'vue-meta';
import VueAnalytics from 'vue-analytics';

Vue.use(VueAnalytics, {
  id: '223435784',
  router
})

Vue.config.productionTip = false;
Vue.use(Meta);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");




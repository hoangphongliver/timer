import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker';
import { BootstrapVue } from 'bootstrap-vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import VueOffline from 'vue-offline';
import store from "./store/store"

Vue.use(VueOffline)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  template: '',
  routes: routes
});

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

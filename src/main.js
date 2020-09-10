import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker';
import { BootstrapVue } from 'bootstrap-vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import VueOffline from 'vue-offline';
import store from "./store/store"
import Vuelidate from 'vuelidate'
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyBO3I4ahxKWyBsYfpw0dCDPPli5WsPTYtU",
  authDomain: "app-pwa-dcc636.firebaseapp.com",
  databaseURL: "https://app-pwa-dcc636.firebaseio.com",
  projectId: "app-pwa-dcc636",
  storageBucket: "app-pwa-dcc636.appspot.com",
  messagingSenderId: "340387587623",
  appId: "1:340387587623:web:eeddd9170dca07342f9002",
  measurementId: "G-91J8KTGWSR"
})
Vue.use(Vuelidate)

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

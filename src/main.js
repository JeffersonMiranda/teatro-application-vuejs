// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import moment from 'moment' // BIBLIOTECA PARA MANIPULAR DATAS

Vue.config.productionTip = false

Vue.prototype.$moment = moment; // DECLARANDO BIBLIOTECA PARA ACESSO GLOBAL NA APLICAÇÃO VUE

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

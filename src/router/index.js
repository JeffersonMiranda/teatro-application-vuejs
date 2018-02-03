import Vue from 'vue'
import Router from 'vue-router'
import EspetaculoHome from '@/components/EspetaculoHome'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'EspetaculoHome',
      component: EspetaculoHome
    }
  ]
})

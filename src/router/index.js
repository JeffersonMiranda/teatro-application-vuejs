import Vue from 'vue'
import Router from 'vue-router'
import EspetaculoHome from '@/components/EspetaculoHome'
import EspetaculoModificar from '@/components/EspetaculoModificar'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'EspetaculoHome',
      component: EspetaculoHome
    },
    {
      path: '/modificar',
      name: 'EspetaculoModificar',
      component: EspetaculoModificar
    }
  ]
})

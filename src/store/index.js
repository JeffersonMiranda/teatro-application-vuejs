import Vue from 'vue'
import Vuex from 'vuex'

import espetaculo from './espetaculo'
import poltrona from './poltrona'
import reserva from './reserva'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        espetaculo,
        poltrona,
        reserva
    }
})
import Vue from 'vue'
import Vuex from 'vuex'

import espetaculo from './espetaculo'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        espetaculo
    }
})
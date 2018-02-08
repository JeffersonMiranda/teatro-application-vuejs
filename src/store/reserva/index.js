import http from './../../http'

export default {
    state: {
        reservasPorEspetaculo: []
    },
    mutations: {
        SET_RESERVAS_POR_ESPETACULO: (state, data) => {
            state.reservasPorEspetaculo = data
        }
    },
    actions: {
        Set_Reservas_Por_Espetaculo: ({ commit }, id) => { // RECUPERA RESERVAS DE UM ESPETACULO
            return new Promise((resolve, reject) => {
                http.get('/reservas/?espetaculo=' + id).then((response) => {
                    commit('SET_RESERVAS_POR_ESPETACULO', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
            })
        }
    },
    getters: {
        getReservasPorEspetaculo: (state) => state.reservasPorEspetaculo
    }
}
import http from '../../http'

export default {
    state: {
        EspetaculosLista: []
    },
    mutations: {
        SET_ESPETACULOS_LISTA: (state, data) => {
            state.EspetaculosLista = data
        }
    },
    actions: {
        Set_Espetaculos_Lista: ({ commit })=>{
            return new Promise((resolve, reject) => {
                http.get('/espetaculos/').then((response) => {
                    commit('SET_ESPETACULOS_LISTA', response.data)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    },
    getters: {
        getEspetaculosLista: (state) => {
            return state.EspetaculosLista
        }
    }
}
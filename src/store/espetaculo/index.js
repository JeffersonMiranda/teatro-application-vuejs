import http from '../../http'

export default {
    state: {
        EspetaculosLista: [], // LISTA DE ESPETÁCULOS A SEREM APRESENTADOS NA TABELA
        Espetaculo: {
            descricao: "",
            data: "",
            hora: ""
        } // ESPETACULO APÓS SER SALVO OU EDITADO
    },
    mutations: {
        SET_ESPETACULOS_LISTA: (state, data) => {
            state.EspetaculosLista = data
        },
        SET_ESPETACULO: (state, data) => {
            state.Espetaculo = data
        },
        SET_RESERVAS: (state, data) => {
            state.Espetaculo.reservas = data;
        },
        ADD_RESERVA: (state, data) => { // ADICIONANDO A POLTRONA NA LISTA DE RESERVAS
            state.Espetaculo.reservas.push({
                espetaculo: state.Espetaculo.id,
                poltrona: data
            })
        },
        REMOVER_RESERVA: (state, data) => { // REMOVENDO A POLTRONA DA LISTA DE RESERVAS
            let rLista = state.Espetaculo.reservas;
            rLista.map(r => {
                if (r.poltrona.id == data.poltrona.id) {
                    rLista.splice(
                        rLista.findIndex(item => item.poltrona.id == r.poltrona.id),
                        1
                    );
                }
            });
        }
    },
    actions: {
        Set_Espetaculos_Lista: ({ commit }) => {
            return new Promise((resolve, reject) => {
                http.get('/espetaculos/').then((response) => {
                    response.data.map(r => {
                        r.reservas = r.reservas_id
                        delete r.reservas_id
                    })
                    commit('SET_ESPETACULOS_LISTA', response.data)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        Set_Espetaculo: ({ commit }, data) => {
            commit('SET_ESPETACULO', data);
        },
        Set_Reservas: ({ commit }, data) => {
            commit('SET_RESERVAS', data);
        },
        InserirEspetaculo: ({ commit }, data) => { //SALVAR ESPETACULO NO BANCO DE DADOS
            return new Promise((resolve, reject) => {
                http.post('/espetaculos/', data).then((response) => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        ModificarEspetaculo: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                http.put('/espetaculos/' + data.id + '/', data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        ExcluirEspetaculo: ({ commit }, id) => {
            return new Promise((resolve, reject) => {
                http.delete('/espetaculos/' + id + '/').then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        AddReserva: ({ commit }, data) => {
            commit('ADD_RESERVA', data);
        },
        RemoverReserva: ({ commit }, data) => {
            commit('REMOVER_RESERVA', data);
        }
    },
    getters: {
        getEspetaculosLista: (state) => state.EspetaculosLista,
        getEspetaculo: (state) => state.Espetaculo,
        getEspetaculosListaPorId: (state) => (id) => {
            return state.EspetaculosLista.find(e => e.id == id)
        },
        getArrecadacaoTotal: (state) =>
            state.EspetaculosLista.reduce((prevVal, elem) =>
                prevVal + (elem.reservas.length * 23.76)
                , 0)

    }
}
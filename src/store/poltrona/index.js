import http from './../../http'

export default {

    state: {
        poltronasLista: [] // LISTA DE POLTRONAS DISPONIVEIS 
    },
    mutations: {
        SET_POLTRONAS_LISTA: (state, data) => {
            state.poltronasLista = data
        },
        ATT_POLTRONAS_LISTA: (state, reservas) => { // ATUALIZANDO A LISTA DE POLTRONAS DISPONIVEIS TIRANDO AS RESERVAS
            let pLista = state.poltronasLista;

            reservas.map(r => {
                pLista.map(p => {
                    if (p.id == r.poltrona.id) {
                        pLista.splice(pLista.indexOf(p), 1)
                    }
                });
            });
        },
        ADD_POLTRONA: (state,poltrona)=>{ // ADICIONANDO POLTRONA NA LISTA DE RESERVAS
            state.poltronasLista.push(poltrona)
        }
    },
    actions: {
        Set_Poltronas_Lista: ({ commit }) => { // RECUPERA TODAS AS POLTRONAS DO BANCO DE DADOS
            return new Promise((resolve, reject) => {
                http.get('/poltronas/').then(response => {
                    commit('SET_POLTRONAS_LISTA', response.data);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        AttPoltronasDisponiveis: ({ commit }, data) => { // 
            commit('ATT_POLTRONAS_LISTA', data);
        },
        AddPoltrona:({commit},data)=>{
            commit('ADD_POLTRONA',data);
        }
    },
    getters: {
        getPoltronasLista: state => state.poltronasLista
    }

}
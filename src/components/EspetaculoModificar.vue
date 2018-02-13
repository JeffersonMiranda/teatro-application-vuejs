<template>
  <div>
      <div class="row justify-content-start">
          <div class="col-1 botaoVoltar">
              <a @click.prevent="VoltarPaginaInicial" href="#"> Voltar </a>
          </div>
      </div>

      <espetaculo-form ref="formulario"> 
          <button slot="botao" @click="SalvarAlteracoes">Salvar alterações</button>
      </espetaculo-form>      

    <br>

      <div class="row" v-if="reservasLoaded"> <!--RENDERIZA QUANDO AS RESERVAS ESTIVEREM CARREGADAS-->

          <div class="col-md">
              <h6> Poltronas disponíveis </h6>
            <select size="25" v-model="poltronaSelecionada">
                <option v-for="poltrona in poltronasLista" :value="poltrona" v-on:click="changePoltronaSwitch(true)">
                    {{ "Poltrona " + poltrona.numero }}
                </option>
            </select>
          </div>
           
           <div class="col-md">
               <button v-show="poltronaSwitch" @click="adicionarReserva"> >>> </button>
               <br>
               <br>
               <button v-show="!poltronaSwitch" @click="removerReserva"> <<< </button>
           </div>

          <div class="col-md">
              <h6>Reservas</h6>
            <select size="25" v-model="reservaSelecionada">
                <option v-for="reserva in this.espetaculo.reservas" :value="reserva" v-on:click="changePoltronaSwitch(false)" >
                    {{ "Poltrona " + reserva.poltrona.numero }}
                </option> 
            </select>
          </div>

      </div>  

  </div>
</template>

<script>
import EspetaculoForm from "./EspetaculoForm";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    EspetaculoForm
  },
  data() {
    return {
      reservasLoaded: false,
      poltronaSelecionada: [],
      reservaSelecionada: [],
      poltronaSwitch: true // PROPRIEDADE PARA DEFINIR A VISIBILIDADE DOS BOTÕES DE ADICIONAR E REMOVER POLTRONA
    };
  },
  computed: {
    ...mapGetters({
      poltronasLista: "getPoltronasLista",
      espetaculo: "getEspetaculo",
      reservasEspetaculo: "getReservasPorEspetaculo"
    })
  },
  methods: {
    ...mapActions([
      "Set_Poltronas_Lista",
      "Set_Espetaculo",
      "Set_Reservas_Por_Espetaculo",
      "AttPoltronasDisponiveis",
      "Set_Reservas",
      "AddReserva",
      "RemoverReserva",
      "AddPoltrona",
      "ModificarEspetaculo"
    ]),
    changePoltronaSwitch(value) {
      this.poltronaSwitch = value;
    },
    adicionarReserva() {
      // REMOVENDO POLTRONA DA LISTA DE DISPONÍVEIS
      this.AttPoltronasDisponiveis(
        Array({
          poltrona: this.poltronaSelecionada
        })
      );
      // ADICIONANDO A POLTRONA NA LISTA DE RESERVAS
      this.AddReserva(this.poltronaSelecionada);
      this.poltronaSelecionada = null;
    },
    removerReserva() {
      // REMOVENDO A POLTRONA DA LISTA DE RESERVAS
      this.RemoverReserva(this.reservaSelecionada);
      // INSERINDO A POLTRONA NA LISTA DE DISPONÍVEIS
      this.AddPoltrona(this.reservaSelecionada.poltrona);
      this.reservaSelecionada = null;
    },
    SalvarAlteracoes() {
      this.ModificarEspetaculo(this.espetaculo)
        .then(response => {
          alert("Espetáculo alterado com sucesso !");
        })
        .catch(error => {
          alert(error);
        });
    },
    VoltarPaginaInicial() {
      this.$router.push({ path: "/" }, () => {
        this.Set_Espetaculo({});
      });
    }
  },
  created() {
    this.Set_Poltronas_Lista()
      .then()
      .catch(error => {
        alert(error);
      });

    this.Set_Reservas_Por_Espetaculo(this.espetaculo.id)
      .then(response => {
        if (response.status == 200) {
          this.Set_Reservas(this.reservasEspetaculo);
          this.AttPoltronasDisponiveis(this.espetaculo.reservas);
        }
      })
      .catch(error => {
        alert(error);
      })
      .finally(() => {
        this.reservasLoaded = true; // SETANDO PROPRIEDADE PARA SER RESERVADA
      });
  }
};
</script>

<style scoped>
select {
  width: 300px;
}
</style>

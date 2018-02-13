<template>
  <div>

      <espetaculo-form ref="formulario">         
            <button slot="botao" @click="SalvarEspetaculo">Lançar</button>
      </espetaculo-form>

    <br>
    <br>

      

    <div class="row justify-content-md-center">
      <div class="col-md-auto">
        <div v-if="!espetaculosLoading && getEspetaculosLista.length">
            <span class="arrecadacao">Arrecadação total: R$ {{ this.getArrecadacaoTotal.toLocaleString() }}</span>   
            <espetaculo-tabela :data="getEspetaculosLista"></espetaculo-tabela>
        </div>
        <div v-else-if="!espetaculosLoading && !getEspetaculosLista.length">
            <span> Sem espetáculos cadastrados </span>
        </div>   
        <div v-else>
            <span> Carregando </span>
          </div> 
      </div>
    </div>

  </div>
</template>
<script>
import EspetaculoTabela from "./EspetaculoTabela";
import EspetaculoForm from "./EspetaculoForm";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    EspetaculoTabela,
    EspetaculoForm
  },
  data() {
    return {
      espetaculosLoading: true
    };
  },
  computed: {
    ...mapGetters([
      "getEspetaculosLista",
      "getEspetaculo",
      "getArrecadacaoTotal"
    ])
  },
  methods: {
    ...mapActions([
      "Set_Espetaculos_Lista",
      "Set_Espetaculo",
      "InserirEspetaculo"
    ]),
    GetEspetaculos() {
      // RECUPERAR TODOS OS ESPETÁCULOS DOS BANCO
      this.Set_Espetaculos_Lista()
        .then()
        .catch(response => {
          alert(response.data.error);
        })
        .finally(() => {
          this.espetaculosLoading = false;
        });
    },
    SalvarEspetaculo() {
      this.espetaculosSaving = true;

      this.InserirEspetaculo(this.getEspetaculo)
        .then(response => {
          if (response.status == 201) {
            alert(
              "Espetáculo lançado com sucesso ! Em seguida, insira as poltronas reservadas"
            );
            this.Set_Espetaculo(response.data);
            this.$router.push("/modificar");
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  },
  created() {
    this.GetEspetaculos();
  }
};
</script>

<style scoped>
.arrecadacao {
  font-weight: bold;
}
</style>

<template>
  <div>

      <espetaculo-form ref="formulario">         
            <button slot="botao" @click="SalvarEspetaculo">Lançar</button>
      </espetaculo-form>

    <br>
    <br>

    <div class="row justify-content-md-center">
      <div class="col-md-auto">
        <div v-if="!espetaculosLoading">
            <espetaculo-tabela :data="getEspetaculosLista"></espetaculo-tabela>
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
      espetaculosLista: [],
      espetaculosLoading: true
    };
  },
  computed: {
    ...mapGetters(["getEspetaculosLista","getEspetaculo"])
  },
  methods: {
    ...mapActions([
      "Set_Espetaculos_Lista",
      "Set_Espetaculo",
      "InserirEspetaculo"
    ]),
    reset() {
      // MÉTODO PARA RESETAR O FORMULÁRIO APÓS O ESPETÁCULO SER SALVO
      Object.assign(this.$data, this.$options.data.call(this));
    },
    GetEspetaculos() {
      // RECUPERAR TODOS OS ESPETÁCULOS DOS BANCO
      this.Set_Espetaculos_Lista()
        .then(response => {
          if (response.status == 200) {
            this.espetaculosLoading = false;
          }
        })
        .catch(response => {
          alert(response.data.error);
        });
    },
    SalvarEspetaculo() {
      this.espetaculosSaving = true;
      this.$refs.formulario.FormatarData(); // FORMATANDO A DATA ANTES DO ESPETÁCULO SER SALVO

      this.InserirEspetaculo(this.getEspetaculo)
        .then(response => {
          if (response.status == 201) {
            alert("Espetáculo lançado com sucesso !");
            this.Set_Espetaculo(response.data)
            this.$router.push("/modificar");
          }
        })
        .catch(response => {
          alert(response.data.error);
        });
      // this.espetaculosSaving = false;
    }   
  },
  created() {
    this.GetEspetaculos();
  }
};
</script>

<style scoped>

</style>

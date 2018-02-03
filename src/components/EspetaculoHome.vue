<template>
  <div>

    <div class="row">
        <div class="col-md">            
            <label>Descrição</label>
            <input type="text" v-model="espetaculo.descricao">
        </div>
        
        <div class="col-sm">
            <label>Data</label>
            <input type="date" v-model="espetaculo.data">
        </div>

        <div class="col-md">
             <label>Hora</label>
            <input type="time" v-model="espetaculo.hora">
        </div>
    </div>

    <div class="row">
      <div class="col-md">
        <div v-if="espetaculosLoading">
            <espetaculo-tabela :data="getEspetaculosLista"></espetaculo-tabela>
        </div>
        <div v-else>
            <span> Carregando </span>
        </div>
    
      </div>
    </div>
{{ getEspetaculosLista }}
  </div>
</template>
<script>
import EspetaculoTabela from "./EspetaculoTabela";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    EspetaculoTabela
  },
  data() {
    return {
      espetaculo: {
        descricao: "",
        data: "",
        hora: ""
      },
      espetaculosLista: [],
      espetaculosLoading: false
    };
  },
  computed: {
    ...mapGetters(["getEspetaculosLista"])
  },
  methods: {
    ...mapActions(["Set_Espetaculos_Lista"])
  },
  created() {
    this.Set_Espetaculos_Lista().then(response => {
      if (response.status == 200) {
        this.espetaculosLoading = true;
        console.log(response.data);
      }
    });
  }
};
</script>

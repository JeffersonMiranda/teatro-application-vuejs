<template>
    <div>

         <div v-if="!espetaculosSaving" class="row justify-content-md-center">
      
          <div class="col-md">            
              <label>Descrição</label>
              <input type="text" v-model="espetaculo.descricao">
          </div>
          
          <div class="col-md">
              <label>Data</label>
              <input type="date" v-model="espetaculo.data">
          </div>

          <div class="col-md">
              <label>Hora</label>
              <input type="time" v-model="espetaculo.hora">
          </div>
            <div class="col-md">
              <slot name="botao"></slot>                
          </div>          
     </div>  

      <div v-else class="row justify-content-md-center">
          <span> Salvando </span>
      </div>     
{{ this.$store.getters.getEspetaculo }}
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      espetaculosSaving: false
    };
  },
  computed: {
    ...mapGetters({
      espetaculo: "getEspetaculo"
    })
  },
  methods: {
    FormatarData() {
      // CONVERTENDO A DATA PARA O FORMATO BRASILEIRO
      let d = this.$moment(this.espetaculo.data).format("DD/MM/YYYY");
      this.espetaculo.data = d;
    }
  }
};
</script>

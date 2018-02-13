<template>
    <div>

         <div v-if="!espetaculosSaving" class="row justify-content-md-center">
      
          <div class="col-md">            
              <label>Descrição</label>
              <input type="text" v-model="espetaculo.descricao">
          </div>
          
          <div class="col-md">
              <label>Data</label>
              <input type="date" v-model.lazy="espetaculo.data">
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
  }
};
</script>

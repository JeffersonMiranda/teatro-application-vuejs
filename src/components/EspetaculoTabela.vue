<template>
  <div>

       <table>
        <thead>
          <tr>
          <th> Código </th>
          <th> Descrição </th>     
          <th> Data </th>
          <th> Hora </th>
          <th> Reservas </th>
          <th> Polt. livres </th>
          <th> Arrecadação </th>
          <th> Ações </th>
          </tr>
        </thead>    
        <tr v-for="item in data">
          <td> {{ item.id }} </td>
          <td> {{ item.descricao }} </td>
          <td> {{ item.data }} </td>
          <td> {{ item.hora }} </td>
          <td> {{ item.reservas.length }}  </td>
          <td> {{ 100 - item.reservas.length }}  </td>
          <td> {{ (item.reservas.length * 23.76).toLocaleString() }}  </td>
          <td>
          <button @click="EditarEspetaculo(item.id)">Editar</button>
          <button>Remover</button>
          </td>
        </tr>
      </table>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    data: {
      // LISTA DE ESPETACULOS
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters(["getEspetaculosListaPorId"])
  },
  methods: {
    ...mapActions(["Set_Espetaculo"]),
    EditarEspetaculo(id) {
      let e = this.getEspetaculosListaPorId(id); // BUSCANDO ESPETACULO A SER EDITADO
      this.Set_Espetaculo(e);
      this.$router.push("/modificar");
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}

td,
th {
  border: 1px solid gray;
}
</style>

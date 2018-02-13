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
          <td> {{ FormatarData(item.data) }} </td>
          <td> {{ item.hora }} </td>
          <td> {{ item.reservas.length }}  </td>
          <td> {{ 100 - item.reservas.length }}  </td>
          <td> R$ {{ (item.reservas.length * 23.76).toLocaleString() }}  </td>
          <td>
          <button @click="EditarEspetaculo(item.id)">Editar</button>
          <button @click="RemoverEspetaculo(item.id)">Remover</button>
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
    ...mapActions(["Set_Espetaculo", "ExcluirEspetaculo"]),
    EditarEspetaculo(id) {
      let e = this.getEspetaculosListaPorId(id); // BUSCANDO ESPETACULO A SER EDITADO
      this.Set_Espetaculo(e);
      this.$router.push("/modificar");
    },
    FormatarData(data) {
      // CONVERTENDO A DATA PARA O FORMATO BRASILEIRO
      let d = this.$moment(data).format("DD/MM/YYYY");
      return d;
    },
    RemoverEspetaculo(id) {
      this.ExcluirEspetaculo(id)
        .then(response => {
          if ((response.status = 204)) {
            alert("Espetáculo removido com sucesso !");
            this.$parent.GetEspetaculos();
          }
        })
        .catch(error => {
          alert(error);
        });
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

<template>
  <div>

      <table>
          <th> Código </th>
          <th> Descrição </th>     
          <th> Data </th>
          <th> Hora </th>
      </table>

  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>

</style>

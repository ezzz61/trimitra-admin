<template>
  <div>
    <b-skeleton-table
      :rows="4"
      :columns="4"
      :table-props="{ bordered: true, striped: true }"
    ></b-skeleton-table>
  </div>
</template>

<script>
export default {
  name: "LoadingTable",
};
</script>


<template>
  <keep-alive>
    <router-view class="main" />
  </keep-alive>
</template>

<script lang="ts">
import Vue from "vue";
import { remote } from "electron";
export default Vue.extend({
  created() {
    const win = remote.getCurrentWindow();
    if (win.id == 1) {
      this.$router.push({
        path: "/trayMenu"
      });
    }
  }
});
</script>

<style lang="scss">
// #app {
//   color: #333;
//   font-size: 14px;
//   height: 100%;
//   .el-table,
//   .el-table__expanded-cell {
//     background-color: inherit;
//   }
//   .el-table__header {
//     th,
//     tr {
//       background-color: inherit;
//     }
//   }
//   .el-table th,
//   .el-table tr {
//     background-color: inherit;
//   }
//   .el-table__header {
//     width: 100% !important;
//   }
//   .el-table__body {
//     width: 100% !important;
//   }
//   .el-table .cell {
//     white-space: nowrap;
//   }
//   .el-table__empty-block {
//     width: 100% !important;
//     overflow-y: scroll;
//   }
//   .el-table__header {
//     table-layout: auto;
//   }
//   .el-table--scrollable-y .el-table__body-wrapper {
//     overflow-y: scroll;
//   }
// }
</style>

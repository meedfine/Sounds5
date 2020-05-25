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

<style lang="scss"></style>

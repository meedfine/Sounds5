<template>
  <header class="header">
    <div class="searchCom no-drag">
      <i class="iconfont iconback" @click="hideWindow"></i>
    </div>
    <div class="controlCom no-drag">
      <i class="icon-hide" @click="hideWindow"></i>
      <i
        :class="{
          'icon-minimax': !isMaximized,
          'icon-minimax2': isMaximized
        }"
        @click="minimaxWindow"
      ></i>
      <i class="icon-close" @click="closeWindow"></i>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import { ipcRenderer } from "electron";
export default Vue.extend({
  data() {
    return {
      isMaximized: false
    };
  },
  mounted() {
    ipcRenderer.on("resizeWindow", (event, arg) => {
      this.isMaximized = arg;
    });
  },
  methods: {
    hideWindow() {
      ipcRenderer.send("hideWindow");
    },
    minimaxWindow() {
      ipcRenderer.send("minimaxWindow");
    },
    closeWindow() {
      ipcRenderer.send("closeWindow");
    }
  }
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  .searchCom {
    .iconfont {
      font-size: 24px;
      color: #ccc;
    }
  }
  .controlCom {
    height: 100%;
  }
}
</style>

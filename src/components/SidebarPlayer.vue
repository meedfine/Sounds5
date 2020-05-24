<template>
  <div class="sidebarCom">
    <img class="audioImg" :src="audioImg" alt="" />
    <i class="icon-prev"></i>
    <i class="icon-play" :class="{ pause: $store.state.playStatus }" @click="togglePlay"></i>
    <i class="icon-next"></i>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  computed: {
    audioImg() {
      const time1 = new Date().getTime();
      const playList = this.$store.state.playList;
      const playIndex = this.$store.state.playIndex;
      const bytes = new Uint8Array(playList[playIndex]?.picture);
      let data = "";
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        data += String.fromCharCode(bytes[i]);
      }
      const time2 = new Date().getTime();
      console.log(time2 - time1);
      return "data:image/png;base64," + window.btoa(data);
    }
  },
  methods: {
    togglePlay() {
      const status = this.$store.state.playStatus;
      this.$store.commit("SET_PLAYSTATUS", !status);
    }
  }
});
</script>

<style lang="scss" scoped>
.sidebarCom {
  font-size: 0;
}
.audioImg {
  width: 60px;
}
</style>

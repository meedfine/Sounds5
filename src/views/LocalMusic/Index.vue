<template>
  <div class="localMusic">
    <div>
      <el-button type="text" @click="openFolder">选择目录</el-button>
    </div>
    <el-table class="localTable" :data="musicList" style="width: 100%" height="100%" @row-dblclick="playMusic">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="title" label="音乐" width="200"> </el-table-column>
      <el-table-column prop="artists" label="歌手" width="140" :formatter="formatArtists"> </el-table-column>
      <el-table-column prop="album" label="专辑" width="140"> </el-table-column>
      <el-table-column prop="duration" label="时长" width="80" :formatter="formatDuration"> </el-table-column>
      <el-table-column prop="size" label="大小" width="80" :formatter="formatSize"> </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import nativeUtil from "@/utils/index";
import dayjs from "dayjs";
export default Vue.extend({
  data() {
    return {
      musicList: [] as AudioDes[]
    };
  },
  methods: {
    async openFolder() {
      const path = await nativeUtil.chooseFolder();
      const info = await nativeUtil.readFolder(path);
      this.musicList = [];
      for (const file of info.files) {
        let audioDes = await nativeUtil.readMetadata(file.path);
        audioDes && (audioDes = { ...audioDes, ...file }) && this.musicList.push(audioDes);
      }
    },
    formatDuration(row) {
      return dayjs(Math.floor(row.duration * 1000)).format("mm:ss");
    },
    formatSize(row) {
      return (row.size / 1000 / 1000).toFixed(1) + "MB";
    },
    formatArtists(row) {
      return row.artists.join(" / ");
    },
    playMusic(row) {
      this.$store.commit("SET_PLAYLIST", this.musicList);
      this.$store.commit("SET_PLAYINDEX", this.musicList.indexOf(row));
    }
  }
});
</script>

<style lang="scss">
.localMusic {
  display: flex;
  flex-direction: column;
}
</style>

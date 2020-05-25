<template>
  <footer class="footer">
    <div class="musicInfo">
      <div class="musicImg" @click="toggleDetail">
        <img :src="audioImg" alt="" />
        <div class="musicCover">
          <i class="iconfont i-expand" :class="{ rotate: musicDetail }"></i>
        </div>
      </div>

      <div v-if="musicInfo.title" class="musicMeta">
        <div class="name">
          {{ musicInfo.title }}
          <span class="artists"> - {{ musicInfo.artists | formatArtists }}</span>
        </div>
        <div class="duration">{{ $store.state.currentTime | formatDuration }} / {{ musicInfo.duration | formatDuration }}</div>
      </div>
    </div>
    <div class="musicPlay">
      <i class="iconfont i-previous"></i>
      <i class="playWrap" @click="togglePlay">
        <i class="icon-play" :class="{ pause: $store.state.playStatus }"></i>
      </i>
      <i class="iconfont i-next"></i>
    </div>
    <div class="musicControl">
      <i class="iconfont i-list" @click="toggleList"></i>
    </div>
    <el-drawer class="listDrawer" :visible.sync="listDrawer" :with-header="false" size="300px"> </el-drawer>
    <el-drawer class="musicDetail" direction="btt" :visible.sync="musicDetail" :with-header="false" size="100%"> </el-drawer>
    <el-slider v-if="musicInfo.duration" v-model="durationProgress" class="durationWrap" :show-tooltip="false" @change="changeCurrentTime"></el-slider>
    <Audio ref="audio"></Audio>
  </footer>
</template>

<script lang="ts">
import Vue from "vue";
import Audio from "./Audio.vue";
export default Vue.extend({
  components: {
    Audio
  },
  data() {
    return {
      listDrawer: false,
      musicDetail: false,
      durationProgress: 0
    };
  },
  computed: {
    musicInfo() {
      const playList = this.$store.state.playList;
      const playIndex = this.$store.state.playIndex;
      return playList[playIndex];
    },
    audioImg() {
      const playList = this.$store.state.playList;
      const playIndex = this.$store.state.playIndex;
      const bytes = new Uint8Array(playList[playIndex]?.picture);
      let data = "";
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        data += String.fromCharCode(bytes[i]);
      }
      return "data:image/png;base64," + window.btoa(data);
    }
  },
  watch: {
    "$store.state.currentTime"(currentTime) {
      const playList = this.$store.state.playList;
      const playIndex = this.$store.state.playIndex;
      const duration = playList[playIndex].duration;
      this.durationProgress = (currentTime / duration) * 100;
    }
  },
  methods: {
    togglePlay() {
      this.$store.commit("SET_PLAYSTATUS", !this.$store.state.playStatus);
    },
    toggleList() {
      this.listDrawer = !this.listDrawer;
    },
    toggleDetail() {
      this.musicDetail = !this.musicDetail;
    },
    changeCurrentTime(val) {
      const playList = this.$store.state.playList;
      const playIndex = this.$store.state.playIndex;
      const duration = playList[playIndex].duration;
      (this.$refs.audio as any).changeCurrentTime((val / 100) * duration);
    }
  }
});
</script>

<style lang="scss">
.footer {
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center;
  position: relative;
  .musicInfo {
    flex: 1 0 200px;
    display: flex;
    .musicImg {
      height: 50px;
      width: 50px;
      font-size: 0;
      position: relative;
      &:hover {
        .musicCover {
          background-color: rgba($color: #000000, $alpha: 0.3);
          opacity: 1;
        }
      }
      img {
        padding: 5px;
        width: 50px;
        height: 50px;
      }
      .musicCover {
        background-color: rgba($color: #000000, $alpha: 0);
        width: 100%;
        height: 100%;
        transition: all 0.3s ease;
        position: absolute;
        opacity: 0;
        top: 0;
        left: 0;
        .iconfont {
          transition: all 0.3s ease;
          position: absolute;
          margin: 10px 0 0 15px;
          font-size: 20px;
          color: #ccc;
          transform: rotateX(0deg);
        }
        .rotate {
          transform: rotateX(180deg);
        }
      }
    }
  }
  .musicMeta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 8px;
    .name {
      font-size: 14px;
      color: #222;
    }
    .artists {
      font-size: 12px;
      color: #444;
    }
    .duration {
      font-size: 12px;
      color: #444;
    }
  }
  .musicPlay {
    height: 100%;
    flex: 0 0 140px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .i-previous,
    .i-next {
      cursor: pointer;
      font-size: 24px;
      color: red;
    }
    .playWrap {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 34px;
      height: 34px;
      background-color: red;
      border-radius: 50%;
      .icon-play {
        margin-left: 6px;
      }
    }
  }
  .musicControl {
    flex: 1 0 200px;
    padding-right: 10px;
    display: flex;
    justify-content: flex-end;
    font-size: 20px;
    color: #444;
    i {
      cursor: pointer;
      margin: 0 4px;
      padding: 0 4px;
      font-size: 18px;
    }
  }
  .listDrawer {
    top: 40px;
    bottom: 50px;
    z-index: 9000 !important;
  }
  .musicDetail {
    bottom: 50px;
  }
  .el-drawer {
    background-color: #f1eeed;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  }
  .durationWrap {
    z-index: 7000;
    position: absolute;
    top: -6px;
    width: 100%;
    &:hover {
      .el-slider__bar {
        margin-top: 0;
        height: 6px;
      }
      .el-slider__runway {
        background-color: rgba($color: #000000, $alpha: 0.15);
      }
    }
    .el-slider__button-wrapper {
      display: none;
    }
    .el-slider__bar {
      margin-top: 5px;
      height: 1px;
      transition: all 0.3s ease;
    }
    .el-slider__runway {
      height: 6px;
      margin: 0;
      transition: all 0.3s ease;
      background-color: rgba($color: #000000, $alpha: 0);
    }
  }
}
</style>

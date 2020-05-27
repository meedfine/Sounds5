<template>
  <div class="audio"></div>
</template>

<script lang="ts">
import Vue from "vue";
import nativeUtil from "@/utils/index";
export default Vue.extend({
  data() {
    return {
      audioContext: new AudioContext(),
      audioSource: "" as any,
      audioGain: "" as any,
      volPercent: 0,
      intervalId: "" as any,
      timeIntervalId: "" as any
    };
  },
  computed: {
    volume() {
      return (this as any).volPercent * 0.01 * 0.2;
    }
  },
  watch: {
    async "$store.state.playIndex"(val) {
      const playList = this.$store.state.playList;
      this.fadeOut();
      const data = await this.initAudio(playList[val].path);
      this.playAudio(data);
      this.fadeIn();
    },
    "$store.state.playStatus"(val) {
      if (val) {
        this.audioContext.resume();
        this.fadeIn();
      } else {
        this.fadeOut(() => {
          this.audioContext.suspend();
        });
      }
    }
  },
  methods: {
    changeCurrentTime(offsetTime) {
      if (this.audioContext) {
        const audioContext = new AudioContext();
        const audioSource = audioContext.createBufferSource();
        const audioGain = audioContext.createGain();
        audioSource.buffer = this.audioSource.buffer;
        audioSource.connect(audioGain);
        audioGain.connect(audioContext.destination);
        this.volPercent = 0;
        this.fadeIn();
        this.playAudio({
          audioContext,
          audioSource,
          audioGain,
          offsetTime
        });
      }
    },
    async initAudio(path) {
      clearInterval(this.timeIntervalId);
      this.$store.commit("SET_CURRENTTIME", 0);
      const data = await nativeUtil.readAudioFile(path);
      const audioContext = new AudioContext();
      const audioSource = audioContext.createBufferSource();
      const audioGain = audioContext.createGain();
      return audioContext.decodeAudioData(data.buffer).then(value => {
        audioSource.buffer = value;
        audioSource.connect(audioGain);
        audioGain.connect(audioContext.destination);
        return {
          audioContext,
          audioSource,
          audioGain,
          offsetTime: 0
        };
      });
    },
    playAudio(data) {
      clearInterval(this.timeIntervalId);
      this.audioContext.close();
      this.audioContext = data.audioContext;
      this.audioSource = data.audioSource;
      this.audioGain = data.audioGain;
      this.audioGain.gain.setValueAtTime(this.volume, 0);
      this.audioSource.start(0, data.offsetTime + this.audioContext.currentTime);
      this.$store.commit("SET_CURRENTTIME", data.offsetTime + this.audioContext.currentTime);
      this.timeIntervalId = setInterval(() => {
        if (!this.$store.state.playStatus) {
          // clearInterval(this.timeIntervalId);
          return;
        }
        // musicmeta读出来的duration 比转成audioSoure格式的duration大，稍作兼容
        if (data.offsetTime + this.audioContext.currentTime > this.audioSource.buffer.duration + 0.1) {
          clearInterval(this.timeIntervalId);
          this.goNextMusic();
          return;
        }
        this.$store.commit("SET_CURRENTTIME", data.offsetTime + this.audioContext.currentTime);
      }, 1000);
    },
    fadeIn(fn?: Function) {
      if (!this.audioGain || !this.audioContext) {
        fn && fn();
        return;
      }
      this.fadeInterval("in", fn);
    },
    fadeOut(fn?: Function) {
      if (!this.audioGain || !this.audioContext) {
        fn && fn();
        return;
      }
      this.fadeInterval("out", fn);
    },
    fadeInterval(type, fn?) {
      // 重复20次
      clearInterval(this.intervalId);
      this.audioGain.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
      this.intervalId = setInterval(() => {
        type == "in" ? (this.volPercent += 5) : (this.volPercent -= 5);
        this.audioGain.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
        if (this.volPercent >= 100 || this.volPercent <= 0) {
          clearInterval(this.intervalId);
          fn && fn();
        }
      }, 25);
    },
    goNextMusic() {
      const nextIndex = nativeUtil.getNextIndex(this.$store.state.mode, this.$store.state.playList.length, this.$store.state.playIndex);
      this.$store.commit("SET_PLAYINDEX", nextIndex);
      this.$store.commit("SET_PLAYSTATUS", true);
    }
  }
});
</script>

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
      intervalId: "" as any
    };
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
    async initAudio(path) {
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
          audioGain
        };
      });
    },
    playAudio(data) {
      this.audioContext.close();
      this.audioContext = data.audioContext;
      this.audioSource = data.audioSource;
      this.audioGain = data.audioGain;
      this.audioSource.start(0);
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
      this.intervalId = setInterval(() => {
        type == "in" ? (this.volPercent += 5) : (this.volPercent -= 5);
        console.log(this.volPercent);
        this.audioGain.gain.setValueAtTime(this.volPercent / 100, this.audioContext.currentTime);
        if (this.volPercent >= 100 || this.volPercent <= 0) {
          clearInterval(this.intervalId);
          fn && fn();
        }
      }, 100);
    }
  }
});
</script>

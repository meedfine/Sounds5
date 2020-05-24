import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playList: [],
    playIndex: 0,
    playStatus: false,
    volume: 0.3
  },
  mutations: {
    SET_PLAYLIST(state, value) {
      state.playList = value;
    },
    SET_PLAYINDEX(state, value) {
      state.playIndex = value;
    },
    SET_PLAYSTATUS(state, value) {
      state.playStatus = value;
    },
    SET_VOLUME(state, value) {
      state.volume = value;
    }
  },
  actions: {},
  modules: {}
});

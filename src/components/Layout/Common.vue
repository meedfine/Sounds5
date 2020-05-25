<template>
  <div class="commonLayout">
    <div class="commonMain">
      <Aside class="commonAside"></Aside>
      <div class="commonContentWrap">
        <Header class="commonHeader drag"></Header>
        <keep-alive>
          <router-view class="commonContent" />
        </keep-alive>
      </div>
    </div>
    <Footer class="commonFooter"></Footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Aside from "../Aside.vue";
import Header from "../Header.vue";
import Footer from "../Footer.vue";
export default Vue.extend({
  components: {
    Aside,
    Header,
    Footer
  }
});
</script>

<style lang="scss">
.commonLayout {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.commonMain {
  flex: 1 0 100px;
  display: flex;
  overflow: hidden;
}
.commonFooter {
  flex: 0 0 auto;
  background-color: #f3eded;
}
.commonAside {
  flex: 0 0 auto;
  background-image: linear-gradient(to bottom right, #cee9ef, #f3eded);
}
.commonContentWrap {
  overflow-x: hidden;
  flex: 1 0 100px;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to bottom, #f1eeed, #f6f6f6);
}
.commonHeader {
  flex: 0 0 auto;
}
.commonContent {
  flex: 1 0 100px;
  overflow: hidden;
}
</style>

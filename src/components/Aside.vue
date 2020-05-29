<template>
  <div class="aside">
    <ul v-for="(item, index) in list" :key="index" class="list">
      <div class="title">{{ item.name }}</div>
      <li v-for="(subItem, subIndex) in item.list" :key="subIndex" class="subList" :class="{ isPath: subItem.path }" @click="goPath(subItem.path)">
        {{ subItem.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      list: [
        {
          name: "推荐",
          list: [
            {
              name: "发现音乐",
              path: "/findMusic"
            },
            {
              name: "私人FM",
              path: "/privateFM"
            }
          ]
        },
        {
          name: "我的音乐",
          list: [
            {
              name: "本地音乐",
              path: "/localMusic"
            },
            {
              name: "下载管理",
              path: "/download"
            },
            {
              name: "音乐云盘",
              path: "/musicCloud"
            }
          ]
        },
        {
          name: "我的歌单",
          list: [
            {
              name: "我喜欢的音乐",
              path: "/favoriteMusic"
            },
            {
              name: "ACG",
              path: "/list?id=12323"
            },
            {
              name: "测试专用",
              path: "/list?id=12323"
            },
            {
              name: "以前喜欢的",
              path: "/list?id=12323"
            }
          ]
        }
      ]
    };
  },
  methods: {
    goPath(path) {
      if (path) {
        this.$router.push(path);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.aside {
  width: 220px;
  padding: 10px 0;
  .title {
    margin-top: 10px;
    padding: 20px 24px 10px;
    font-size: 12px;
    color: #666;
  }
  .subList {
    font-size: 14px;
    padding: 8px 24px;
  }
  .isPath {
    cursor: pointer;
  }
}
</style>

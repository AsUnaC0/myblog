<template>
  <div class="info-box">
    <div v-if="contentData[contentIndex]">
      <div v-for="(item, index) in contentData[contentIndex].sections" :key="index">
        <!-- 大标题-->
        <h1 :id="item.bigtitle" v-if="item.bigtitle">{{ item.bigtitle }}</h1>

        <!-- 小标题-->
        <h3 :id="item.smalltitle" v-if="item.smalltitle">{{ item.smalltitle }}</h3>

        <!-- 内容-->
        <p v-if="item.content" v-html="item.content"></p>

        <!-- 图片 -->
        <template v-if="item.image">
          <img class="image" :src="item.image" alt="Image" />
        </template>

        <!-- 代码块 -->
        <template v-if="item.code">
          <highLight :code="item.code" />
        </template>



      </div>
    </div>
    <div v-else>
      <p>内容加载中...</p>
    </div>
  </div>
</template>

<script>
import contentData from "@/assets/data.js";
import highLight from '@/componets/highLight.vue'

export default {
  props: ["contentIndex"],
  data() {
    return {
      contentData: contentData // 导入的数据
    };
  },
  components: {
    highLight
  }
};
</script>

<style scoped>
.info-box {
  border-radius: 8px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  /* max-width: 907.9px; */
  width: 100%;
}

.info-box h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 15px;
}

.info-box h2 {
  font-size: 20px;
  color: #555;
  margin-top: 20px;
  margin-bottom: 10px;
}

.info-box p {
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
}

.info-box code {
  padding: 2px 5px;
  border-radius: 4px;
  font-family: Consolas, monospace;
  color: red;
}

.info-box .image {
  max-width: 770px;
  display: block;
  margin: 0 auto;

}

.info-box pre {
  background-color: #282c34;
  color: #abb2bf;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 14px;
  margin: 10px 0;
}

.info-box ul {
  padding-left: 20px;
  margin: 10px 0;
}

.info-box li {
  margin-bottom: 8px;
}

.info-box li pre {
  margin-top: 5px;
}
</style>
<template>
  <div class="container">

    <el-tree class="toc-container" :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>

    <div class="content">
      <h3>{{ title }}</h3>
      <div class="content-item">
        <content-item :contentIndex="value"></content-item>
      </div>
    </div>
  </div>
</template>

<script>
import contentItem from '@/componets/blogContent.vue';
import { tocData } from '@/assets/tocData.js';

export default {
  components: {
    contentItem
  },
  data() {
    return {
      // 目录结构数据
      data: tocData,
      value: 0,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      title: '我的项目介绍',
    };
  },
  methods: {
    handleNodeClick(data) {
      // 更新标题
      this.title = data.mainLabel || data.label;

      // 如果有anchor，滚动到对应位置
      if (data.anchor) {
        this.$nextTick(() => {
          const element = document.getElementById(data.anchor);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      }

      // 如果有index，更新value
      if (data.index !== undefined) {
        this.value = data.index;
      }

      // 如果是顶级节点，重置到默认内容
      if (data.index === 0) { // 小兔鲜的index是0
        this.value = 0;
        // 这里可以添加其他重置逻辑
      }
    }
  },
};
</script>

<style scoped lang="less">
@keyframes move {
  0% {
    height: 0;
  }

  100% {
    height: 100%;
  }

}

.container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  padding: 50px;
  height: 100%;
  box-sizing: border-box;

  .toc-container {
    // animation: move 0.5s ease-in-out;
    flex: 0 0 250px;
    width: 300px;
    min-width: 300px;
    padding: 10px;
    z-index: 1;
    border: 1px solid black;
    border-radius: 20px;
    height: 100%;
    font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
    line-height: 1.6;
    background-color: white;
    overflow: hidden;
    overflow-y: auto;


    .el-tree {
      width: 100%;
      min-width: 100%;
    }

    ol {
      list-style-type: decimal;
      overflow-y: auto;
      flex-grow: 1;

      &:hover {
        cursor: pointer;
      }

      li {
        margin-bottom: 8px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    ul {
      list-style-type: disc;
      padding-left: 30px;
      margin: 5px 0;
    }

    .has-children {
      cursor: pointer;
      position: relative;
      padding-right: 20px;
    }
  }

  .content {
    // animation: move 0.5s ease-in-out;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    z-index: 1;
    border-radius: 10px;
    border: 1px solid black;
    height: 100%;
    box-sizing: border-box;
    background-color: white;
    display: flex;
    flex-direction: column;

    h3 {
      margin: 0;
      text-align: center;
      border-bottom: 1px solid #000;
    }

    .content-item {
      margin: 0 5px;
      overflow: hidden;
      overflow-y: auto;
    }
  }
}
</style>
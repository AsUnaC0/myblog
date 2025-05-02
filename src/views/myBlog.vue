<template>
  <div class="container"> 

    <el-tree class="toc-container" :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>

    <div class="content">
      <h3>{{title}}</h3>
      <div class="content-item">
        <content-item :contentIndex="value"></content-item>
      </div>
    </div>
  </div>
</template>

<script>
import contentItem from '@/componets/blogContent.vue';

export default {
  components: {
    contentItem
  },
  data() {
    return {
        // 目录结构数据
        data: [
          {
            mainLabel:'Vue中仓库的使用',
            label: 'Vue中仓库的使用',
            index:0,
            children: [{
            mainLabel:'Vue中仓库的使用',
            label: 'Vuex',
            anchor: '一、Vuex',
              children: [{
              mainLabel:'Vue中仓库的使用',
              label: '在vue2中的使用',
              anchor: '1. Vue2 中使用 Vuex',
              }, {
              mainLabel:'Vue中仓库的使用',
              label: '在vue3中的使用',
              anchor: '2. Vue3 中使用 Vuex',
            }]
            },
            {
            mainLabel:'Vue中仓库的使用',
            label: 'pinia的使用',
            anchor: '二、Pinia 的使用',
          }]
          },
          {
            mainLabel: "Vue Router",
            label: "Vue Router",
            index: 1,
            children: [
              {
                mainLabel: "Vue Router",
                label: "Vue Router",
                anchor: "一、Vue Router",
                children: [
                  {
                    mainLabel: "Vue Router",
                    label: "基础路由配置",
                    anchor: "1. 基础路由配置",
                  },
                  {
                    mainLabel: "Vue Router",
                    label: "动态路由匹配",
                    anchor: "2. 动态路由匹配",
                  },
                  {
                    mainLabel: "Vue Router",
                    label: "导航守卫",
                    anchor: "3. 导航守卫",
                  },
                  {
                    mainLabel: "Vue Router",
                    label: "路由元信息",
                    anchor: "4. 路由元信息",
                  },
                  {
                    mainLabel: "Vue Router",
                    label: "路由过渡动效",
                    anchor: "5. 路由过渡动效",
                  }
                ]
              },
              {
                mainLabel: "Vue Router",
                label: '进阶路由技巧',
                anchor: "二、进阶路由技巧",
                children: [
                  {
                    mainLabel: "Vue Router",
                    label: "滚动行为",
                    anchor: "1. 滚动行为",
                  },
                  {
                    mainLabel: "Vue Router",
                    label: "路由懒加载",
                    anchor: "2. 路由懒加载",
                  }
                ]
              }
            ]
          }
        ],
        value:0,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        title:'Vue中仓库的使用'
      };
    },
  methods: {
    handleNodeClick(data)
      {
      this.title = data.mainLabel;
      if (data.anchor) {
        this.$nextTick(() => {
          document.getElementById(data.anchor).scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        })
      }
      if (data.index) {
        this.value = data.index
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
    animation: move 0.5s ease-in-out;
    padding: 10px;
    z-index: 1;
    border: 1px solid black;
    border-radius: 20px;
    height: 0;
    font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
    line-height: 1.6;
    min-width: 150px;
    height: 100%;
    flex: 1;
    background-color: white;
    display: flex; 
    flex-direction: column; 
    overflow: hidden; 

    ol {
      list-style-type: decimal;
      overflow-y:auto;
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
    animation: move 0.5s ease-in-out;
    z-index: 1;
    border-radius: 10px;
    flex: 3;
    border: 1px solid black;
    height: 100%;
    box-sizing: border-box;
    background-color: white;
    display: flex;
    flex-direction: column;
    h3{
    margin: 0;
    text-align: center;
    border-bottom: 1px solid #000;
    }
    .content-item {
    overflow: hidden;
    overflow-y: auto;
  }
}
}
</style>
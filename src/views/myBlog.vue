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

export default {
  components: {
    contentItem
  },
  data() {
    return {
      // 目录结构数据
      data: [
        {
          mainLabel: '小兔鲜商城-uniapp',
          label: '小兔鲜商城-uniapp',
          index: 0,
          children: [
            {
              mainLabel: '整体架构',
              label: '整体架构',
              anchor: '整体架构',
            },
            {
              mainLabel: '首页模块',
              label: '首页模块',
              anchor: '一、首页模块',
              children: [{
                mainLabel: '1. 自定义导航栏',
                label: '1. 自定义导航栏',
                anchor: '1. 自定义导航栏',
              },
              {
                mainLabel: '2. 轮播图组件',
                label: '2. 轮播图组件',
                anchor: '2. 轮播图组件',
              },
              {
                mainLabel: '3. 首页分类和热门推荐',
                label: '3. 首页分类和热门推荐',
                anchor: '3. 首页分类和热门推荐',
              },
              {
                mainLabel: '4. 猜你喜欢组件',
                label: '4. 猜你喜欢组件',
                anchor: '4. 猜你喜欢组件',
              },
              {
                mainLabel: '5. 下拉刷新',
                label: '5. 下拉刷新',
                anchor: '5. 下拉刷新',
              }
              ]
            },
            {
              mainLabel: '商品推荐模块',
              label: '商品推荐模块',
              anchor: '二、商品推荐模块',
              children: [{
                mainLabel: '1. 动态获取数据',
                label: '1. 动态获取数据',
                anchor: '1. 动态获取数据',
              },
              {
                mainLabel: '2. 多 Tabs 分页加载',
                label: '2. 多 Tabs 分页加载',
                anchor: '2. 多 Tabs 分页加载',
              },
              {
                mainLabel: '3. 滑动触底加载更多',
                label: '3. 滑动触底加载更多',
                anchor: '3. 滑动触底加载更多',
              }
              ]
            },
            {
              mainLabel: '分类模块',
              label: '分类模块',
              anchor: '三、分类模块',
            },
            {
              mainLabel: '详情模块',
              label: '详情模块',
              anchor: '四、详情模块',
              children: [{
                mainLabel: '1. 动态获取商品详情',
                label: '1. 动态获取商品详情',
                anchor: '1. 动态获取商品详情',
              },
              {
                mainLabel: '2. 轮播图交互',
                label: '2. 轮播图交互',
                anchor: '2. 轮播图交互',
              },
              {
                mainLabel: '3. 弹出层交互',
                label: '3. 弹出层交互',
                anchor: '3. 弹出层交互',
              }
              ]
            },
            {
              mainLabel: '登录模块',
              label: '登录模块',
              anchor: '五、登录模块',
            },
            {
              mainLabel: '用户模块',
              label: '用户模块',
              anchor: '六、用户模块',
              children: [{
                mainLabel: '1. 用户中心',
                label: '1. 用户中心',
                anchor: '1. 用户中心',
              },
              {
                mainLabel: '2. 分包页面',
                label: '2. 分包页面',
                anchor: '2. 分包页面',
              },
              {
                mainLabel: '3. 设置页面',
                label: '3. 设置页面',
                anchor: '3. 设置页面',
              },
              {
                mainLabel: '4. 个人信息页面',
                label: '4. 个人信息页面',
                anchor: '4. 个人信息页面',
              },
              ]
            },
            {
              mainLabel: '地址模块',
              label: '地址模块',
              anchor: '七、地址模块',
              children: [{
                mainLabel: '1. 地址管理页面',
                label: '1. 地址管理页面',
                anchor: '1. 地址管理页面',
              },
              {
                mainLabel: '2. 地址表单页面',
                label: '2. 地址表单页面',
                anchor: '2. 地址表单页面',
              }]
            },
            {
              mainLabel: 'SKU模块',
              label: 'SKU模块',
              anchor: '八、SKU模块',
              children: [{
                mainLabel: '1. 直接下载SKU插件使用',
                label: '1. 直接下载SKU插件使用',
                anchor: '1. 直接下载SKU插件使用',
              },
              {
                mainLabel: '2. SKU插件的使用',
                label: '2. SKU插件的使用',
                anchor: '2. SKU插件的使用',
              }]
            },
            {
              mainLabel: '购物车模块',
              label: '购物车模块',
              anchor: '九、购物车模块',
              children: [{
                mainLabel: '1. 购物车商品操作',
                label: '1. 购物车商品操作',
                anchor: '1. 购物车商品操作',
              },
              {
                mainLabel: '2. tabBar页面限制',
                label: '2. tabBar页面限制',
                anchor: '2. tabBar页面限制',
              }]
            },
            {
              mainLabel: '订单模块',
              label: '订单模块',
              anchor: '十、订单模块',
              children: [{
                mainLabel: '1. 订单判断',
                label: '1. 订单判断',
                anchor: '1. 订单判断',
              },
              {
                mainLabel: '2. 订单支付',
                label: '2. 订单支付',
                anchor: '2. 订单支付',
              }
                , {
                mainLabel: '3. 订单详情',
                label: '3. 订单详情',
                anchor: '3. 订单详情',
              },
              {
                mainLabel: '4. 订单列表页',
                label: '4. 订单列表页',
                anchor: '4. 订单列表页',
              },
              {
                mainLabel: '5. 订单页面的分包',
                label: '5. 订单页面的分包',
                anchor: '5. 订单页面的分包',
              }
              ]
            }
          ]
        },
        {
          mainLabel: '咸虾米壁纸-uniapp',
          label: '咸虾米壁纸-uniapp',
          index: 1,
        },
        {
          mainLabel: '智慧商城-vue2',
          label: '智慧商城-vue2',
          index: 2,
        },
        {
          mainLabel: '大事件管理-vue3',
          label: '大事件管理-vue3',
          index: 3,
        },
        {
          mainLabel: '校园美食分享平台WebAPI设计',
          label: '校园美食分享平台WebAPI设计',
          index: 4,
        }
      ],
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
    width: 250px;
    min-width: 250px;
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
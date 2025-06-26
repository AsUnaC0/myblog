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
              mainLabel: '整体结构',
              label: '整体结构',
              anchor: '整体结构',
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
      ],
      value: 0,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      title: '小兔鲜商城-uniapp',
    };
  },
  methods: {
    handleNodeClick(data) {
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
    // animation: move 0.5s ease-in-out;
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
    overflow-y: auto;

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
    z-index: 1;
    border-radius: 10px;
    flex: 3;
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
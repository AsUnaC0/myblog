export default [
  {
    sections: [
      {
        bigtitle: "一、Vuex",
        content: "Vuex 是 Vue.js 的官方全局状态管理库，用于集中管理多个组件共享的数据（如用户登录状态、全局配置等），确保状态变更可预测、可追踪。"
      },
      {
        content: "Vuex 的核心思想是单向数据流，适用于 Vue2 和 Vue3，但在组合式 API 和 TypeScript 支持上，Vue3 更优。"
      },
      {
        smalltitle: "1. Vue2 中使用 Vuex",
        content: "在 Vue2 中，Vuex 通过 `Vue.use()` 安装，并通过 `this.$store` 访问状态：",
        code: `// 安装 Vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: { count: 0 },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

// 组件中使用
export default {
  computed: {
    count() {
      return this.$store.state.count
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment')
    }
  }
}`
      },
      {
        smalltitle: "2. Vue3 中使用 Vuex",
        content: "在 Vue3 中，推荐使用 `createStore` 和 Composition API 的 `useStore`：",
        code: `// 创建 store
import { createStore } from 'vuex'

const store = createStore({
  state: { count: 0 },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

// 组件中使用
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const count = computed(() => store.state.count)
    const increment = () => store.commit('increment')
    return { count, increment }
  }
}`
      },
      {
        bigtitle: "二、Pinia 的使用",
        content: "Pinia 是 Vue3 官方推荐的新一代状态管理库，比 Vuex 更轻量且支持组合式 API。"
      },
      {
        smalltitle: "1. Pinia 基础用法",
        content: "Pinia 的核心概念是 `store`，定义和使用示例如下：",
        code: `// 定义 store (stores/counter.js)
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++
    }
  }
})

// 组件中使用
import { useCounterStore } from '@/stores/counter'

export default {
  setup() {
    const counter = useCounterStore()
    return { counter }
  }
}`
      },
      {
        content: "更多 Pinia 用法请参考官方文档：<a href='https://pinia.vuejs.org/' target='_blank'>Pinia 官网</a>"
      }
    ]
  },
   {
    sections: [
      {
        bigtitle: "一、Vue Router",
        content: "Vue Router 是 Vue.js 官方的路由管理器，用于构建单页面应用（SPA）。"
      },
      {
        smalltitle: "1. 基础路由配置",
        content: "安装并配置基本路由：",
        code: `// 安装
npm install vue-router

// router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue') // 懒加载
  }
]

const router = new VueRouter({
  mode: 'history', // 去掉URL中的#
  base: process.env.BASE_URL,
  routes
})

export default router`
      },
      {
        smalltitle: "2. 动态路由匹配",
        content: "通过冒号 : 标记动态路径参数：",
        code: `// 路由配置
{
  path: '/user/:id',
  name: 'User',
  component: User
}

// 组件中获取参数
this.$route.params.id

// 编程式导航
this.$router.push('/user/123')`
      },
      {
        smalltitle: "3. 导航守卫",
        content: "控制路由跳转的钩子函数：",
        code: `// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 验证登录状态
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

// 路由独享守卫
{
  path: '/admin',
  component: Admin,
  beforeEnter: (to, from, next) => {
    // ...
  }
}

// 组件内守卫
export default {
  beforeRouteEnter(to, from, next) {
    // 不能访问 this
    next(vm => {
      // 通过 vm 访问组件实例
    })
  },
  beforeRouteLeave(to, from, next) {
    // 确认离开？
    if (confirm('确定要离开吗？')) {
      next()
    }
  }
}`
      },
      {
        smalltitle: "4. 路由元信息",
        content: "通过 meta 字段添加路由元信息：",
        code: `{
  path: '/dashboard',
  component: Dashboard,
  meta: {
    requiresAuth: true,
    title: '控制面板'
  }
}

// 在导航守卫中使用
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '默认标题'
  next()
})`
      },
      {
        smalltitle: "5. 路由过渡动效",
        content: "为路由切换添加过渡效果：",
        code: `<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>`
      },
      {
        bigtitle: "二、进阶路由技巧",
        content: "更多高级路由功能"
      },
      {
        smalltitle: "1. 滚动行为",
        content: "自定义页面滚动位置：",
        code: `const router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    // 返回滚动位置
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  }
})`
      },
      {
        smalltitle: "2. 路由懒加载",
        content: "按需加载路由组件提升性能：",
        code: `// 使用动态 import
const User = () => import('./views/User.vue')

// 分组 (webpackChunkName)
const User = () => import(/* webpackChunkName: "user" */ './views/User.vue')`
      }
    ]
  }
]
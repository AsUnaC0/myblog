import vue from 'vue'
import vueRouter from 'vue-router'
import aboutMe from '@/views/aboutme.vue'
import myHome from '@/views/myhome.vue'
import myBlog  from '@/views/myBlog.vue'
vue.use(vueRouter)
const router = new vueRouter({
    routes: [
        {
            path: '/',
            component: myHome,
        },
        {
            path: '/myhome',
            component: myHome,
        },
        {
            path: '/myblog',
            component: myBlog,
        },
        {
            path: '/aboutme',
            component: aboutMe,
        },
      
    ]
})
export default router
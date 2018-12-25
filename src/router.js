import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'

Vue.use(Router)

let routes = [
    { // 大盘
        path: '/', name: 'dashboard', component (resolve) { require(['./page/Dashboard.vue'], resolve) }
    }
]

const router = new Router({
    routes: routes
})

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    store.commit({
        type: 'setCurrRouter',
        from: from.name,
        to: to.name,
        query: to.query,
        instance: router
    })
    next()
})

export default router

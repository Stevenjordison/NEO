import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = [
    { // 大盘
        path: '/dashboard', name: 'dashboard', meta: {ok: true}, component (resolve) { require(['./page/Dashboard.vue'], resolve) }
    }
]

const router = new Router({
    routes: routes
})

export default router

import Vue from 'vue'
import store from './store/index'
import App from './App'
import router from './router'
import axios from './script/_axios.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'    // 默认主题
import 'babel-polyfill'

Vue.prototype.$axios = axios

Vue.use(ElementUI, { size: 'small' })

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    store.commit({
        type: 'setCurrRouter',
        from: from.name,
        to: to.name,
        query: to.query,
        instance: router
    })
    const token = store.state.token
    const rolePermissions = store.state.rolePermissions
    if (!token && to.path !== '/login') {
        next('/login')
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        rolePermissions === 1 ? next() : next('/403')
    } else {
        next()
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')



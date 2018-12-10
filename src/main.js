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
    next()
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')



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

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')



import axios from 'axios'
import store from '../store/index'
import ElementUI from 'element-ui'

// --------------------------------------------------- axios config ---------------------------------------------------
// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (config.method.toLowerCase() === 'get'){
        config.params = config.params || {}
        config.params['_'] = (+new Date()) // 时间戳
    }
    // 将token放入请求头
    config.headers.token = store.state.token
    config.headers['Cache-control'] = 'no-cache'
    config.headers.Expires = -1
    config.headers.Pragma = 'no-cache'
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
    // Do something with response data
    if (response.data.statusCode === 401) {
        ElementUI.Message.error('登陆状态失效，请重新登陆')
        store.state.currRouter.instance.push({name: 'login'})
        return Promise.reject('error')
    }
    if (response.data.statusCode !== 200) {
        ElementUI.Message.error(response.data.message)
        return Promise.reject('error')
    }
    return response.data.data
}, function (error) {
    // Do something with response error
    return Promise.reject(error)
})

export default axios

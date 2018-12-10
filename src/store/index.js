import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../script/_axios.js'
import Api from '../script/api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currRouter: {
            from: '',
            to: '',
            query: null,
            instance: null
        },
        collapse: false,
        userName: localStorage.getItem('modo-pay-name') || '',
        token: localStorage.getItem('modo-pay-token') || '',
        rolePermissions: Number(localStorage.getItem('modo-pay-role')) || '',
        selectConfig: {},   // 下拉菜单

        dashboardDays: Number(localStorage.getItem('modo-pay-dashboardDays')) || 15, // 首页时间设置，默认查询15天的
        isChangePayConfig: false, // 支付配置是否改变

        partnerViewId: '' // 商户详情id，keep-alive时，判断打开的是否是新的一个标签页
    },
    mutations: {
        SET_COLLAPSE (state, payload) {
            state.collapse = payload
        },
        SET_SELECT_CONFIG (state, payload) {
            state.selectConfig = payload
        },
        SET_PARTNER_VIEW_ID (state, payload) {
            state.partnerViewId = payload
        },
        SET_USER_INFO (state, payload) {
            state.userName = payload.userName
            state.token = payload.token
            state.rolePermissions = payload.rolePermissions
            localStorage.setItem('modo-pay-name', payload.userName)
            localStorage.setItem('modo-pay-token', payload.token)
            localStorage.setItem('modo-pay-role', payload.rolePermissions)
        },
        SET_DASHBOARD_DAYS (state, payload = 15) {
            state.dashboardDays = payload
            localStorage.setItem('modo-pay-dashboardDays', String(payload))
        },
        CLEAR_USER_INFO (state) {
            state.userName = ''
            state.token = ''
            state.rolePermissions = ''
            localStorage.clear('modo-pay-name')
            localStorage.clear('modo-pay-token')
            localStorage.clear('modo-pay-role')
        },
        setCurrRouter (state, payload) {
            let currRouter = state.currRouter
            currRouter.from = payload.from
            currRouter.to = payload.to
            currRouter.query = payload.query
            currRouter.instance = payload.instance
        }
    },
    actions: {
        // 获取下拉列表
        getSelectConfig (context) {
            axios({ url: Api.CONFIG_CONSTANT_LIST }).then(res => {
                context.commit('SET_SELECT_CONFIG', res)
            })
        }
    }
})

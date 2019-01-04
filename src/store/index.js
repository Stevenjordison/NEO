import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../script/_axios.js'
import DATE from '../script/date'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        today: DATE.showToDay(),
        yesterday: DATE.showAgoDay(1).start,
        currRouter: {
            from: '',
            to: '',
            query: null,
            instance: null
        },

        // flowData
        indoor: 0,
        outdoor: 0,
        periodIn: [],
        period: [],
        newOld: [],
        remainTime: [],

        // portraitData: null,
        edu: [],
        kids: [],
        occupation: [],
        agebin: [],
        gender: [],
        segment: [], // 人群偏好
        cellFactory: [], // 手机品牌

        customer: {
            new: 0,
            old: 0,
            indoor: 0,
            outdoor: 0
        },
        customerLastDay: {
            new: 0,
            old: 0,
            indoor: 0,
            outdoor: 0
        },
        // 环比增长
        customerRose: {
            new: 0,
            old: 0,
            indoor: 0,
            outdoor: 0
        },

        mapData: []
    },
    mutations: {
        setCurrRouter (state, payload) {
            let currRouter = state.currRouter
            currRouter.from = payload.from
            currRouter.to = payload.to
            currRouter.query = payload.query
            currRouter.instance = payload.instance
        },
        SET_FLOW_DATA (state, payload) {
            state.indoor = payload.indoor
            state.outdoor = payload.outdoor
            state.periodIn = payload.periodIn
            state.period = payload.period
            state.newOld = payload.newold.data
            state.remainTime = payload.remainTime.data
        },
        SET_PORTRAIT_DATA (state, payload) {
            state.edu = payload.edu.datas
            state.kids = payload.kids.datas
            state.occupation = payload.occupation.datas
            state.gender = payload.gender.datas
            state.agebin = payload.agebin.datas
            state.segment = payload.segment.datas
            state.cellFactory = payload.cell_factory.datas
        },
        SET_CUSTOMER_DATA (state, payload) {
            state.customer = payload
        },
        SET_CUSTOMER_DATA_LAST_DAY (state, payload) {
            state.customerLastDay = payload
        },
        SET_MAP_DATA (state, payload) {
            state.mapData = payload
        },
        SET_CUSTOMER_ROSE (state, payload) {
            state.customerRose = payload
        }
    },
    actions: {
        async queryBigData (context) {
            const that = this
            axios({
                url: 'bigdata/portrait',
                params: {
                    startDate: that.state.yesterday,
                    endDate: that.state.yesterday
                }
            }).then(res => {
                context.commit('SET_PORTRAIT_DATA', res)
            })

            // 获取地图信息
            axios({
                url: 'bigdata/location',
                params: {
                    startDate: that.state.yesterday,
                    endDate: that.state.yesterday,
                    dataType: 0,
                    areaType: 1
                }
            }).then(res => {
                let data = res.loc
                let result = []
                data.forEach(item => {
                    result.push([Number(item.lng), Number(item.lat), 1])
                })
                context.commit('SET_MAP_DATA', result)
            })

            await axios({
                url: 'bigdata/flow',
                params: {
                    startDate: that.state.yesterday,
                    endDate: that.state.yesterday
                }
            }).then(res => {
                let customer = {
                    new: 0,
                    old: 0,
                    indoor: res.indoor,
                    outdoor: res.outdoor
                }
                res.newold.data.forEach(item => {
                    item.name === '新顾客' && (customer.new = item.value)
                    item.name === '老顾客' && (customer.old = item.value)
                })
                context.commit('SET_FLOW_DATA', res)
                context.commit('SET_CUSTOMER_DATA', customer)

            })

            // 获取昨日客户信息
            await axios({
                url: 'bigdata/flow',
                params: {
                    startDate: DATE.showAgoDay(2).start,
                    endDate: DATE.showAgoDay(2).start
                }
            }).then(res => {
                let customer = {
                    new: 0,
                    old: 0,
                    indoor: res.indoor,
                    outdoor: res.outdoor
                }
                res.newold.data.forEach(item => {
                    item.name === '新顾客' && (customer.new = item.value)
                    item.name === '老顾客' && (customer.old = item.value)
                })
                context.commit('SET_CUSTOMER_DATA_LAST_DAY', customer)
            })
            context.dispatch('handleCustomerRose')
        },
        handleCustomerRose (content) {
            const data1 = this.state.customer
            const data2 = this.state.customerLastDay
            const result = {
                new: 0,
                old: 0,
                indoor: 0,
                outdoor: 0
            }
            // (本次 - 上次) / 上次 * 100%
            for(let x in data2) {
                result[x] = Number(((data1[x] - data2[x]) / data2[x] * 100).toFixed(1))
            }
            content.commit('SET_CUSTOMER_ROSE', result)
        }
    }
})

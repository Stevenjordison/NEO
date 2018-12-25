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
    },
    mutations: {
        setCurrRouter (state, payload) {
            let currRouter = state.currRouter
            currRouter.from = payload.from
            currRouter.to = payload.to
            currRouter.query = payload.query
            currRouter.instance = payload.instance
        }
    },
    actions: {

    }
})

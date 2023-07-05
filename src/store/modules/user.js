import { login } from '@/api/user'
import { setToken, getToken, delToken } from '@/utils/storage';

export default {
    namespaced: true,
    state: {
        // 页面刚加载
        token: getToken() || ''
    },
    getters: {},
    mutations: {
        updateToken(state, payload) {
            // 存储到vuex
            state.token = payload;
            // 存储到本地
            setToken(payload)
        },
        logout(state) {
            // 修改state的token
            state.token = ''
            // 删除本地token
            delToken()

        }
    },
    actions: {
        async loginAction(context, payload) {
            // console.log('我要登录')
            const res = await login(payload)
            // console.log("登录成功"+ res.data.token)
            context.commit('updateToken', res.data.token)
        }
    },
    modules: {}

}
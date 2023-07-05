// 封装axios用于发送请求
import router from "@/router"
import store from "@/store"
import axios from "axios"
import { Message } from "element-ui"

// 创建一个新的axios实例
const request = axios.create({
    baseURL: 'http://interview-api-t.itheima.net/',
    timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做什么
    const token = store.state.user.token
    if( token ) {
        // 携带token
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
},function (error) {
    // 对请求错误做什么
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 在发送请求之前做什么
    // 数据脱壳
    return response.data
},function (error) {
    // 对请求错误做什么
    if( error.response ) {
        console.log(error.response.status)
        if( error.response.status === 401 ) {
            store.commit('user/logout')
            router.push('/login')
            // 友情提示用户
            Message.error('请您重新登录~')
        } else {
            Message.error(error.response.data.message)
        }
        
    }
    return Promise.reject(error)
})

export default request
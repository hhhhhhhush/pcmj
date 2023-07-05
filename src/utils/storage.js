// 以前token令牌,如果存到了本地,每一次都写这么长,太麻烦

const KEY = 'my-token-element-pc'
// 获取
export const getToken = () => {
    return localStorage.getItem(KEY)
}
// 设置
export const setToken = (newToken) => {
    return localStorage.setItem(KEY,newToken)
}
// 删除
export const delToken = () => {
    return localStorage.removeItem(KEY)
}
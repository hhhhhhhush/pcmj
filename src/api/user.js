import request from '@/utils/request.js'

export const login = data => request.post('auth/login',data)

export const getUser = () => request.get('/auth/currentUser')
// 导入解密
import jwt from 'jwt-decode'

import {Message} from 'element-ui'
import router from '@/router'

// 导入接口
import { login }  from '@/api/index'

// 处理Tonek
const state = {
    userinfo: {
        username: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username:'',
        token:  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token:''
        // username: '',
        // token:''

    }
}

const mutations = {
    setUser(state, payload) {
        // 注意修改用户信息，直接传递到是一个对象，而非对象里边的具体属性
        state.userinfo = payload
    },
    delUser(state) {
        state.userinfo = {
            // 从本地存储中拿数据
            username: '',
            token:''
        }
    }
}

const actions = {
    // context  new出来的仓库实例
    async toLogin({ commit }, payload) {
        // 处理网络去请求,异步处理
        // 登录的请求
        try {
        const res = await login(payload)
        if(res.status==200){
            // 解密用户名
            // console.log(jwt(res.data));
            // 存放数据
            let userinfo= {
                username: jwt(res.data),
                token: res.data
            }
            // 1.修改state数据
            commit('setUser',userinfo)
            // 2. 数据持久化 ，本地存储
            localStorage.setItem('user',JSON.stringify(userinfo))
            // 3. 用户界面提醒
            Message.success('登录成功')
            // 4. 登录
            router.push('/')

        }

    
        } catch (error) {
            console.log(error);
        }



        commit('setUser', payload)
    }
}

// 相当于计算属性
const getters = {
    Show(state){
        return '大家好，我是'+state.userinfo.username
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

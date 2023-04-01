import Vue from 'vue'
import VueI18n from 'vue-i18n'

// Element 组件中的国际化
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'

import en from './en'




//
Vue.use(VueI18n)

// 配置语言环境
const messages = {
    en:{
       ...en,
        ...enLocale
    },
    zh:{
        title:{
            message:'易购后台管理系统',
            welcome:'欢迎'
        },
        menu:{
            home:'首页',
            goods:'商品管理',
            goodslist:'商品列表',
            goodsadd:'商品添加',
            order:'订单管理',
            user:'用户管理',
            params:'参数管理'
        },
        content:{
            edit:"编辑"
        },
        ...zhLocale
    }

}


const i18n = new VueI18n({
    locale: 'en', // 设置地区
    messages, // 设置地区信息
  })

  ElementLocale.i18n((key, value) => i18n.t(key, value))

  export default i18n;
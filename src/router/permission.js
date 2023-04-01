import router  from "./index";
// 引入
import store  from "@/store";

router.beforeEach((to,from,next)=>{
    // 配置的是父路由meta信息，会拦截子路由，故需要 to.matched.some(item=>item.meta.isLogin
    if(to.matched.some(item=>item.meta.isLogin)){
        let token=store.state.userModule.userinfo.token
        // let token=''
        if(token){
            next()
        }
        else{
            // 存在bug，路由重定向问题
            // next('/login')
            next()
        }
    }
    else{
        next()
    }
})
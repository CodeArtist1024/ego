import axios from "axios";
import qs  from "query-string";
const instance = axios.create({
    baseURL:'',
    timeout:5000
})

// 请求拦截
instance.interceptors.request.use((config)=>{
    //统一 处理pose请求
    // console.log(config+'-------------------------');
    if(config.method=='post'){
        config.data=qs.stringify(config.data)
        // console.log(config.data);
    }




    // console.log(config);
    return config
},(err)=>{
    return Promise.reject(err)
})

// 响应拦截
instance.interceptors.response.use((res)=>{
    
    return res.data
},(err)=>{

    return Promise.reject(err)
})


export default instance 
// 后端服务器
const express = require('express')
const app = express()

const router = require('./router/index')


// 处理pose清酒,表单数据
app.use(express.urlencoded({extended:true}))

// 静态文件托管：例如img 存放的位置
app.use(express.static('upload'))

// 注意存放位置
app.use('/',router)



app.listen('7766',()=>{
    console.log('服务器启动ok');
    console.log('http://localhost:7766');
})
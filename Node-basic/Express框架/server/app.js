const express = require('express')



//【第一步】 创建应用对象
const app = express()


// 【第二步】 创建路由 (类似于原生 Node 创建一个 Get 活 Post 的 路由 api)
app.get('/', (req, res) => { // / 为根路由
	res.setHeader('Content-Type', 'text/html; charset=utf-8')
	res.end('收到你的 Get 请求了')
})


app.post('/login', (req, res) => {
	res.setHeader('Content-Type', 'text/html; charset=utf-8')
	res.end('收到你的 POST 请求了')
})

app.all('/test', (req, res) => { // 🌟 all 为随意请求方法, 不限定 GET 还是 POST
	res.end('收到你的请求了')
})

app.sll('*', (req, res) => {
	res.end('❌ 404 错误页面')
})

// 【第三步】 监听端口, 启动服务
app.listen(3030, () => {
	console.log('服务器启动在 3030 端口')
})
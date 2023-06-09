// 载入 http 内置模块
const http = require('http')


// 创建一个 http Api
const server = http.createServer((req, res) => { //req res 顺序不能颠倒！
	//  收集前端发来的数据
	let url = req.url
	res.write('你好') //返回数据
	res.end()
})

// 监听服务
server.listen(8090, 'localhost', () => { //端口号, 域, 回调
	console.log('localhost listening on port 8090')
})
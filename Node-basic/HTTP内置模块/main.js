// HTTP 协议
const http = require('http') // 载入 http 内置模块



// ⚡️ 创建一个 http ——————————————————————————————————————————————————————————————————————————————————
const server = http.createServer((req, res) => { //req res 顺序不能颠倒！ 接收请求，返回响应
	//  收集前端发来的数据
	res.setHeader('Content-Type', 'text/plain; charset=utf-8') //避免中文是乱码, 需要设置响应头, UTF-8 可以解析中文
	res.write('你好') //返回数据
	res.end()
})


// 监听服务
// 🔥 http 的默认端口为 80, https 的默认端口为 443
server.listen(8090, 'localhost', () => { //端口号, 域, 回调
	console.log('服务器成功启动: localhost listening on port 8090')
})

const http = require('http')
const url = require('url')


const server = http.createServer((req, res) => {



	// 判断请求路径
	let { pathname } = new URL(req.url, 'http://localhost:9090/api/login')
	
	if(req.method === 'GET' && pathname === '/api/login') { //登录页
		// 响应报文
		// 设置跨域访问
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
		res.setHeader('Content-Type', 'application/json; charset=utf-8')

		const data = {
			message: '登录界面'
		}

		res.end(JSON.stringify(data)) //🚀🚀发送响应体数据
	} 
	else if (req.method === 'GET' && pathname === '/api/register') { //注册页
		// 设置跨域访问
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
		res.setHeader('Content-Type', 'application/json; charset=utf-8')

		const data = {
			message: '注册界面'
		}

		res.end(JSON.stringify(data)) //🚀🚀发送响应体数据
	} else {
		// 如果不是正常的请求, 则返回 404
		// 设置跨域访问
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
		res.setHeader('Content-Type', 'application/json; charset=utf-8')
		res.statusCode = 404
		res.end('页面不存在')
	}
})


server.listen(9090, () => {
	console.log('服务运行在 9090 端口')
})
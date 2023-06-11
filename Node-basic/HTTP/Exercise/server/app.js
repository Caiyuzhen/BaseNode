const http = require('http')
const url = require('url')
const fs = require('fs')


// 设置跨域访问的函数抽象
function setCorsHeaders(res) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}



const server = http.createServer((req, res) => {
	// 判断请求路径
	let { pathname } = new URL(req.url, 'http://localhost:9090')
	
	if(req.method === 'GET' && pathname === '/api/login') { //登录页
		// 响应报文 (响应行, 响应头, 响应体)
		// 设置跨域访问
		// res.statusMessage = 'OK'
		setCorsHeaders(res) //🔥本质上是设置了三个 setHeader!!
		res.setHeader('Content-Type', 'application/json; charset=utf-8')

		const data = {
			message: '登录界面'
		}

		// 👇 write 跟 end 的数据会拼接在一起返回给前端, 一般用 write()
		res.write(JSON.stringify(data)) //🚀🚀发送响应体数据
		res.end() 
	} 

	else if (req.method === 'GET' && pathname === '/api/register') { //注册页
		// 设置跨域访问
		setCorsHeaders(res) //🔥本质上是设置了三个 setHeader!!
		const data = {
			message: '注册界面'
		}

		// 👇 write 跟 end 的数据会拼接在一起返回给前端, 一般用 write()
		res.write(JSON.stringify(data)) //🚀🚀发送响应体数据
		res.end()  //断开连接
	} 
	
	else if(req.method === 'GET' && pathname === '/api/table') { //响应一个 table
		// 设置跨域访问
		setCorsHeaders(res) //🔥本质上是设置了三个 setHeader!!
		res.setHeader('Content-Type', 'application/json; charset=utf-8')

		// 【🚀方法二】 读取 html 文件
		let html = fs.readFileSync(__dirname + '/Temp/table.html')

		res.write( html
			// 【🚀方法一】 返回一个 table 标签字符串
			// `<table border="1">
			// 	<tr>
			// 		<td>Name</td>
			// 		<td>Age</td>
			// 		<td>Gender</td>
			// 	</tr>
			// 	<tr>
			// 		<td>Zeno</td>
			// 		<td>22</td>
			// 		<td>Man</td>
			// 	</tr>
			// 	<tr>
			// 		<td>Lee</td>
			// 		<td>21</td>
			// 		<td>Women</td>
			// 	</tr>
			// 	<tr>
			// 		<td>Amy</td>
			// 		<td>23</td>
			// 		<td>Women</td>
			// 	</tr>
			// </table>`
		)
		res.end() //断开连接
	} 
	
	else {
		// 如果不是正常的请求, 则返回 404 页面
		// 设置跨域访问
		setCorsHeaders(res) //🔥本质上是设置了三个 setHeader!!
		res.setHeader('Content-Type', 'application/json; charset=utf-8')
		res.end('页面不存在') //断开连接
	}
})


server.listen(9090, () => {
	console.log('服务运行在 9090 端口')
})
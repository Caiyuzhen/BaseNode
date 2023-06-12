const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')


// 获取文件扩展名 （后缀）
// function getFileExtension(filePath) {
// 	const index = filePath.lastIndexOf('.');
// 	return index !== -1 ? filePath.slice(index) : '';
// }



// 设置跨域访问的函数抽象
function setCorsHeaders(res) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}



const server = http.createServer((req, res) => {

	// 先判断请求方法是否正确
	if(req.method === 'GET') {
		res.statusCode = 405
		res.setHeader('Content-Type', 'text/html; charset=utf-8')
		res.end(
			`<h1>❌ 请求方法错误</h1>`
		)
		return //🚀记得 return 一下！
	}


	let { pathname } = new URL(req.url, 'http://localhost:7070') //pathname 为请求路径
	let root = __dirname + '/Temp' // 静态资源根目录, 用一个变量去承接核心是为了能够动态的设置静态资源的目录（方便修改）
	// let filePath =  __dirname + '/Temp' + pathname  // 👈 拼接要读取的文件路径, __dirname + '/Temp' 相当于【静态资源的目录】
	let filePath =  root + pathname  // 👈 拼接要读取的文件路径, __dirname + '/Temp' 相当于【静态资源的目录】
	let ext = path.extname(filePath) // 获取文件的【后缀】



	/* 【🌟方法一】读取文件, 异步 API => 这种方法的访问路径就是文件本身
			http://localhost:7070/temp.css
			http://localhost:7070/temp.js
			http://localhost:7070/temp.html
			http://localhost:7070/staticImg.jpg
	*/
	fs.readFile(filePath, (err, fileData) => {

		setCorsHeaders(res) //🔥本质上是设置了三个 setHeader!!

		// 处理错误 (判断错误)
		if(err) {
			switch(err.code) {
				case 'ENOENT': //无文件
					res.statusCode = 404
					res.setHeader('Content-Type', 'text/html; charset=utf-8')
					res.end(
						`<h1>💔 404 暂无此文件</h1>`
					)
					break
				case 'ETIMEOUT': //操作延时
					res.statusCode = 408
					res.setHeader('Content-Type', 'text/html; charset=utf-8')
					res.end(
						`<h1>⏰ 408 操作超时</h1>`
					)
					break
			}
			return //🚀记得 return 一下！
		}

		switch (ext) { // 根据文件扩展名设置正确的 Content-Type (⚡️ 响应体的类型)
			case '.html':
				res.setHeader('Content-Type', 'text/html')
				break
			case '.js':
				res.setHeader('Content-Type', 'application/javascript')
				break
			case '.css':
				res.setHeader('Content-Type', 'text/css;')
				break
			case '.jpg':
			case '.jpeg':
				res.setHeader('Content-Type', 'image/jpeg') // 判断是否是图片
				break
			case '.png':
				res.setHeader('Content-Type', 'image/png')	// 判断是否是图片
				break
			case '.gif':
				res.setHeader('Content-Type', 'image/gif')
				break
			case '.mp4':
				res.setHeader('Content-Type', 'video/mp4')
			case '.json':
				res.setHeader('Content-Type', 'application/json')
			default:
				res.setHeader('Content-Type', 'application/octet-stream') //🔥未知类型
				break
		}

		// 成功响应文件
		res.end(fileData)
	})



	// // 【🌟方法二】获取 html 文件的 api
	// if(req.method === 'GET' && pathname === '/api/getHTML') {
	// 	setCorsHeaders(res) //🔥本质上是设置了三个 setHeader!!
	// 	res.setHeader('Content-Type', 'application/json; charset=utf-8')

	// 	let html = fs.readFileSync(__dirname + '/Temp/temp.html')
	// 	res.write(html)
	// 	res.end()
	// }

	// // 获取 js 文件的 api
	// if(req.method === 'GET' && pathname === '/api/getJs') { //pathname 为请求路径
	// 	setCorsHeaders(res) //🔥本质上是设置了三个 setHeader!!
	// 	res.setHeader('Content-Type', 'application/json; charset=utf-8')

	// 	let js = fs.readFileSync(__dirname + '/Temp/temp.js')
	// 	res.write(js)
	// 	res.end()
	// }

	// // 获取 css 文件的 api
	// if(req.method === 'GET' && pathname === '/api/getCss') { //pathname 为请求路径
	// 	setCorsHeaders(res) //🔥本质上是设置了三个 setHeader!!
	// 	res.setHeader('Content-Type', 'application/json; charset=utf-8')

	// 	let css = fs.readFileSync(__dirname + '/Temp/temp.css')
	// 	res.write(css)
	// 	res.end()
	// }

	// // 获取 Image 文件的 api
	// if(req.method === 'GET' && pathname === '/api/getImage') { //pathname 为请求路径
	// 	setCorsHeaders(res) //🔥本质上是设置了三个 setHeader!!

	// 	let img = fs.readFileSync(__dirname + '/Temp/staticImg.jpg')
	// 	res.write(img)
	// 	res.end()
	// }

	// else {
	// 	// 如果不是正常的请求, 则返回 404 页面
	// 	setCorsHeaders(res) //🔥设置跨域访问, 本质上是设置了三个 setHeader!!
	// 	res.setHeader('Content-Type', 'application/json; charset=utf-8')
	// 	res.end('页面不存在') //断开连接
	// }
}) 


server.listen(7070, () => {
	console.log('服务运行在 7070 端口')
})
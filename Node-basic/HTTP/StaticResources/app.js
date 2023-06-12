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
	let { pathname } = new URL(req.url, 'http://localhost:7070') //pathname 为请求路径
	let filePath =  __dirname + '/Temp' + pathname  // 👈 拼接要读取的文件路径

	// // 【🌟方法一】读取文件, 异步 API, http://localhost:7070/temp.js
	// fs.readFileSync(filePath, (err, fileData) => {
	// 	setCorsHeaders(res) //🔥本质上是设置了三个 setHeader!!
	// 	res.setHeader('Content-Type', 'application/json; charset=utf-8')
		
	// 	// 成功响应文件
	// 	res.end(fileData)

	// 	// 处理错误
	// 	if(err) {
	// 		res.statusCode = 500
	// 		console.log('文件读取失败')
	// 		return
	// 	}
	// })



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
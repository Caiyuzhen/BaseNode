const express = require('express')
const url = require('url')
const path = require('path')
const fs = require('fs')
const { singers }  = require('../JSON/singer.json')
const bodyParser = require('body-parser')
const searchRouter = require('./router/searchRouter.js')
const detailRouter = require('./router/detailRouter.js')


//【第一步】 创建应用对象 ——————————————————————————————————————————————————————————————————————————————————————————————————————
const app = express()



// 【第二步】 创建路由规则 (类似于原生 Node 创建一个 Get 活 Post 的 路由 api) ————————————————————————————————————————————————————————
// 🌟 携带参数的访问方式: http://localhost:3030/?aa=100&bb=200
// 【请求报文】由【请求行】、【请求头】和【请求体】组成
app.get('/', (req, res) => { // / 为根路由
	res.setHeader('Content-Type', 'text/html; charset=utf-8')

	/*👇原生操作*/
	console.log('一些参数:', req.method, req.url, req.headers)
	// 解析 url 并获取参数
	const parsedUrl = url.parse(req.url, true) // 解析URL并将第二个参数设置为true以解析查询字符串
	const queryParameters = parsedUrl.query // 获取解析后的查询参数对象
	console.log(queryParameters)
	const param1 = queryParameters.aa // 提取特定参数
	const param2 = queryParameters.bb // 提取特定参数
	console.log(param1, param2)

	
	/*👇Express 框架的操作*/
	console.log(req.path) //Express 框架默认引入路人 path 包
	console.log('参数:', req.query) //原生获取参数还需要解析 path.parse(str)
	console.log(req.ip) // 获取客户端的 ip
	console.log(req.get('host')) // 获取客户端 host (域名)

	res.end('😄收到你的 Get 请求了')
})




// ⚡️⚡️引入模块化路由
app.use(searchRouter)
app.use(detailRouter)



// 定义带参数的路由
app.get('/:id.html', (req, res) => { //👈 ：id 为动态参数, 通配符, 会统一存储在 params 对象上!!  场景 => 比如商品列表的不同 id
	res.setHeader('Content-Type', 'text/html; charset=utf-8')

	// 🌟 动态参数的获取方法: http://localhost:3030/3989462121.html
	console.log(req.params.id) //👈 上面写了 id 这里也是通过 id 来获取, 从 params 内获取
	res.end('😄收到你的 GET 请求了~')
})



app.get('/singer/:id.html', (req, res) => { //⚡️获取歌手信息的接口
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
	res.setHeader('Content-Type', 'text/html; charset=utf-8')

	// 🔥获取通配符的动态参数
	let { id } = req.params

	// 🚀在数组中寻找对应 id 的数据
	let singer = singers.find(item => {
		if(item.id === Number(id)) { // Number() 做强制类型转换
			console.log(id)
			return true //⚡️记得 return
		}
	})

	if(!singer) {
		res.statusCode = 404
		res.end('404 错误页面')
		return //⚡️记得 return
	}

	console.log(singer)
	res.end(JSON.stringify(singer))
})








app.all('/test', (req, res) => { // 🌟 all 为随意请求方法, 不限定 GET 还是 POST

	// 原生响应
	// res.statusCode = 200 // 响应状态码
	// res.statusMessage = 'OK' // 响应状态信息

	// Express 响应
	res.status(200).send('OK') //👈 可以链式调用, Express 不用设置 text/html; charset=utf-8', 因为内置了！
})



app.all('/others', (req, res) => { 
	// 跳转响应 (🚗重定向)
	res.redirect('http://www.google.com')
})



app.all('/download', (req, res) => { 
	// 响应下载文件
	res.download(__dirname + '../../JSON/singer.json') //传入一个文件的绝对路径
})



app.all('/file', (req, res) => { 
	// 响应文件
	res.setHeader('Content-Security-Policy', "default-src 'none'")
	const filePath = path.join(__dirname, '../Test/main.html') //文件路径, path 方法用来拼接路径
	res.sendFile(filePath)
	// res.sendFile(__dirname + '../../Test/main.html')
})







/*
	🧱 中间件
		1. 全局中间件 (比如记录每个请求的 url 与 ip 地址, 记录到一个文件内)
		2. 路由中间件
		3. 静态资源中间件（Node 内置）
*/ 
// 🔥 声明一个全局中间件函数(类似请求拦截器)
function recordMiddleware(req, res, next) {
	let { url, ip } = req
	fs.appendFileSync(path.resolve(__dirname, './access.log'), `访问地址:${url}  访问人:${ip}\r\n`) //将 url 跟 ip 记录到一个文件内, path.resolve() 方法生成的是绝对路径, \r\n 表示换行

	next() //🚀调用路由回调 !! 执行后续逻辑（底层是迭代器函数？）
}

app.use(recordMiddleware) //🔥使用 app . use 来调用函数, 实现【全局的拦截！】





// 🔥 声明一个路由中间件 (🚀比如后端校验用户身份、检验用户权限等)
let checkCodeMiddleware = (req, res, next) => {
	// URL 中间件场景, 比如 code 需要 = 502  =>  http://localhost:3030/setting?code=502
	if(req.query.code === '502') { //🔥🔥通过报文过来的【数字】都会变成【字符串】!!
		next() //🚀调用路由回调 !! 执行后续逻辑（底层是迭代器函数？）
	} else {
		res.send('⚠️ Code 输错了')
	}
}

app.get('/setting', checkCodeMiddleware, (req, res) => { //👈引入 checkCodeMiddleware 路由中间件函数！
	res.send('👍 Code正确, 进入 Setting 页')
})





// 🔥🔥🔥 声明一个静态资源中间件, 可以通过 localhost:3030/main.js 来访问 (🚀会自动去找 static 文件下的内容)
// 【局域网内】可以通过 ip:3030/main.js 来访问
// 静态资源中间件响应静态资源（比如 CSS、视频）, 路由响应动态资源（比如排行榜、推荐等）
app.use(express.static(path.join(__dirname + '../../static'))) //👈静态资源的文件夹路径






// 👇登录表单的服务, 获取 post 的【🎈请求体】数据
app.get('/login', (req, res) => {
	res.setHeader('Content-Type', 'text/html; charset=utf-8')
	res.sendFile(__dirname + '/form.html')
	// res.end()
})

// 👇 使用 bodyParser 中间件来【处理路由中的请求体】, 提取请求体中的数据
// const jsonParser = bodyParser.json() //请求体为 json 格式, 则使用此方法
const urlEncodeParser = bodyParser.urlencoded( { extended: false } ) //请求体为 query 格式, 则使用此方法

app.post('/login', urlEncodeParser, (req, res) => {
	res.setHeader('Content-Type', 'text/html; charset=utf-8')

	console.log(req.body) // { username: 'XXX', password: 'XXX' }
})






// 🧱 防盗链中间件（比如防止图片资源被其他域名所访问）
app.use((req, res, next) => {
	// 检测请求头中的数据是否为 localhost:3030, 获取 referer
	let referer = req.get('referer') // 🚀🚀获得请求头中的 referer , referer 会携带当前网页的【域名】【协议】跟【端口】到服务器内, 服务器可以根据这些信息来判断是不是自家的网页发送的请求
	console.log(referer)

	if(referer) {
		// 实例化 url
		let url = new URL(referer)

		// 获取 hostname
		let hostname =  url.hostname
		console.log(hostname)

		// 判断是不是自家的域名
		if(hostname !== '192.168.1') {
			res.status(404).send(`<h3>不是合法的 hostname! 404</h3>`)// 响应为 404
			return
		}
	}
	next()
})





app.all('*', (req, res) => {
	res.setHeader('Content-Type', 'text/html; charset=utf-8')
	res.end('❌ 404 错误页面')
})


// 【第三步】 监听端口, 启动服务 —————————————————————————————————————————————————————————————————————————————————————————
app.listen(3030, () => {
	console.log('服务器启动在 3030 端口')
})
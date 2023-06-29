const express = require('express')
const session = require('express-session') // Express 的库, 可以从获得请求内的 session
const MongoStore = require('connect-mongo') // mongodb 的库, 可以把 Session 存在 mongoDB 中


// 创建应用对象
const app = express()


// 【第 1 步】设置 session 中间件, 可以把 Session 存在 mongoDB 中
app.use(session({ // app.use 设置中间件
	name: 'sid', // 设置 cookie 的 name, 默认是 connect.sid
	secret: 'atguigu', // 服务器端生成 session 的签名 （参与加密的字符串） =>  加盐
	saveUninitialized: false, // 是否为每次请求都设置一个 cookie 来存储 session 的 id => 每次都会创建 session 对象
	resave: false, // 🚀在每次请求时重新保存 session => 相当于更新 session 过期时间, 如果长期无操作, session 过期, 就会比如退出登录
	store: MongoStore.create({
		mongoUrl: 'mongodb://localhost:27017/sessions_container' //数据库的连接配置(🚀或在数据库里边默认创建一个 Collection)
	}),
	cookie: {
		httpOnly: true, // 🚀 开启后前端无法通过 JS 操作这个绑定 session 的 cookie
		maxAge: 1000 * 60 * 60// sessionID 的过期时间(包含发送到浏览器的 cookie)
	},
}))



// 首页路由
app.get('/', (req, res) => {
	res.send('首页')
})




// 🌟 【第 2 步】登录页 => 在登录时创建 session 并保存到数据库中, 会生成一恶搞 session_container
app.get('/login', (req, res) => {
	// req.session.username = 'Zeno'
	// 在向 /login 请求时, 需要【传入两个参数】: username 和 password
	// 👉 http://localhost:3000/login?username=admin&password=123
	// 👉 注意, 会在浏览器保存一个 sid=s%XXXXXXXXXXXXXXXXXXXXXXXXXX
	if(req.query.username === 'admin' && req.query.password === '123') { //用户名 admin, 密码 123 
		// 🔥 设置 session 信息
		req.session.username = 'admin' // 👉 相当于把用户名存储到数据库中, 因为上面 app.use(session({...})) 已经做了拦截, 文档名称为 session  //👈 因为 npm i express-session connect-mongo 的中间件已经做了处理
		// req.session.uid = '258opfd' //例子
		res.send('登录成功!')
	} else {
		res.send('登录失败')
	}
})


// 🌟 【第 3 步】 读取 session 信息 => 模拟的是用户已经登录后, 访问购物车的场景 => 首先判断用户是否登录
// 👆 上边保存过 session 后, 可以直接访问 http://localhost:3000/cart
app.get('/cart', (req, res) => {
	// 👉 检测数据库的 session 文档中是否存在用户数据, 存在则表示用户已登录
	if(req.session.username) { //👈 因为 npm i express-session connect-mongo 的中间件已经从数据库中提取出了数据
		res.send('欢迎回来!')
	} else {
		res.send('请先登录')
	}
})



// session 的销毁
// 👆 销毁上边保存的 session  http://localhost:3000/logout
app.get('/logout', (req, res) => {
	req.session.destroy(() => {
		res.send('退出成功')
	})
})


app.listen(3000, () => {
	console.log('服务器启动成功')
})
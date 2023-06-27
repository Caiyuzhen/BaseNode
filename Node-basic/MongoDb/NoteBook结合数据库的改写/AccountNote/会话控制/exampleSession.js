const session = require('express-session')
const MongoStore = require('connect-mongo')


// 创建应用对象
const app = express()


// 设置 session 中间件
app.use(session({ // app.use 设置中间件
	name: 'sid', // 设置 cookie 的 name, 默认是 connect.sid
	secret: 'atguigu', // 服务器端生成 session 的签名 （参与加密的字符串） =>  加盐
	saveUninitialized: false, // 是否为每次请求都设置一个 cookie 来存储 session 的 id => 每次都会创建 session 对象
	resave: false, // 🚀在每次请求时重新保存 session => 相当于更新 session 过期时间, 如果长期无操作, session 过期, 就会比如退出登录
	store: MongoStore.create({
		mongoUrl: 'mongodb://localhost:27017/sessions_container' //数据库的连接配置
	}),
	cookie: {
		httpOnly: true, // 🚀 开启后前端无法通过 JS 操作这个绑定 session 的 cookie
		maxAge: 1000 * 300 // sessionID 的过期时间(包含发送到浏览器的 cookie)
	},
}))


// 创建 session
app.get('/login', (req, res) => {
	req.session.username = 'Zeno'
	res.send('登录成功!')
})
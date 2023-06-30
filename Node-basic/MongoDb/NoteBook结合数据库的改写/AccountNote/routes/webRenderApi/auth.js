var express = require('express')
var router = express.Router()
const UserAuthModel = require('../../models/UserModel.js')
const md5 = require('md5')// md5 加密数据包


/**
 * 1.构建 Express 路由
 * 2.构建 userAuthModels 模型来操作数据库, 做一个中间件来检测【网页端】看是否有用户登录的 session, 数据用 md5 加密
 * 3.用 npm i jsonwebtoken 来生成 token, 用来做【接口端】的限制, 不然所有人都可以访问接口
 	* 🌟下面的接口定义好后记得在 app.js 内进行导入 !!
 */

// 渲染注册页面 ————————————————————————————————————————————————————————————————————————————————————————————————
router.get('/reg', (req, res) => {
	// 响应 html 页面
	res.render('auth/reg') //前提是要在 app.js 文件中导入!  var indexRouter = require('./routes/webRenderApi/auth.js')
})


// 处理用户注册的请求
router.post('/reg', (req, res) => {
	// 这里还可以做后端的表单验证...
	//表单验证的代码...

	// 获取请求体数据
	console.log(req.body) // 通过 req.body 获取用户注册的数据

	// 🌟操作数据库, 把数据写入 MongoDB !!
	// UserAuthModel.create(req.body) //因为获取的数据就是个对象 {}, 所以不用 {} 了
	UserAuthModel.create({
		...req.body,  //先全部展开
		password: md5(req.body.password)  //也可以把 body 内的对象进行【全部展开】 + 【部分单独定制】
	}) 
	.then(data => {
		res.render('success', {msg: '注册成功', url: '/login'}) //传给 ejs 的数据
		// res.send('注册成功') //render 之后就不能再 send 了
	})
	.catch(err => {
		console.log(err)
		res.status(500).send('Server Error, 注册失败')
		return
	})
})



// 渲染登录页面 ————————————————————————————————————————————————————————————————————————————————————————————————
router.get('/login', (req, res) => {
	// 响应 html 页面
	res.render('auth/login') //前提是要在 app.js 文件中导入!  var indexRouter = require('./routes/webRenderApi/auth.js')
})


// 处理用户登录的请求
router.post('/login', (req, res) => {
	// 🌟查询数据库, 看数据库中是否有这个用户的数据
	//先获取用户名跟密码
	let { username, password }  = req.body

	// 然后查询数据库
	UserAuthModel.findOne({ username: username, password: md5(password)}) //🔥👈把用户登录输入的密码也做一次 md5 的加密🔐, 然后再去匹配数据库
	.then(data => {
		// 🚀判断 data 是否出错（没有这个账号或者账号出错）
		if(!data) {
			return res.send('账号或者密码出错')
		} else {
			// 登录成功的响应
			req.session.username = data.username // 👉 相当于把用户名存储到数据库中, 因为上面 app.use(session({...})) 已经做了拦截, 文档名称为 session  //👈 因为 npm i express-session connect-mongo 的中间件已经做了处理
			req.session._id = data._id //用户 mongoDB 文档的 id

			res.render('success', {msg: '登录成功', url: '/account'}) //传给 ejs 的数据
			// res.send('登录成功') //render 之后就不能再 send 了
		}
	})
	.catch(err => {
		console.log(err)
		res.status(500).send('Server Error, 登录失败, 请稍后再试')
		return
	})
})


// 处理退出的请求 ————————————————————————————————————————————————————————————————————————————————————————————————
router.post('/logout', (req, res) => {
	// 销毁 session
	req.session.destroy(() => {
		res.render('success', {msg: '退出成功', url: '/login'})
	})
})


module.exports = router
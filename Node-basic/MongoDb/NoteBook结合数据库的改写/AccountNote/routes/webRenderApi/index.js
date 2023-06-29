const express = require('express')
const router = express.Router()
const checkLoginMiddleware = require('../../middleware/checkLoginMiddleware.js')

// 👇使用 lowDB 读取文件
// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync') //lowDB 的示例, 用 lowDB 的方式读取文件

// const adapter = new FileSync(__dirname + '/../dbs/dbs.json') // 🔥记得更改 db 的位置！
// const db = low(adapter)

// const shortid = require('shortid')



// 👇使用 MongoDB 数据库
const AccountModel = require('../../models/AccountModel') 


// 🚀 声明检测用户是否登录的中间件 (可以抽象出来)
// let checkLoginMiddleware = (req, res, next) => {
// 	if(!req.session.username) { //看数据库里边有没有用户登录时保存的 session (有有效期)
// 		return res.redirect('/login') // 👉重定向到登录页面
// 	}

// 	// 🚀执行后续的路由回调
// 	next()
// }


// 渲染记帐本列表页面的数据 (🔥需要判断是否登录) ————————————————————————————————————————————————————————————————————————————————————————————————
// 访问 http://localhost:3000/account
router.get('/account', checkLoginMiddleware, function(req, res, next) { // 🚀checkLoginMiddleware 为检测用户是否登录的中间件

	// 🔥判断是否登录 (不封装中间件的话, 每个页面都得写一遍)
	// if(!req.session.username) { //看数据库里边有没有用户登录时保存的 session (有有效期)
	// 	return res.redirect('/login') // 👉重定向到登录页面
	// }

	// 从 MongoDB 内读取数据, 顺便按【时间倒序】
	AccountModel.find().sort({time: -1}).exec()
	.then(data => {
		// 进行后端渲染
		res.render('list.ejs', { accounts: data })
	})
	.catch(err => {
		console.log(err)
		res.status(500).send('Server Error, 读取文档失败')
		return
	})
})


// 渲染根目录的路由 ————————————————————————————————————————————————————————————————————————————————————————————————
router.get('/', (req, res) => {
	// 重定向到记账本页面
	res.redirect('/account')
})





// 渲染添加记录的页面 ————————————————————————————————————————————————————————————————————————————————————————————————
// 访问 http://localhost:3000/account/create
router.get('/account/create', checkLoginMiddleware, function(req, res, next) { // 🚀checkLoginMiddleware 为检测用户是否登录的中间件
	// res.send('添加记录')
	res.render('create.ejs') // 前提是要在 app.js 文件中导入! var indexRouter = require('./routes/webRenderApi/index')
})



// 🚀 新增记录后, 获取请求体内数据的路由 （处理表单提交的数据）！ 
router.post('/account', (req, res) => { //👈再在前端的表单内 post => /account 请求路由
	
	console.log(req.body) //因为外层 app.js 已经做了中间件, 所以这里可以直接获取到请求体内的数据

	// 🔥从前端获取回来的表单数据, 默认的日期对象是字符串, 需要转换为日期对象！！ 因为在 Models 层定义的数据库结构中, time 是 Date 类型!!
	// console.log('转化为日期对象:', dateObj)
	let dateObj = new Date(req.body.time) // 🔥把字符串的日期 time 转换为日期对象

	// 格式化时间为 2023-02-02 形式
	const year = dateObj.getFullYear()
	const month = String(dateObj.getMonth() + 1).padStart(2, '0') // padStart 表示在当前字符串的开头添加指定的字符
	const day = String(dateObj.getDate()).padStart(2, '0')
	let formattedDate = `${year}-${month}-${day}`  //👈然后再在前端(比如 ejs) 内 .toLocaleDateString() 把日期对象转换为 2023/6/21 之类的形式


	//🔥🔥把数据写入 MongoDB !!
	AccountModel.create({ //写入数据
		...req.body,
		time: formattedDate//修改 time 的属性 （把字符串转为日期对象）
	})
	.then(data => {
		// 成功的响应, 跳转渲染 list 页面
		res.render('success', {msg: '🎉 添加成功！', url: '/account'}) //🚀ejs 配置, 添加成功后的【文案】跟【跳转链接】, // 前提是要在 app.js 文件中导入! var indexRouter = require('./routes/webRenderApi/index')
		console.log('成功新增文档:', data)
	})
	.catch(err => {
		console.log(err)
		res.status(500).send('Server Error, 添加文档失败')
		return
	})

})




// 删除记录的方法 ————————————————————————————————————————————————————————————————————————————————————————————————
router.get('/account/:id', checkLoginMiddleware, (req, res) => { //🚀 '/account/:id' 表示 拿到 id 然后删除数据
	let id = req.params.id //获得 id 参数

	// 删除数据
	// db.get('account').remove({id: id}).write()
	AccountModel.deleteOne({_id: id})
	.then(data => {
		// 成功的响应, 跳转至渲染 list 页面
		res.render('success', {msg: '👍 删除成功！', url: '/account'}) //🚀ejs 配置, 添加成功后的【文案】跟【跳转链接】, // 前提是要在 app.js 文件中导入! var indexRouter = require('./routes/webRenderApi/index')
		console.log('成功删除文档:', data)
	})
	.catch(err => {
		console.log(err)
		res.status(500).send('Server Error, 删除文档失败')
		return
	})

})

  



module.exports = router

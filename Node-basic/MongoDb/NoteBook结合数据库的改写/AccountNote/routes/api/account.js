const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken') // Token 生成库
const checkTokenMiddleware = require('../../middleware/checkTokenMiddleware') // 校验 Token 的中间件

// 👇使用 lowDB 读取文件
// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync') //lowDB 的示例, 用 lowDB 的方式读取文件

// const adapter = new FileSync(__dirname + '/../dbs/dbs.json') // 🔥记得更改 db 的位置！
// const db = low(adapter)

// const shortid = require('shortid')



// 👇声明校验 Token 的中间件（增删改查的接口都需要校验 token, 用 token 来保护这些接口!!）
// const checkTokenMiddleware = (req, res, next) => {
// 	// 🚀 获取用户登录时创建的 token (在 auth.js 内生成) ——————————————————————————————————————————————————————————————————————————
// 	let token = req.get('token') //在 postman 中的 header 请求头内填入【键值对】 token + eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbWluMCIsIl9pZCI6IjY0OWQwYzA3YTllMTgyMWEzNjFlOTA3MCIsImlhdCI6MTY4ODEyMTg2NywiZXhwIjoxNjg4NzI2NjY3fQ.3VPBpaUnt3R4UUb0Q6C0clWU7Up3YW3rHxm2is_nSd4

// 	if(!token) { //如果没有 token
// 		return res.json({
// 			code: '2003',
// 			msg: 'token 缺失',
// 			data: null
// 		})
// 	}

// 	// 校验 token 是否正确
// 	jwt.verify(token, 'abc', (err, data) => {
// 		if(err) {
// 			return res.json({
// 				code: '2004',
// 				msg: 'token 校验失败',
// 				data: null
// 			})
// 		} 
// 	})

// 	//🚀 如果 token 校验成功, 则执行后续的路由回调
// 	next() // 在 Express 中，路由中间件可以使用 next()函数将控制权传递给下一个中间件函数或路由处理程序
// }


// 👇使用 MongoDB 数据库
const AccountModel = require('../../models/AccountModel') 


// 获取记账本所有数据的路由 API ——————————————————————————————————————————————————————————————————————————
// 访问 http://localhost:3000/api/account
router.get('/account', checkTokenMiddleware, function(req, res, next) {

	// // 🚀 获取用户登录时创建的 token (在 auth.js 内生成) ——————————————————————————————————————————————————————————————————————————
	// let token = req.get('token') //在 postman 中的 header 请求头内填入【键值对】 token + eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbWluMCIsIl9pZCI6IjY0OWQwYzA3YTllMTgyMWEzNjFlOTA3MCIsImlhdCI6MTY4ODEyMTg2NywiZXhwIjoxNjg4NzI2NjY3fQ.3VPBpaUnt3R4UUb0Q6C0clWU7Up3YW3rHxm2is_nSd4

	// if(!token) { //如果没有 token
	// 	return res.json({
	// 		code: '2003',
	// 		msg: 'token 缺失',
	// 		data: null
	// 	})
	// }

	// 校验 token 是否正确
	// jwt.verify(token, 'abc', (err, data) => {
	// 	if(err) {
	// 		return res.json({
	// 			code: '2004',
	// 			msg: 'token 校验失败',
	// 			data: null
	// 		})
	// 	} 
	// 	// ...
	// })
	console.log(req.user) //因为在 checkTokenMiddleware.js 中用 req.user = data 来保存了这个 token 正确的用户登录信息, 所以可以打印当前这个用户的信息, 后续可以去查找【🔥这个用户的账单】

	// 🚀 从 MongoDB 内读取数据, 顺便按【时间倒序】 ——————————————————————————————————————————————————————————————————————————
	AccountModel.find().sort({time: -1}).exec()
	.then(data => {
		// 成功的响应(不需要进行后端渲染时, 直接返回 json 数据即可)
		res.json({
			// 响应编号
			code: '0000', //一般是 20000 或 0000
			// 响应的信息
			msg: '读取成功',
			// 响应的数据
			data: data
		})
	})
	.catch(err => {
		console.log(err)
		// 失败的响应(不需要进行后端渲染时, 直接返回 json 数据即可)
		return res.json({
			// 响应编号
			code: '0001',
			msg: '读取失败',
			data: null,
		})
	})
})




// 获取单条记录的路由 API (Restful API 风格, 资源 + id) ——————————————————————————————————————————————————————————————————————————
router.get('/account/:id', checkTokenMiddleware, (req, res) => {
	// 🚀🚀从 params 中获取 id
	let id = req.params.id
	
	// 查询数据库
	AccountModel.findById(id).exec()
	.then(data => {
		res.json({
			code: '0000',
			msg: '读取成功',
			data: data
		})
	})
	.catch(err => {
		console.log(err)
		return res.json({
			code: '1004',
			msg: '读取失败',
			data: null
		})
	})
})




// 🚀 新增记录的 API（处理表单提交的数据）！——————————————————————————————————————————————————————————————————————————
//  http://localhost:3000/api/account
router.post('/account', checkTokenMiddleware, (req, res) => { //👈再在前端的表单内 post => /account 请求路由
	
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
		// res.render('success', {msg: '🎉 添加成功！', url: '/account'}) //👈 要渲染前端页面的做法, ejs 配置, 添加成功后的【文案】跟【跳转链接】 //
		res.json({ //👈只回传数据, 不渲染前端页面
			code: '0000',
			msg: '创建成功',
			data: data //👈把新增的数据传回去
		})
		console.log('成功新增文档:', data)
	})
	.catch(err => {
		console.log(err)
		// res.status(500).send('Server Error, 添加文档失败')
		return res.json({
			code: '1002',
			msg: '创建失败',
			data: null
		})
	})
})




// 更新单条记录的 API, (Restful API 风格, 资源 + id) ——————————————————————————————————————————————————————————————————————————
router.patch('/account/:id', checkTokenMiddleware, (req, res) => { //👈写法为  :/id
	// 获取 id
	let {id} = req.params //或者是 =>  let id = req.params.id

	// 🚀更新数据库
	AccountModel.updateOne(
		{_id: id}, // 条件
		req.body,// 具体更新的内容, 比如 {"account": 1000}
	)
	.then((updateResult) => {
		AccountModel.findById(id) //🚀再次查询数据库, 获取更新的这条数据
		.then(data => { //读取成功
			res.json({ //👈只回传数据, 不渲染前端页面
				code: '0000',
				msg: '更新成功',
				data: data //👈把新增的数据传回去
			})
		})
		.catch(err => { //读取失败
			return res.json({
				code: '1004',
				msg: '读取失败',
				data: null
			}) 
		})

	})
	.catch((err) => {
		console.log(err)
		return res.json({
			code: '1005',
			msg: '更新失败',
			data: null
		})
	})
})




// 删除记录的方法 ——————————————————————————————————————————————————————————————————————————
router.delete('/account/:id', checkTokenMiddleware, (req, res) => { //🚀 拿到 id 然后删除数据
	let id = req.params.id //获得 id 参数

	// 删除数据
	// db.get('account').remove({id: id}).write()
	AccountModel.deleteOne({_id: id})
	.then(data => {
		res.json({
			code: '0000',
			msg: '删除成功',
			data: {}
		})
	})
	.catch(err => {
		console.log(err)
		res.json({
			code: '1003',
			msg: '删除失败',
			data: null
		})
	})

})

  



module.exports = router;

var express = require('express')
var router = express.Router()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync') //lowDB 的示例, 用 lowDB 的方式读取文件

const adapter = new FileSync(__dirname + '/../dbs/dbs.json') // 🔥记得更改 db 的位置！
const db = low(adapter)

const shortid = require('shortid')
const AccountModel = require('../models/AccountModel') //MongoDB 数据库




// 渲染记帐本列表的页面
// 访问 http://localhost:3000/account
router.get('/account', function(req, res, next) {

	// 从 MongoDB 内读取数据, 顺便按【时间倒序】
	AccountModel.find().sort({time: -1}).exec()
	.then(data => {
		// 成功的响应
		res.render('list.ejs', { accounts: data })
	})
	.catch(err => {
		console.log(err)
		res.status(500).send('Server Error, 读取文档失败')
	})
})





// 渲染添加记录的页面
// 访问 http://localhost:3000/account/create
router.get('/account/create', function(req, res, next) {
	// res.send('添加记录')
	res.render('create.ejs')
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
		res.render('success', {msg: '🎉 添加成功！', url: '/account'}) //🚀ejs 配置, 添加成功后的【文案】跟【跳转链接】
		console.log('成功新增文档:', data)
	})
	.catch(err => {
		console.log(err)
		res.status(500).send('Server Error, 添加文档失败')
	})

})




// 删除记录的方法
router.get('/account/:id', (req, res) => { //🚀 拿到 id 然后删除数据
	let id = req.params.id //获得 id 参数

	// 删除数据
	db.get('account').remove({id: id}).write()

	// 提醒
	res.render('success', {msg: '🎉 删除成功！', url: '/account'}) //🚀ejs 配置, 添加成功后的【文案】跟【跳转链接】
	// res.send('删除成功！')
})

  



module.exports = router;

var express = require('express')
var router = express.Router()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync(__dirname + '/../db/db.json') // 🔥记得更改 db 的位置！
const db = low(adapter)

const shortid = require('shortid')




// 渲染记帐本列表
router.get('/account', function(req, res, next) {

	/* 账单数据, 从 lowdb 内获取数据 */
	let accounts = db.get('account').value() //🔥获取数据

	// res.send('记帐本列表')
	res.render('list.ejs', { accounts: accounts })
})





// 渲染添加记录页面
router.get('/account/create', function(req, res, next) {
	// res.send('添加记录')
	res.render('create.ejs')
})





// 新增记录后, 获取请求体内数据的路由
router.post('/account', (req, res) => {
	
	console.log(req.body) //因为外层 app.js 已经做了中间件, 所以这里可以直接获取到请求体内的数据

	let id = shortid()

	//🔥🔥把数据写入 lowDb    =>   shift() 就是优先展示最近的数据, push() 就是优先展示最旧的数据
	// db.get('account').push(req.body).write() //直接拿数据, 没有定义 id
	db.get('account').unshift({id: id, ...req.body}).write() //定义 id 


	res.render('success', {msg: '🎉 添加成功！', url: '/account'}) //🚀ejs 配置, 添加成功后的【文案】跟【跳转链接】
	// res.send('添加成功!')
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

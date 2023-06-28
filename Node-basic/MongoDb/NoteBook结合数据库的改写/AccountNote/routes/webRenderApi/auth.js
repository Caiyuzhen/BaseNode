var express = require('express')
var router = express.Router()
const UserAuthModel = require('../../models/UserModel.js')
const md5 = require('md5')// md5 加密数据包


/**
 * 1.构建 Express 路由
 * 2.构建 userAuthModels 模型来操作数据库
 */

// 注册页面
router.get('/reg', (req, res) => {
	// 响应 html 页面
	res.render('auth/reg') //前提是要在 app.js 文件中导入!  var indexRouter = require('./routes/webRenderApi/auth.js')
})


// 处理注册用户的请求
router.post('/reg', (req, res) => {
	// 这里还可以做后端的表单验证...
	//表单验证的代码...

	// 获取请求体数据
	console.log(req.body) // 通过 req.body 获取用户注册的数据

	// 操作数据库, 把数据写入 MongoDB !!
	// UserAuthModel.create(req.body) //因为获取的数据就是个对象 {}, 所以不用 {} 了
	UserAuthModel.create({
		...req.body,  //先全部展开
		password: md5(req.body.password)  //也可以把 body 内的对象进行【全部展开】 + 【部分单独定制】
	}) 
	.then(data => {
		res.render('success', {msg: '注册成功', url: '/login'}) //传给 ejs 的数据
		res.send('注册成功')
	})
	.catch(err => {
		console.log(err)
		res.status(500).send('Server Error, 注册失败')
		return
	})
})


module.exports = router
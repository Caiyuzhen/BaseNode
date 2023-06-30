var express = require('express')
var router = express.Router()
const UserAuthModel = require('../../models/UserModel.js')
const md5 = require('md5') // md5 加密数据包
const jwt = require('jsonwebtoken') // Token 生成库
const { secret } = require('../../config/config.js')

/**
 *🌟🌟登录注册的接口（需要用 token 来限定接口的访问权限, 保护接口!!!）
 		下面的接口定义好后记得在 app.js 内进行导入 !!
 */



// 处理用户登录的请求 API ————————————————————————————————————————————————————————————————————————————————————————————————
router.post('/login', (req, res) => {
	// 🌟查询数据库, 看数据库中是否有这个用户的数据
	//先获取用户名跟密码
	let { username, password }  = req.body

	// 然后查询数据库
	UserAuthModel.findOne({ username: username, password: md5(password)}) //🔥👈把用户登录输入的密码也做一次 md5 的加密🔐, 然后再去匹配数据库
	.then(data => {
		// 🚀判断 data 是否出错（没有这个账号或者账号出错）
		if(!data) {
			return res.status(500).json({ // 记得 return ！
				code: '2002',
				msg: '账号或者密码出错!',
				data: null
			})
		} else {
			console.log(data)
			// 🌟🌟🌟 👇响应登录成功的 Token
			let token = jwt.sign(  //👈👈👈创建 token, 然后再在 account.js 账单列表内进行 token 的校验
				{
					username: data.username, //要存储的用户数据（用 token 加密）
					_id: data._id
				},
				// 'abc',//加密字符串 （写死）
				secret, //加密字符串 （配置文件内的 secret 字符串）
				{expiresIn: 60 * 60 * 24 * 7}//配置对象（可以设置 token 的生命周期）单位是 "秒" , 60 * 60 * 24 * 7 表示一周
			) 

			res.json({
				code: '0000',
				msg: '登录成功',
				data: token
			})
		}
	})
	.catch(err => {
		console.log(err)
		res.json({
			code: '2001',
			msg: '数据库读取失败!',
			data: null
		})
		return
	})
})

// Post 请求 api 登录例子, 在 postman 内发送 JSON 格式的账号跟密码
// {
//     "username": "damin0",
//     "password": "000"
// }

// 获得
// {
//     "code": "0000",
//     "msg": "登录成功",
//     "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbWluMCIsIl9pZCI6IjY0OWQwYzA3YTllMTgyMWEzNjFlOTA3MCIsImlhdCI6MTY4ODEyMTAxMywiZXhwIjoxNjg4NzI1ODEzfQ.z2Z7kYUXKSJfaD9O_mTsY_svt3PP4t7eu0tZWQ-br7Y"
// }


// 处理退出登录请求 ————————————————————————————————————————————————————————————————————————————————————————————————
router.post('/logout', (req, res) => {
	// 销毁 session
	req.session.destroy(() => {
		res.render('success', {msg: '退出成功', url: '/login'})
	})
})


module.exports = router
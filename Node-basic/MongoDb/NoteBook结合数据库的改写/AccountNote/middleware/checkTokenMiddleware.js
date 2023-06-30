const jwt = require('jsonwebtoken') // Token 生成库
const { secret } = require('../config/config.js')

module.exports = (req, res, next) => {
	// 🚀 获取用户登录时创建的 token (在 auth.js 内生成) ——————————————————————————————————————————————————————————————————————————
	let token = req.get('token') //在 postman 中的 header 请求头内填入【键值对】 token + eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbWluMCIsIl9pZCI6IjY0OWQwYzA3YTllMTgyMWEzNjFlOTA3MCIsImlhdCI6MTY4ODEyMTg2NywiZXhwIjoxNjg4NzI2NjY3fQ.3VPBpaUnt3R4UUb0Q6C0clWU7Up3YW3rHxm2is_nSd4

	if(!token) { //如果没有 token
		return res.json({
			code: '2003',
			msg: 'token 缺失',
			data: null
		})
	}

	// 校验 token 是否正确
	// jwt.verify(token, 'abc', (err, data) => {
	jwt.verify(token, secret, (err, data) => {
		if(err) {
			return res.json({
				code: '2004',
				msg: 'token 校验失败',
				data: null
			})
		} 

		// 如果 token 正确, 则保存用户信息 (因为后续可能是多用户账号)
		req.user = data //可以得到用户 _id 、username 等信息	
	})

	//🚀 如果 token 校验成功, 则执行后续的路由回调
	next() // 在 Express 中，路由中间件可以使用 next()函数将控制权传递给下一个中间件函数或路由处理程序
}

// 🚀声明检测用户是否登录的中间件
module.exports = (req, res, next) => {
	if(!req.session.username) { //看数据库里边有没有用户登录时保存的 session (有有效期)
		return res.redirect('/login') // 👉重定向到登录页面
	}

	// 🚀执行后续的路由回调
	next()
}
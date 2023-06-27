const express = require('express')
const cookieParser = require('cookie-parser') //获取 cookie 的库



const app = express()
app.use(cookieParser()) //🚀使用获取 cookie 的中间件



// 新增 cookie （比如用户登录时、用户升级为 Vip 时可以用）
// http://localhost:3000/setCookie
app.get('/setCookie', (req, res) => {
	/*
		⚡️把 cookie 放在响应头里(会保存到当前用的的浏览器内! 在响应头里边可以看到 Set-Cookie: name=Zeno; Path=/	
			当这位用户再次访问时候就会携带这些 cookie)

		🚀当浏览器关闭后 cookie 会被销毁, 也可以设置过期时间
	*/
	res.cookie('name', 'Zeno', {maxAge: 60*1000*60})  //设置过期时间, 单位是毫秒  =>  60*1000 为一分钟   60*1000*60 为一小时
	res.send('Hey~')
})



// 删除 cookie (比如退出登录时可以使用)
// http://localhost:3000/removeCookie
app.get('/removeCookie', (req, res) => {
	res.clearCookie('name')
	res.send('Cookie 删除成功!') // Set-Cookie:	name=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT
})



// 获取 cookie 的方法（🔥使用 cookie-parser 库）
// http://localhost:3000/getCookie
app.get('/getCookie', (req, res) => {
	console.log(req.cookies) // { name: 'Zeno' }
	res.send(`欢迎 ${req.cookies.name}!`)
})



app.listen(3000, () => {
	console.log('Server is running at port 3000...')
})
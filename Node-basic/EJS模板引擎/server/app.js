const express = require('express')
const path = require('path')

const app = express()

// 🚀🚀在 Express 中使用 EJS 模板引擎
//【第 1 步】设置模板引擎
app.set('view engine', 'ejs')

//【第 2 步】设置模板文件的存放路径, 注意！🔥后缀需要写成 .ejs!!
app.set('views', path.resolve(__dirname, '../views')) //🍉🍉path.resolve(__dirname, 'views') 表示转为绝对路径, 避免出错


app.get('/home', (req, res) => {
	res.setHeader('Content-Type', 'text/html; charset=utf-8')


	// 【第 3 步】通过 render 方法渲染模板引擎页面
	let data = 'hello, 这是要传入 ejs 渲染 html 的数据'
	res.render('home', {data}) //‘模板的文件名’, ‘模板数据’


	res.end()
})


app.listen(6060, () => {
	console.log('服务器启动在 6060 端口')
})
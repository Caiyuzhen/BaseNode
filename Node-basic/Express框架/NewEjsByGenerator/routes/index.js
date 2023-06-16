var express = require('express')
var router = express.Router()
const formidable = require('formidable')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '😄 Express' });
})




// 🔥文件上传的 UI 地址
router.get('/portrait', function(req, res) {
	res.render('portrait')
})


// 🔥处理文件上传, 记得在前端表单中设置 🌟 enctype="multipart/form-data"🌟
router.post('/upload', function(req, res) {

	// 👀创建一个表单解析器
	const form = formidable({ 
		multiples: true, // 支持多文件上传
		uploadDir: __dirname + '/../public/imgs', // 🌟上传文件的存储路径【保存在 public 文件下的 imgs 文件内】
		keepExtensions: true, // 保留文件后缀
	})

	// 👋解析文件的请求报文
	form.parse(req, (err, fields, files) => {
		if (err) {
			next(err)
			return
		}
		// 👇文件信息
		console.log('一般字段:', fields) // 只存一般字段, 比如  text  radio  checkbox  select
		console.log('文件字段:', files) // 存储文件信息


		// ⛰️服务器保存文件的路径 
		let url = '/imgs/' + files.newFilename //🔥 拼接新的图片路径(将来要把这个路径数据保存在【📚数据库】中)  比如: http://192.168.X.X:3000/imgs/43c19accc581ebb0293533b00.jpg
		
		res.send(url)

		// res.json({ fields, files })
		res.send('🌞文件上传成功!')
	})
})




module.exports = router;
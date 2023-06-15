var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '😄 Express' });
})




// 🔥文件上传
router.get('/portrait', function(req, res) {
	res.render('portrait')
})


// 🔥处理文件上传, 记得在前端表单中设置 🌟 enctype="multipart/form-data"🌟
router.post('/portrait', function(req, res) {
	res.send('🌞上传成功!')
})





module.exports = router;

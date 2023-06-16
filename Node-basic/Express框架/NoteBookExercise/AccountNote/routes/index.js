var express = require('express')
var router = express.Router()

// 记帐本列表
router.get('/account', function(req, res, next) {
	// res.send('记帐本列表')
	res.render('list.ejs')
})



// 添加记录
router.get('/account/create', function(req, res, next) {
	// res.send('添加记录')
	res.render('create.ejs')
})

  



module.exports = router;

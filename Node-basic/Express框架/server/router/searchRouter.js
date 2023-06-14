const express = require('express')


// 模块化, 创建路由对象
const router = express.Router()


router.get('/search', (req, res) => {
	res.send('🔍 这是搜索页')
})


module.exports = router
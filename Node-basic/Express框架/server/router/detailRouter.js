const express = require('express')


// 模块化, 创建路由对象
const router = express.Router()


router.get('/detail', (req, res) => {
	res.send('👀 这是详情页')
})


module.exports = router
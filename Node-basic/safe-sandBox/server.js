// 载入内置 http 模块
const https = require('http')

// 发送请求获取数据 （Node JS 没有域的概念，所以可以访问跨域请求）
https.get('https://m.maoyan.com/ajax/moreClassicList?sortId=18&showType=381&limit=1080&offset=308&optimus_uuid=A5518FF0AFEC11EAAB158D7ABOD05BBBD74C9789D9F6498989826542C7DD4798&optimus_risk_level=718&optimus_code=10', (res) => {
	let str = ''
	res.on('data', (chunk) => {
		str += chunk
	})
	res.on('end', () => {
		console.log(res)
	})
})
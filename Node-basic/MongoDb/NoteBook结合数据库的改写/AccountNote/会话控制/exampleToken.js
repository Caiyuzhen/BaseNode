//导入 jwt
const jwt = require('jsonwebtoken')



// 生成 Token
let token = jwt.sign(
	{username: 'zeno'},//要存储的用户数据
	'abc',//加密字符串
	{expiresIn: 60 * 60}//配置对象（可以设置 token 的生命周期）单位是 "秒"
)

console.log(token)

// 👇测试 token 的有效期
let t = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inplbm8iLCJpYXQiOjE2ODgwOTcwMDIsImV4cCI6MTY4ODA5NzA2Mn0.Ba3DWYMIrxYHitr3bwpvFsUL2U9mdWc671Et9--NlJQ'


// 校验 Token
jwt.verify(t, 'abc', (err, data) => {
	if(err) {
		console.log('校验失败')
	} else {
		console.log(data) // { username: 'zeno', iat: 1688097002, exp: 1688097062 }  =>  iat 为创建时间, exp 为过期时间
	}
})
const db = require('./db/db.js') //导入自己封装的 db model
const MovieModel = require('./models/MovieModel.js') //导入自己封装的 MovieModel model


// 调用函数
db(
	() => {
		console.log('数据库连接成功...')

		MovieModel.create({title: '让子弹飞', director: '姜文'})
		.then(data => {
			console.log('成功新增文档:', data)
		})
		.catch(err => {
			console.log(err)
		})
	},
	// () => {
	// 	console.log('数据库连接失败...')
	// }
)
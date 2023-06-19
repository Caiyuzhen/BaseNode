const db = require('./db/db.js') //导入自己封装的 db model
const mongoose = require('mongoose')
const BookModel = require('./models/BookModel.js') //导入自己封装的 BookModel model


// 调用函数
db(
	() => { //success
		console.log('数据库连接成功...')


		// 创建一列文档 🌟
		const bookName = '交互设计精髓'
		BookModel.create({
			name: bookName,
			author: 'Amy',
			style: '简单',
			price: 29.9,
			isHot: true,
			tags: ['架构设计', '信息设计', '程序'],
			publicTime: new Date()
		})
		.then(data => {
			console.log('成功新增文档:', data)
		})
		.catch(err => {
			console.log(err)
		})


		// 判断如果已经有相同的数据了, 则删除重复的文档
		BookModel.find({ name: bookName })
		.then(docs => {
			if (docs.length > 1) {
				// 删除重复的文档
				const duplicateIds = docs.slice(1).map(doc => doc._id) // slice(1) 从数组中移除第一个元素，因为我们只保留第一个文档作为唯一的文档，而将其他重复文档进行删除
				return BookModel.deleteMany({ _id: { $in: duplicateIds } }) //🚀deleteMany 表示全部
			}
		})
		.then(deleteResult => {
			console.log('删除重复文档成功:', deleteResult)
		})
		.catch(err => {
			console.log('删除重复文档失败:', err)
			return
		})


		// 删除一条数据(用 id 来删除 或用 name 来删除) ❌
		// BookModel.deleteOne({ _id: "648f410b73f8940f46c5c271" })
		BookModel.deleteOne({ name: 'Python2 高级程序设计' })
		.then(() => {
			console.log('文档删除成功')
		})
		.catch((error) => {
			console.error('删除文档时出现错误:', error)
			return
		})


		// 批量删除多条数据 (比如批量删除不实热门的书)
		// BookModel.deleteMany({ isHot: false })
		// .then(() => {
		// 	console.log('文档删除成功')
		// })
		// .catch((error) => {
		// 	console.error('删除文档时出现错误:', error)
		// })


		// 更新文档
		BookModel.updateOne({name: 'Python 高级程序设计'}, {price: 9.9})//【条件, 比如 name = XXX】, 【要更新成的内容】
		.then((updateResult) => {
			console.log('成功更新:', updateResult)
		})
		.catch((err) => {
			console.log('❌更新失败', err)
			return
		})


		BookModel.updateMany({name: 'Python 高级程序设计'}, {price: 9.9}) //【条件, 比如 name = XXX】, 【要更新成的内容】
		.then((updateResult) => {
			console.log('成功更新:', updateResult)
		})
		.catch((err) => {
			console.log('❌更新失败', err)
			return
		})



		// 查找文档
		BookModel.find() //根据 name 来查找 (查找所有)
		// BookModel.find({ name: 'Python 高级程序设计' }) //根据 name 来查找 (批量查找)
		// BookModel.findOne({ name: 'Python 高级程序设计' }) //根据 name 来查找 (单独查找)
		// BookModel.findById({ id: 'xxxxxxxx' }) //也可以根据 id 来查找
		.then((findRes) => {
			// console.log('查找出:', findRes)
		})
		.catch((err) => {
			console.log('❌查找失败', err)
			return
		})


		// 条件查找 - 价格 < 20 的书
		BookModel.find({price: {$lt: 20}}) //lt 表示小于 20
		.then((findRes) => {
			// console.log('查找出价格小于 20 的书:', findRes)
		})
		.catch((err) => {
			console.log('❌查找失败', err)
			return
		})


		// 条件查找 - 作者为 Amy 或者 Kim 的书 (逻辑或)
		BookModel.find( { $or: [{author: 'Amy'}, {author: 'Kim'}] } )
		.then((findRes) => {
			// console.log('查找出作者为 Amy 或者 Kim 的书:', findRes)
		})
		.catch((err) => {
			console.log('❌查找失败', err)
			return
		})


		// 条件查找 - 价格在 5～30 之间的书 (逻辑与, 交集)
		BookModel.find( { $and: [{price: {$gt: 5} }, {price: {$lt: 30}}] } ) // $gt ~ $lt 表示     > 5  < 30
		.then((findRes) => {
			// console.log('查找价格在 5 ~ 30 之间的书:', findRes)
		})
		.catch((err) => {
			console.log('❌查找失败', err)
			return
		})


		// 条件查找 - 书名带 Python 的书 （正则表达式）
		BookModel.find( { name: /Python/ } ) //写法二: new RegExp('/Python/') 
		.then((findRes) => {
			// console.log('书名带 Python 的书:', findRes)
		})
		.catch((err) => {
			console.log('❌查找失败', err)
			return
		})

		
		// 字段筛选（比如只读取 name 跟价格）
		// BookModel.find().select({name: 1, author: 1}).exec() //🔥默认会有 id
		BookModel.find().select({name: 1, author: 1, _id: 0}).exec() //不需要 id 的写法
		.then((customData) => {
			// console.log('只读取某部分字段:', customData)
		})
		.catch((err) => {
			console.log('❌个性化字段失败', err)
			return
		})


		// 数据排序
		// BookModel.find().sort({price: 1}).exec() // 1 为正序, -1 为倒序
		BookModel.find().select({name: 1, price: 1, _id: 0}).sort({price: -1}).exec() // 🔥即自定义字段又进行排序
		.then((customData) => {
			// console.log('个性化字段 + 数据排序:', customData)
		})
		.catch((err) => {
			console.log('❌个性化字段失败', err)
			return
		})


		// 数据截断 (比如只读取前 3 贵的书, 或者是做数据分页【数据量大的情况】)
		BookModel.find()
		.select({name: 1, price: 1, _id: 0})
		.sort({price: -1})
		.limit(3)
		.exec() // 🔥即自定义字段又进行排序
		.then((customData) => {
			console.log('个性化字段 + 数据排序 + 截取前三名的数据:', customData)
		})
		.catch((err) => {
			console.log('❌个性化字段失败', err)
			return
		})

		
		// 数据截断（截取后 2 名, skip 排除掉前 3 ）
		BookModel.find()
		.select({name: 1, price: 1, _id: 0})
		.sort({price: -1})
		.skip(3)
		.limit(3)
		.exec() // 🔥即自定义字段又进行排序
		.then((customData) => {
			console.log('个性化字段 + 数据排序 + 截取后三名的数据:', customData)
		})
		.catch((err) => {
			console.log('❌个性化字段失败', err)
			return
		})
	}, 
	// () => { //error
	// 	console.log('数据库连接失败...')
	// }
)
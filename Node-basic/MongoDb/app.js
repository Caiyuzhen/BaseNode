/* 
	MongoDB 核心概念
		数据库 database
			是一个数据仓库, 可以创建很多【数据库】, 数据库内可以放很多【集合】

		集合 collection
			类似 JS 中的数组, 可以放很多【文档】

		文档 document
			数据库中的最小单元, 类似 JS 中的对象, 可以放很多【字段（或者叫属性）】


	⚡️ 相关命令
		【数据库命令】
			创建数据库
				use 数据库名
			创建集合 (🔥需要有集合才会显示数据库！）
				db.createCollection('Users')
			显示所有数据库
				show dbs
			切换到指定的数据库
				use XXX (如果没有就是新建）
			显示当前所在的数据库
				db
			删除当前的数据库
				use XXX
				db.dropDatabase()

		【集合命令】
			进入数据库
				use XXX
			查看数据库下的集合
				show collections
			新增集合
				db.createCollection('集合名')
			重命名某个集合的名称
				db.集合名.renameCollection('NewName')
			删除某个集合
				db.集合名.drop()

		【文档命令】
			新增文档数据
				db.集合名.insert(文档对象)
					比如 db.Users.insert({name: 'Zeno', age: 18})
			查找文档数据
				全部显示
					db.集合名.find()
						比如 db.Books.find()
				条件显示
					db.集合名.find({age: 20})
			修改某条文档数据
				👇 第一个 {} 为条件, 第二个 {} 为新的值
			整体替代
				db.集合名.update({name: 'Zeno'}, {age: 20})
			部分替代
				db.集合名.update({name: 'Zeno'}, {$set: {age: 20}})
			删除某条文档数据
				db.集合名.remove(查询条件）
					比如 db.Users.remove({name: 'Zeno'}}
 */


const mongoose = require('mongoose')


// 1. 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/Users') //⚡️ mongodb 为协议名称 , Users 为数据库名称（如果没有会自动创建）


// 2. 设置回调
mongoose.connection.once('open', () => { //设置连接成功的回调
	console.log('数据库连接成功...')

	// 3. 创建文档结构对象 (⚡️用来设置集合中文档的属性以及属性值的类型, 类似 TS 的类型定义)
	let BookSchema = new mongoose.Schema({
		name: { //可以进行配置, 比如配置为必填项
			type: String,
			required: true, // 属性必填
			unique: true // 🚀 属性值必须唯一（唯一索引, 🌟主键） (🔥🔥注意, 如果是旧的集合再设置的话就无效, 需要新建一个新的集合！)
		},
		author: {
			type: String,
			default: '默认作者' //配置默认值
		},
		style: {
			type: String,
			enum: ['简单', '中等', '困难'] //配置枚举, 只能是数组中的值
		},
		price: Number,
		isHot: Boolean,
		tags: Array,
		publicTime: Date,
		test: mongoose.Schema.Types.Mixed, //混合类型, 不受类型约束
		test2: mongoose.Schema.Types.ObjectId, //文档 ID, 一般用于做 【外键】, 比如做表的关联(👀联合查询), 把另外一篇文档的 ID 存储起来, 然后通过 ID 去查询另外一篇文档的内容
	})

	// 4. 创建模型对象 (⚡️对文档操作的封装对象, 可以完成对文档的【增删改查】)
	let BookModel = mongoose.model('books', BookSchema) // 集合名称 + 结构对象 👈注意, mongo 默认会使用复数来创建集合！！！会自动加 s！！



	// 5. 创建一列文档 🌟
	const bookName = 'Python 高级程序设计'
	BookModel.create({
		name: bookName,
		author: 'Kim',
		price: 39.1,
		isHot: true,
		tags: ['程序设计', '计算机', '技术'],
		publicTime: new Date()
	})
	.then(data => {
		console.log('成功新增文档:', data)
	})
	.catch(err => {
		console.log(err)
	})


	// 6. 判断如果已经有相同的数据了, 则删除重复的文档
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
	})


	// 7.删除一条数据(用 id 来删除) ❌
	BookModel.deleteOne({ _id: "648f410b73f8940f46c5c271" })
	.then(() => {
		console.log('文档删除成功')
	})
	.catch((error) => {
		console.error('删除文档时出现错误:', error)
	})


	// 批量删除多条数据 (比如批量删除不实热门的书)
	BookModel.deleteMany({ isHot: false })
	.then(() => {
		console.log('文档删除成功')
	})
	.catch((error) => {
		console.error('删除文档时出现错误:', error)
	})
})


mongoose.connection.on('error', () => { //设置连接失败的回调
	console.log('数据库连接失败...')
})


mongoose.connection.on('close', () => { //设置连接关闭的回调
	console.log('数据库连接已关闭...')
})


// setTimeout(() => {
// 	mongoose.disconnect() //关闭数据库连接
// }, 8)
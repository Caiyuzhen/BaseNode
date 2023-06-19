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
					比如 db.books.insert({name: 'Zeno', age: 18})
					db.Books.insert({name: 'JAVA 高级程序设计', author: 'Zen', price: 29.9, isHot: true, tags: '计算机'})
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

	✏️ 条件查询:
			运算符
				> 	  $gt
				< 	  $lt
				>= 	  $gte
				<= 	  $lte
				!= 	  $ne
				
			逻辑运算
				$or  	逻辑或
				$nor 	逻辑与

			正则匹配
				/Python/
				...
		
	🍬 个性化读取
			字段筛选（比如只读取 name 跟价格）
				BookModel.find().select({name:1, price:1, _id:0}).exec()

			数据排序
				BookModel.find().sort({price: 1}).exec() // 1 为升序, -1 为降序

			数据截取
				limit(3)
				skip(3)

 */


const mongoose = require('mongoose')

// 严格查询模式
mongoose.set('strictQuery', true)


// 1. 连接数据库服务
// mongoose.connect('mongodb://127.0.0.1:27017/Users') //⚡️ mongodb 为协议名称 , 【🚀🚀 Users 为数据库】名称（如果没有会自动创建）
mongoose.connect('mongodb://127.0.0.1:27017/Users') //⚡️ mongodb 为协议名称 , 【🚀🚀 Users 为数据库】名称（如果没有会自动创建）



// 2.设置连接成功的回调
mongoose.connection.once('open', () => { 
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
		return
	})


	// 7.删除一条数据(用 id 来删除 或用 name 来删除) ❌
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


	// 8.更新文档
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



	// 9.查找文档
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

})



//设置连接失败的回调
mongoose.connection.on('error', () => { 
	console.log('数据库连接失败...')
})



//设置连接关闭的回调
mongoose.connection.on('close', () => { 
	console.log('数据库连接已关闭...')
})




// setTimeout(() => {
// 	mongoose.disconnect() //关闭数据库连接
// }, 8)
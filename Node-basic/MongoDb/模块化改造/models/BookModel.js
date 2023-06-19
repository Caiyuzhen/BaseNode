const mongoose = require('mongoose')


// 创建文档结构对象 (⚡️用来设置集合中文档的属性以及属性值的类型, 类似 TS 的类型定义)
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

// 创建模型对象 (⚡️对文档操作的封装对象, 可以完成对文档的【增删改查】)
let BookModel = mongoose.model('books', BookSchema) // 集合名称 + 结构对象 👈注意, mongo 默认会使用复数来创建集合！！！会自动加 s！！


// 🚀暴露模型对象
module.exports = BookModel
const mongoose = require('mongoose')


// 🚀创建 Account 的文档结构对象 
let AccountSchema = new mongoose.Schema({
	title: { //可以进行配置, 比如配置为必填项
		type: String,
		required: true, // 属性必填
	},
	time: Date,
	type: {
		type: Number,
		default: -1 //⚡️默认为指出
	},
	account: {
		type: Number,
		require: true,
	},
	remarks: {
		type: String,	
	}
})

// 创建模型对象 (⚡️对文档操作的封装对象, 可以完成对文档的【增删改查】)
let AccountModel = mongoose.model('books', AccountSchema) // 集合名称 + 结构对象 👈注意, mongo 默认会使用复数来创建集合！！！会自动加 s！！


// 🚀暴露模型对象
module.exports = AccountModel
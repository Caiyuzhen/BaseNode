const mongoose = require('mongoose')


// 🚀创建 UserAuth 的文档结构对象 
let UserAuthSchema = new mongoose.Schema({
	username: String,
	password: String
})


// 创建模型对象 (⚡️对文档操作的封装对象, 可以完成对文档的【增删改查】)
let UserAuthModel = mongoose.model('userAuth', UserAuthSchema) // 集合名称 + 结构对象 👈注意, mongo 默认会使用复数来创建集合！！！会自动加 s！！


// 🚀暴露模型对象
module.exports = UserAuthModel
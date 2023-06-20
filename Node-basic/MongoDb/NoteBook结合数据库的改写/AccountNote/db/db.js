/**
 * @param {*} success 数据库成功的回调, {*} 表示参数的类型可以是任意类型
 * @param {*} error 数据库失败的回调, {*} 表示参数的类型可以是任意类型
 */


module.exports = function(success, error) {

	// 让外部不需要调用 error
	if(typeof error !== 'function') {
		error = () => {
			console.log('❌ 数据库连接失败...')
		}
	}


	// 导入 mongoose 包
	const mongoose = require('mongoose')

	mongoose.set('strictQuery', true)


	// 🚀🚀🚀导入自己做的配置文件, 更方便后续维护！！！！！
	const config = require('../config/config.js')
	const { DBHOST, DBPORT, DBNAME } = config

	// 🔥连接数据库服务
	mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`) //⚡️ mongodb 为协议名称 , 【🚀🚀 Users 为数据库】名称（如果没有会自动创建）
	// mongoose.connect('mongodb://127.0.0.1:27017/Users') //⚡️ mongodb 为协议名称 , 【🚀🚀 Users 为数据库】名称（如果没有会自动创建）


	//设置连接成功的回调
	mongoose.connection.once('open', () => { 
		success()
	})


	//设置连接失败的回调
	mongoose.connection.on('error', () => { 
		error()
	})


	//设置连接关闭的回调
	mongoose.connection.on('close', () => { 
		console.log('数据库连接已关闭...')
	})

}
const _ = require('lodash')



function myModule(arr) {
	let newArr = _.chunk(arr, 2) //把数组分为 2 个一段
	return newArr
	console.log(newArr)
}


//导出为模块【包】
module.exports = myModule
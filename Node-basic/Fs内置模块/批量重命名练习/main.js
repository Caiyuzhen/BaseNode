// 批量重命名, 在数字前面统一加上 0
const fs = require('fs')



// 读取 folder 文件列表
const files = fs.readdirSync('./folder')
// console.log(files)


// 遍历文件列表
files.forEach(oldName => {
	// 先把列表内的数据拆分出来
	let fileData = oldName.split('.')
	console.log(fileData)

	let [num, name]  = fileData //解构赋值, 拆分【文件名前缀】
	// 给文件名前缀补 0
	if(Number(num) <= 10) { //🔥🔥 Number(num) 强制把字符串转换为数字
		num = '0' + num
	}

	// 存放新名字
	let newFileName = `${num}.${name}`
	console.log('新名字:', newFileName)


	// 重命名方法
	fs.renameSync(`./folder/${oldName}`, `./folder/${newFileName}`)
})
// Common.js 不是浏览器原生 js 所支持的
const personal = {
	surname: 'Zeno',
	sayName() {
		console.log(this.surname)
	}
}

const age = {
	age: 20,
}

// 👇写法一
module.exports = {
	personal,
	age
}

// 👇写法二
// exports.personal = personal
// exports.age = age
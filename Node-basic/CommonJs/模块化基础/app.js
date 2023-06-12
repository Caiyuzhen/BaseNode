// 【引入模块方法一】
const data = require('./index.js')
console.log(data.personal, data.age)


// 【引入模块方法二】
// const { personal, age } = require('./index.js')
// console.log(personal, age)


const res = require('./module/zzz')
console.log(res)

// 默认导入都会按 js 文件进行导入, 比如导入 xxx.abc 也会变成 js 文件导入
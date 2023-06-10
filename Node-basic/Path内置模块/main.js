const fs = require('fs');
const path = require('path');


// 🚀resolve() 方法  =>  拼接出规范的绝对路径【🌟常用】 ,  __dirname 表示当前文件所在的目录
console.log(path.resolve(__dirname, './main.js'))



// parse() 方法  =>  解析路径，返回一个对象,  __filename
let str = '/Users/xxx.html'
console.log(path.parse(str))



// basename() 方法  =>  获取文件名
console.log(path.basename(str))



//  extname() 方法  =>  获取文件后缀名
console.log(path.extname(str))
const ejs = require('ejs')
const fs = require('fs')

const person = ['Jimmy', 'Kim', 'Lucy', 'Amy']

// 原生实现, 缺点是将 UI 跟 数据 耦合到一起了 ——————————————————————————————
// let str = '<ul>'

// person.forEach(item => {
// 	str += `<li>${item}</li>`
// })

// str += '<ul>' // 闭合 ul

// console.log(str)




// EJS 实现 , <% %> 为 ejs 的语法 ——————————————————————————————
// let result = ejs.render(`<ul>
// 	<% person.forEach(item => { %>
// 	<li> <%= item %> </li>
// 	<% }) %>
// </ul>`, {person})

// console.log(result)




// EJS 实现 , 并且抽离出 html ——————————————————————————————
const html = fs.readFileSync('./ejs.html').toString() //🔥记得转为字符串
let result = ejs.render(html, {person: person}) //用 person 的数据进行渲染
console.log(result)







// 原生实现【条件渲染】, 根据是否登录返回不同的内容
// let isLogin = false

// switch(isLogin) {
// 	case true:
// 		console.log('已登录')
// 		break
// 	default:
// 		console.log('未登录')
// }


// EJS 实现【条件渲染】, 根据是否登录返回不同的内容
// let isLogin = false

// let res = ejs.render(`
// 	<% if(isLogin){ %>
// 		<span>欢迎回来</span>
// 	<% }else{ %>
// 		<button>登录</button> <button>注册</button>
// 	<% } %>
// `, {isLogin: isLogin})

// console.log(res)


// EJS 实现【条件渲染】, 抽离出 HTML
let isLogin = false

let res = ejs.render(
	fs.readFileSync('./homeEjs.html').toString() 
, {isLogin: isLogin})

console.log(res)
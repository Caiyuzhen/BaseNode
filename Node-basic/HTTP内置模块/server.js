const url = require('url')  // 内置模块
var log4js = require('log4js') 
// var logger = log4js.getLogger()
log4js.configure({
	appenders: { cheese: { type: "file", filename: "cheese.log" } },
	categories: { default: { appenders: ["cheese"], level: "error" } },
})
const logger = log4js.getLogger("cheese")
logger.level = "debug"









// ⚡️ url 的方法 ————————————————————————————————————————————————————————————————————————————————————————

// 解析 url
const urlString = 'https://www.google.com:443/path/index.html?id=2#tag=3'
// console.log(url.parse(urlString)) 
logger.debug(url.parse(urlString))


// 把 url 对象解析成 url 路径
const urlObj = {
	protocol: 'http:',
	slashes: true,
	auth: null,
	host: 'www.google.com:443',
	port: '443',
	hostname: 'www.google.com',
	hash: '#tag=3',
	search: '?id=2',
	query: 'id=2',
	pathname: '/path/index.html',
	path: '/path/index.html?id=2',
	href: 'http://www.google.com:443/path/index.html?id=2#tag=3'
}
logger.debug(url.format(urlObj))
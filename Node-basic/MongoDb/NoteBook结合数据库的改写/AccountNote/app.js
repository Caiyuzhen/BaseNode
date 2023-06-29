var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session') // Express 的库, 可以从获得请求内的 session
const MongoStore = require('connect-mongo') // mongodb 的库, 可以把 Session 存在 mongoDB 中
const { DBHOST, DBPORT, DBNAME} = require('./config/config.js')


// 👇 accountRouter 路由接口文件
var indexRouter = require('./routes/webRenderApi/index')//👈 导入渲染 html 文件的路由, 记得在下面设置路由中间件！app.use('/', indexRouter)
var authRouter = require('./routes/webRenderApi/auth')//👈 导入渲染 html 文件的路由, 记得在下面设置路由中间件！app.use('/', indexRouter)
const accountRouter = require('./routes/api/account') //👈 导入移动端的 API


var app = express();


// 设置 session 中间件, 可以把 Session 存在 mongoDB 中 => 不能写死, 引入 config 配置文件
app.use(session({ // app.use 设置中间件
	name: 'sid', // 设置 cookie 的 name, 默认是 connect.sid
	secret: 'atguigu', // 服务器端生成 session 的签名 （参与加密的字符串） =>  加盐
	saveUninitialized: false, // 是否为每次请求都设置一个 cookie 来存储 session 的 id => 每次都会创建 session 对象
	resave: false, // 🚀在每次请求时重新保存 session => 相当于更新 session 过期时间, 如果长期无操作, session 过期, 就会比如退出登录
	store: MongoStore.create({
		// mongoUrl: 'mongodb://localhost:27017/sessions_container' //数据库的连接配置(🚀或在数据库里边默认创建一个 Collection)
		mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
	}),
	cookie: {
		httpOnly: true, // 🚀 开启后前端无法通过 JS 操作这个绑定 session 的 cookie
		maxAge: 1000 * 60 * 60 * 24 * 7// 7 天的有效期  =>  sessionID 的过期时间(包含发送到浏览器的 cookie)
	},
}))



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 👇全局中间件
app.use(logger('dev'));

app.use(express.json()) // 👈这里是为了获取请求体内的数据 => ⚡️⚡️做了中间件处理, 可以同时解析道 JSON 跟 QueryString 的数据
app.use(express.urlencoded({ extended: false })) // 👈这里是为了获取请求体内的数据 => ⚡️⚡️做了中间件处理, 可以同时解析道 JSON 跟 QueryString 的数据

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter)//定义路由接口 http://localhost:3000/account
app.use('/', authRouter)
app.use('/api', accountRouter) //定义路由接口 http://localhost:3000/api/account


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

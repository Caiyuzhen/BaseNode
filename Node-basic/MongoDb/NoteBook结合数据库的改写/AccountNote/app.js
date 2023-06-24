var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// 👇 accountRouter 路由接口文件
var indexRouter = require('./routes/webRender/index')//👈导入 Web 端的路由
const accountRouter = require('./routes/api/account') //👈导入移动端的 API


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 👇全局中间件
app.use(logger('dev'));

app.use(express.json()) // 👈这里是为了获取请求体内的数据 => ⚡️⚡️做了中间件处理, 可以同时解析道 JSON 跟 QueryString 的数据
app.use(express.urlencoded({ extended: false })) // 👈这里是为了获取请求体内的数据 => ⚡️⚡️做了中间件处理, 可以同时解析道 JSON 跟 QueryString 的数据

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter)//定义路由接口 http://localhost:3000/account
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

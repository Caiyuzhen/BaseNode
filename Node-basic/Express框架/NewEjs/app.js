var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); //日志工具

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// 🔥🔥用 npm start 来启动项目

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //设置 ejs 的路径
app.set('view engine', 'ejs'); //设置 ejs 的M模板



// 👇应用中间件
app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //设置 cookie
app.use(express.static(path.join(__dirname, 'public'))); //设置静态资源文件夹

app.use('/', indexRouter); //设置路由前缀, 简化操作, 不用进去里边写
app.use('/users', usersRouter); //设置路由前缀, 简化操作, 不用进去里边写

// 【另一种 404 的处理方方式就是 * 】 catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

//导入session模块;
var session = require('express-session');

//注册session;
app.use(session({
  secret:'ersfwrer343',  //用来生成加密内容;
  resave:false,
  saveUninitialized:false
}));

//设置默认的模板路径;
app.set('views','./views');

//设置默认的模板引擎;
app.set('view engine', 'ejs');

//托管静态资源;
app.use('/node_modules',express.static('node_modules'));


//使用body-parser解析post提交的数据
var bodyParser = require('body-parser');
//用app.use注册一下这个第三方模板;
app.use(bodyParser.urlencoded({extended:false}));

//导入路由;
// var indexRouter = require('./router/indexRouter.js');
// app.use(indexRouter);

// //导入注册页面的路由;
// var userRouter = require('./router/userRouter.js');
// app.use(userRouter);


//自动注册路由;  fs.readdir里面有一个callback;
fs.readdir(path.join(__dirname,'/router'),(err,files)=>{
  files.forEach(filename=>{
    var filePath = path.join(__dirname,'/router',filename);
    app.use(require(filePath));
  })
})

app.listen(3002,function(){
  console.log('http://127.0.0.1:3002');
})
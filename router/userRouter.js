var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/userCtrl.js');


router
      .get('/register',userCtrl.showRegisterPage)   //展示注册页面;
      .post('/register',userCtrl.registerNewUser)   //注册新用户;
      .get('/login',userCtrl.showLoginPage)         //展示登录界面;
      .post('/login',userCtrl.login)                //登录;
      .get('/logout',userCtrl.logout);              //注销;
module.exports = router;
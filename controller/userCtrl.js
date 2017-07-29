//导入加密文件;
var md5 = require('blueimp-md5');
//导入配置文件;
var config = require('../config.js');

var userModel = require('../model/userModel.js');

module.exports = {
  showRegisterPage(req,res){
    res.render('./user/register',{});
  },

  registerNewUser(req,res){
    var user = req.body;
    //加密密码;
    user.password = md5(user.password,config.pwdSalt);
    //检测用户名是否存在;
    userModel.getUserByName(user.username,(err,result)=>{
      // console.log(result);
      if(err) return res.json({err_code:1,msg:'注册失败'});
      if(result.length) return res.json({err_code:1,msg:'用户名已存在！'});
      
      //注册新用户;
      userModel.registerNewUser(user,(err,result)=>{
        if(err) return res.json({err_code:1,msg:'注册失败'});
        if(result.affectedRows!=1) return res.json({err_code:1,msg:'注册失败'});
        res.json({err_code:0});
      })
    })
  },

  showLoginPage(req,res){
    res.render('./user/login',{});
  },

  login(req,res){
    var user = req.body;
    //加密密码;
    user.password = md5(user.password,config.pwdSalt);
    userModel.login(user,(err,result)=>{
      if(result.length!=1 || err) return res.json({err_code:1,msg:'登录失败!'});

      // console.log(req.session);  //一个对象，里面有cookie，也是一个对象;
      req.session.islogin = true;
      req.session.user = result[0];
      // console.log(req.session);
      res.json({err_code:0});
    })
  },

  logout(req,res){
    // req.session.islogin = null;
    // req.session.user = null;
    // location.href = '/';
    req.session.destroy((err)=>{
      res.redirect('/');
      return ;
    })
  }
}
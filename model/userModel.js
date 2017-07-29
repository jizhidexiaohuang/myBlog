var connection = require('./baseDb.js');

module.exports = {
  getUserByName(name,callback){
    var sqlStr = 'select * from users where username=?';
    connection.query(sqlStr,name,(err,result)=>{
      if(err) return callback(err);
      callback(null,result);
    })
  },

  registerNewUser(user,callback){
    var sqlStr = 'insert into users set ?';
    connection.query(sqlStr,user,(err,result)=>{
      if(err) return callback(err);
      callback(null,result);
    })
  },

  login(user,callback){
    var sqlStr = 'select * from users where username=? and password=?';
    connection.query(sqlStr,[user.username,user.password],(err,result)=>{
      if(err) return callback(err);
      callback(null,result);
    })
  }

}

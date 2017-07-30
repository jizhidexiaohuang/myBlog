var connection = require('./baseDb.js');
var moment = require('moment');

moment.locale('zh-cn');

module.exports = {
  addNewArticle(article,callback){
    var sqlStr = 'insert into articles set ?';
    connection.query(sqlStr,article,(err,result)=>{
      // console.log(result);
      if(err) return callback(err);
      callback(null,result);
    })
  },

  getArticleById(id,callback){
    var sqlStr = 'select articles.*,users.nickname from articles left join users on articles.authorId=users.id where articles.id=?';
    connection.query(sqlStr,id,(err,result)=>{
      // console.log(result);
      if(err) return callback(err);
      //加一个时间;
      result.forEach(article=>{
        article.ctime = moment(article.ctime).format('YYYY-MM-DD HH:mm:ss');
      });

      callback(null,result);
    })
  },

  editArticle(article,callback){
    var sqlStr = 'update articles set ? where id=?';
    connection.query(sqlStr,[article,article.id],(err,result)=>{
      if(err) return callback(err);
      callback(null,result);
    })
  },

  getArticlesByPage(nowPage,pageSize,callback){
    //算出偏移量;
    var offset = pageSize*(nowPage-1);

    var sqlStr = 'select articles.* , users.nickname from articles left join users on articles.authorId=users.id order by ctime desc limit ?, ?; select count(*) As totalPage from articles;';
    connection.query(sqlStr,[offset,pageSize],(err,result)=>{
      // console.log(result);
      if(err) return callback(err);
      //处理时间;
      result[0].forEach(article=>{
        article.ctime = moment(article.ctime).fromNow();
      });
      return callback(null,result);
    })
  }
};
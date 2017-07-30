var articleModel = require('../model/articleModel.js');

module.exports = {
  showIndexPage(req,res){
    
    var nowPage = parseInt(req.query.page) || 1;
    var pageSize = 2;
    
    articleModel.getArticlesByPage(nowPage,pageSize,(err,result)=>{
      if(err) return res.send('服务器内部错误!');
      //总共有多少篇文章;
      var totalPage = result[1][0].totalPage;
      //总共有多少页;
      var totalCount = Math.ceil(totalPage/pageSize);  
      res.render('index',{
        islogin:req.session.islogin,
        user:req.session.user,
        totalCount:totalCount,  //总共有几页;
        nowPage:nowPage,  //当前页码;
        list:result[0]    //第一页的数据;
      })
    })
  }
}
var articleModel = require('../model/articleModel.js');
var mditor = require('mditor');


module.exports = {
  showAddArticlePage(req, res) {
    //判断下用户是否登录;
    if (!req.session.islogin) {
      return res.redirect('/login');  //重定向是一个方法;
    } 
    res.render('./article/add', {
      islogin: req.session.islogin,
      user: req.session.user
    });
  },

  //添加文章
  addNewArticle(req,res){
    var article = req.body;
    article.ctime = new Date();
    articleModel.addNewArticle(article,(err,result)=>{
      if(err||result.affectedRows!=1) return res.json({err_code:1,msg:'发表文章失败!'});
      res.json({err_code:0,id:result.insertId});
    })
  },
  //文章详情页;
  showArticleInfoPage(req,res){
    var id = req.query.id;
    
    articleModel.getArticleById(id,(err,result)=>{
      if(err||result.length!=1) return res.redirect('/');
      //创建一个解析md的对象;
      var parser = new mditor.Parser();
      result[0].content = parser.parse(result[0].content);

      res.render('./article/info',{
        islogin:req.session.islogin,
        user:req.session.user,
        article:result[0]
      });
    })
    
  },


  //编辑文章;
  showEditArticlePage(req,res){
    var id = req.query.id;
    //没有登录无法编辑;
    if(!req.session.islogin) return res.redirect('/');

    articleModel.getArticleById(id,(err,result)=>{
      if(err||result.length !== 1) return res.redirect('/');

      // 在展示编辑页面之前，先要确保 登录人的Id 和 当前文章作者id 相同才能渲染页面
      if (req.session.user.id !== result[0].authorId) return res.redirect('/');

      res.render('./article/edit',{
        islogin:req.session.islogin,
        user:req.session.user,
        article:result[0]
      });
    })
  },
  //编辑文章;
  editArticle(req,res){
    var article = req.body;
    articleModel.editArticle(article,(err,result)=>{
      if(err||result.affectedRows!=1) return res.json({err_code:1,msg:'编辑文章失败!'});
      res.json({err_code:0});
    })
  }
}
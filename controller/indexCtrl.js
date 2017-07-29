module.exports = {
  showIndexPage(req,res){
    res.render('index',{
      islogin:req.session.islogin,
      user:req.session.user
    });
  }
}
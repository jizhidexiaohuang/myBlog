var express = require('express');
var router = express.Router();
var articleCtrl = require('../controller/articleCtrl.js');

router
      .get('/article/add',articleCtrl.showAddArticlePage)
      .post('/article/add',articleCtrl.addNewArticle)
      .get('/article/info',articleCtrl.showArticleInfoPage)
      .get('/article/edit',articleCtrl.showEditArticlePage)
      .post('/article/edit',articleCtrl.editArticle)

module.exports = router;
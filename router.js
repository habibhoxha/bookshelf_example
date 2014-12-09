var article = require('./routes/articles');
var index = require('./routes/index');

module.exports = function (app) {

	/* Index(main) route */
	app.get('/', index.index);

	/* User Routes */
	app.post('/articles', article.saveArticle);
	app.get('/articles', article.getAllArticles);
	app.delete('/article/:id', article.deleteArticle);
	app.get('/article/:id', article.getArticle);
};


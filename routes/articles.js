var Model = require('./../models/Article');

/* Save an Article */
var saveArticle = function (req, res) {
	console.log(req.body);
	new Model.Article({
		title: req.body.title,
		body: req.body.body,
		author: req.body.author
	}).save()
		.then(function (article) {
			//console.log(article);
			res.json(article);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Get all Articles */
var getAllArticles = function (req, res) {
	new Model.Article().fetchAll()
		.then(function (articles) {
			res.json(articles);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Delete an Article */
var deleteArticle = function (req, res) {
	var articleId = req.params.id;
	new Model.Article().where('id', articleId)
		.destroy()
		.catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Get an Article */
var getArticle = function (req, res) {
	var articleId = req.params.id;
	new Model.Article().where('id', articleId)
		.fetch()
		.then(function (article) {
			res.json(article);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Exports all methods */
module.exports = {
	saveArticle: saveArticle,
	getAllArticles: getAllArticles,
	deleteArticle: deleteArticle,
	getArticle: getArticle
};

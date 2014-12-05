var express = require('express');
var router = express.Router();


// Database Configuration (passed to knex)
var dbConfig = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'node_test',
        charset: 'utf8'
    }
};
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

// Article Model
var Article = bookshelf.Model.extend({
    tableName: 'articles'
});


/*
 * GET articlelist.
 */
router.get('/articlelist', function(req, res) {
	new Article().fetchAll()
	.then(function(articles) {
		res.send(articles.toJSON());
	}).catch(function(error) {
		console.log(error);
		res.send({msg: 'An error occured'});
	});
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deletearticle/:id', function(req, res) {
    var id = req.params.id;
    new Article({id: id}).destroy()
	.then(function(err) {
		res.send({msg: ''});
	}).catch(function(error) {
		console.log(error);
		res.send({msg: 'An error occured'});
	});
    
});

/*
 * POST to addarticle.
 */
router.post('/addarticle', function(req, res) {
    var article = req.body;

    if( article.id > 0 )
    {
    	new Article({id: article.id}).save(article, { patch: true })
		.then(function(articles) {
			res.send({msg: ''});
		}).catch(function(error) {
			console.log(error);
			res.send({msg: 'An error occured'});
		});
    }
    else
    {
    	delete article['id'];
	    new Article(article).save()
		.then(function(articles) {
			res.send({msg: ''});
		}).catch(function(error) {
			console.log(error);
			res.send({msg: 'An error occured'});
		});
	}
});

module.exports = router;

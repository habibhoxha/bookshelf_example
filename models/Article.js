var bookshelf = require('./../config/db').bookshelf;

var Article = bookshelf.Model.extend({
	tableName: 'articles'
});

module.exports = {
	Article: Article
};

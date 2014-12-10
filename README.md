## bookshelf_example
=================
### Description
This simple application uses Node.js and bookshelf.js (ORM).

### File Structure
bookshelf_example/                 	- Application root.
bookshelf_example/config/          	- Configuration files.
bookshelf_example/config/db.js     	- Database configuration.
bookshelf_example/models/          	- Models.
bookshelf_example/models/Article.js	- User model file.
bookshelf_example/public/          	- Views, js, css. 
bookshelf_example/routes/          	- Application Routes.
bookshelf_example/routes/index.js  	- Homepage (main) routes 
bookshelf_example/routes/articles.js  	- Article routes.
bookshelf_example/router.js        	- Application router.
node_test.sql                       - Database Table.
package.json                        - npm package descriptor.
server.js                           - Main application file.
README.md                           - Documentation (this file)



## Code
Let's go over the files:

1. bookshelf_example/config/db.js

	Here is the configuration for the database stored. 
    We pass the DBConfig Object to knex package, which we then then pass to bookshelf package in order to be able to use the database.
    
    Then we export bookshelf to be able to use it
    <pre>module.exports.bookshelf = bookshelf;</pre>

2. bookshelf_example/models/Article.js

	In this file we declare the Article Object by extending the bookshelf built-in model. In order to do that, we first need to include bookshelf itself, so:
    
    <pre>var bookshelf = require('./../config/db').bookshelf;</pre>
    
    Now that we have bookshelf, lets declare the Article model. We need the table name, so that bookshelf knows what to build the object upon.
    
    <pre>var User = bookshelf.Model.extend({
    tableName: 'articles'
});</pre>

	Let's now export this model that we just declared
    
    <pre>module.exports = {
    Article: Article
};</pre>
    
   
3. Routes
	Here we let the application know what to display.
    
    In bookshelf_example/routes/index.js we set index.html as the default view, or the main view. 
    
    This uses the package path, in order to resolve the relative path.
    <pre>
    var path = require('path');
    var index = function (req, res) {
        res.sendFile(path.resolve(__dirname + '/../public/index.html'));
    };
	</pre>
	
    The we export the main view.
    <pre>
    module.exports.index = index;
    </pre>
    
	
    In bookshelf_example/routes/articles.js we declare all methods we need for articles, that is getAllArticles, getArticle, saveArticle, deleteArticle. 
    
    Finally, we export these methods, so that we can use them when needed.
    <pre>
    module.exports = {
        saveArticle: saveArticle,
        getAllArticles: getAllArticles,
        deleteArticle: deleteArticle,
        getArticle: getArticle
    };
    </pre>


4. router.js

	Here we let the application know what to do on what routes.
    
    First, we include the routes and methods from index.js and articles.js.
    
    <pre>
    var article = require('./routes/articles');
    var index = require('./routes/index');
    </pre>
    
    Now that we have the methods, let's tell what to do:
    
    This:
    <pre>
    app.get('/', index.index);</pre>
    will let the application know, that when the application opens, it should show the index file, as earlier declared in index.js
    <pre>
    var index = function (req, res) {
        res.sendFile(path.resolve(__dirname + '/../public/index.html'));
    };</pre>
    
    Finally, we export all routes, so that 
    <pre>
    module.exports = function (app) {
        app.get('/', index.index);
        app.post('/articles', article.saveArticle);
        app.get('/articles', article.getAllArticles);
        app.delete('/article/:id', article.deleteArticle);
        app.get('/article/:id', article.getArticle);
    };
    </pre>
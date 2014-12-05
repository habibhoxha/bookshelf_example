var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var articles = require('./routes/articles');

var app = express();

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
 
app.set('bookshelf', bookshelf);

// Article Model
var Article = bookshelf.Model.extend({
    tableName: 'articles'
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/articles', articles);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

'use strict';

// Articles routes use articles controller
var articles = require('../controllers/articles');

module.exports = function(app) {

    app.redirect('/', '/articles', 301);
    app.get('/articles', articles.index);
    app.get('/articles/angular', articles.angularIndex);
    app.get('/articles/angular/*', articles.angularIndex);
    

};
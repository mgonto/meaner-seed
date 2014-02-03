'use strict';

// Articles routes use articles controller
var main = require('../controllers/main');

module.exports = function(app) {

    // Main static page
    app.get('/', main.index);

    // Angular app
    app.get('/app', main.app);
    app.get('/app/*', main.app);
    

};
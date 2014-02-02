'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    walker = require('./config/walker');

    
    
    

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// Set the node enviornment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Initializing system variables 
var config = require('./config/config'),
    mongoose = require('mongoose');

// Bootstrap db connection
var db = mongoose.connect(config.db);

// Bootstrap models
walker.modelWalker(__dirname + '/app/models');

var app = express();

// Express settings
require('./config/express')(app, db);

// Bootstrap routes
walker.routeWalker(__dirname + '/app/routes', app);


// Start the app by listening on <port>
var port = process.env.PORT || config.port;
app.listen(port);
console.log('Express app started on port ' + port);


// Expose app
exports = module.exports = app;

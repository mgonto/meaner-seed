'use strict';

var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    _ = require('lodash');

exports.index = function(req, res) {
    res.render('articles/index');
};

exports.angularIndex = function(req, res) {
    res.render('articles/spaIndex');
};

'use strict';

var _ = require('lodash');

exports.index = function(req, res) {
    res.render('main/index');
};

exports.app = function(req, res) {
    res.render('main/app');
};

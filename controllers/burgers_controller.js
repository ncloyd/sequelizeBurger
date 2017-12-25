var express = require('express');
var burger = require('../models/burger.js');


var router = express.Router();

router.get('/', function(req, res) {
	res.redirect('/index');
});

 router.get('/index', function(req, res) {
  	burger.all(function(data) {
  		var hbsObject = {burgers: data};
      res.render("index", hbsObject);
	});
  });

  router.post('/burgers/create', function(req, res) {
  	burger.create(['burger_name', 'devoured'], [req.body.name, false], function() {
  		res.redirect('/index');
  	});
  });

router.put('/burgers/update/:id', function(req, res) {
	var condition = 'id = ' + req.params.id;
	console.log('condition', condition);

	burger.update({devoured: req.body.devoured}, condition, function() {
		res.redirect('/index');
	});
});
  module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sua Sala' });
});

router.get('/search_results', function(req, res) {
	res.send(
		"Search results page:" 
	);
});

router.get('/users', function(req, res) {
	res.send({
		users: ['Steve', 'Eric']
	});
});

module.exports = router; 


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sua Sala' });
});

router.get('/', function(req, res, next) {
  res.render('index', { link: 'https://www.opened.com/assessment/ratios/1070702'});
});

router.get('/search_results', function(req, res) {
	res.send(
		"Search results page:" 
	);
});

module.exports = router; 




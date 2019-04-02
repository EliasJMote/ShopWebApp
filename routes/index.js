var express = require('express');
var router = express.Router();
var db_model = require('../public/javascripts/db_model.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Product List' });
});

/* GET SINGLE product. */
router.get('/single_product.html', function(req, res, next) {
	db_model.select_one_product(1);
	res.send('hello world');
});

module.exports = router;

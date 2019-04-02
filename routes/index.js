var express = require('express');
var router = express.Router();
var db_model = require('../public/javascripts/db_model.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Product List' });
});

/* GET single product. */
router.get('/single_product*', function(req, res, next) {
	let product = db_model.select_one_product(req.query.SKU);
	res.send("Product number " + req.query.SKU);
});

module.exports = router;

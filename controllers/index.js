let express = require('express');
let router = express.Router();
const dbModel = require('../models/dbModel.js');
const sqlite3 = require('sqlite3').verbose();
const dbName = "./models/products.db";


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render("index.html");
});

/* GET product list */
router.get('/product_list', function(req, res, next) {

	// Respond to the client with the html page
	let f = function(sqlRes, result, resolve) {
		//console.log(sqlRes)
		res.render("product_list.html", {products: sqlRes});
		resolve(sqlRes);
	}
	dbModel.selectAllProducts(f)
});

/* GET single product. */
router.get('/single_product', function(req, res, next) {

	// Respond to the client with the html page
	let f = function(sqlRes, result, resolve) {
		res.render("single_product.html", {product: sqlRes});
		resolve(sqlRes);
	}

	// Get the product from the database
	dbModel.selectOneProduct(f, req.query.SKU)
});

module.exports = router;

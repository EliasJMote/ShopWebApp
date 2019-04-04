// Importing the sqlite3 module with verbose for long stack traces
const sqlite3 = require('sqlite3').verbose();

// Name of the database we wish to access
const dbName = "./models/products.db";

// Open the products database connection
function openDbConnection() {

	console.log(`Opening ${dbName} connection`)

	let db = new sqlite3.Database(dbName, (err) => {
		if(err) {
			return console.error(err.message);
		} else {
			console.log(`Connected to the ${dbName} SQlite database.`);

			// Return the database
			return db;
		}
	});
}

// Close the database connection when we are finished with it
function closeDbConnection(db) {

	console.log(`Closing ${dbName} connection.`)

	db.close((err) => {
		if(err) {
			return console.error(err.message);
		} else {
			console.log(`Closed the ${dbName} connection.`)

			// Return the empty database
			return;
		}
	});
}

module.exports = {

	// Select all products for list view
	selectAllProducts: function(f) {

		new Promise(function(resolve, reject){
			let db = new sqlite3.Database(dbName, (err) => {
				if(err) {
					return console.error(err.message);
				} else {
					console.log(`Connected to the ${dbName} SQlite database.`);
					resolve(db)
				}
			});
		}).then(function(result) {

			// Tell the server we are selecting all products
			console.log("Selecting all products from ${dbName} SQlite database");

			result.all(`SELECT * FROM products`,
				[], (err, products) => {
				if (err) {
					// Close database connection
					closeDbConnection(result);

					return console.error(err.message);
				} else {

					// Return the products we want
					closeDbConnection(result);

					return new Promise(function(resolve, reject){
						f(products, result, resolve)
					})
				}
			});

		});
	},

	// Select one product from the database based on its SKU
	selectOneProduct: function(f, SKU) {

		new Promise(function(resolve, reject){
			let db = new sqlite3.Database(dbName, (err) => {
				if(err) {
					return console.error(err.message);
				} else {
					console.log(`Connected to the ${dbName} SQlite database.`);
					resolve(db)
				}
			});
		}).then(function(result) {

			// Tell the server we are selecting one product
			console.log(`Select product with SKU = ${SKU} from ${dbName} SQlite database`);

			result.get(`SELECT * FROM products WHERE SKU = ${SKU}`, [], (err, product) => {
				if (err) {
					// Close database connection
					closeDbConnection(result);

					return console.error(err.message);
				} else {

					// Return the products we want
					closeDbConnection(result);
					
					return new Promise(function(resolve, reject){
						f(product, result, resolve)
					})
				}
			});

		});
	},

	// Count the number of unique products in the database
	countProducts: function(f) {
		
		new Promise(function(resolve, reject){
			let db = new sqlite3.Database(dbName, (err) => {
				if(err) {
					return console.error(err.message);
				} else {
					console.log(`Connected to the ${dbName} SQlite database.`);
					resolve(db)
				}
			});
		}).then(function(result) {
			
			// Tell the server we are counting products
			console.log(`Count products from ${dbName} SQlite database`);

			result.get(`SELECT count(*) FROM products`, [], (err, row) => {
				if (err) {
					// Close database connection
					closeDbConnection(result);

					return console.error(err.message);
				} else {

					// Return the products we want
					closeDbConnection(result);

					return new Promise(function(resolve, reject){
						f(row, result, resolve)
					})
				}
			});

		})

	}
}
// Importing the sqlite3 module with verbose for long stack traces
const sqlite3 = require('sqlite3').verbose();

// Name of the database we wish to access
let db_name = "./public/products.db";

// Open the products database
function open_db_connection() {
	console.log(`Open database`)
	let db = new sqlite3.Database(db_name, (err) => {
		if(err) {
			return console.error(err.message);
		}
		console.log(`Connected to the ${db_name} SQlite database.`)
	});
	return db;
}


// Create the product table if it doesn't exist
/*db.run(`CREATE TABLE IF NOT EXISTS products(SKU int primary key not null, 
	title text not null,
	description text,
	product_photo text, 
	price real not null)`, insert_rows);*/

// Close the database connection when we are finished with it
function close_db_connection(db) {
	db.close((err) => {
		if (err) {
			return console.error(err.message);
		}
		console.log(`Closed the ${db_name} connection.`)
	});
}

// Insert a product into the database
function insert_product(SKU, title, description, product_photo, price) {
	db.run(`INSERT INTO products(SKU, title, description, product_photo, price)
		VALUES (?, ?, ?, ?, ?), [SKU, title, description, product_photo, price]`
	)
}

module.exports = {

	// Select all products for list view
	select_all_products: function() {
		console.log("Select all products");
	    db.all("SELECT rowid AS title, product_photo, description FROM products", 
	    	function(err, rows) {
		        rows.forEach(function (row) {
		            console.log(row.title + ", " + row.product_photo
		            	+ row.description);
			});
		});
	},

	// Select one product for single product view
	select_one_product: function(SKU) {
		console.log(`Select product with SKU = ` + SKU);
		let db = open_db_connection();

		let sql = `SELECT * FROM products WHERE SKU = ` + SKU
		db.all(sql, [], (err, row) => {
			if (err) {
				return console.error(err.message);
			}
			console.log(row);
			//return row
				//? console.log(row.SKU, row.title)
				//: console.log(`No product found with the SKU $(SKU)`);
		});

		close_db_connection(db);

	}

	count_products: function() {
		let db = open_db_connection();

		console.log("Count the number of products.");
		db.get(`SELECT count(DISTINCT *) FROM products`, [], (err, row) => {
			if (err) {
				return console.error(err.message);
			}
			console.log(row);
		});
	}
}
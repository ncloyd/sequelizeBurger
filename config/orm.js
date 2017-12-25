// * Import (require) `connection.js` into `orm.js`

var connection = require('../config/connection.js');

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        if (ob.hasOwnProperty(key)) {
            arr.push(key + '=' + ob[key]);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
	// selectAll function for grabbing everything from the table
	all: function(tableInput, cb) {
		var queryString = 'SELECT * FROM ' + tableInput + ';';
		connection.query(queryString, function(err, result) {
			if (err) throw err;
			// send the query result back to the callback function
			cb(result);
		});
	},
	// insertOne function for inserting one burger into table
	create: function(table, cols, vals, cb) {
		var queryString = 'INSERT INTO ' + table;

		queryString += ' (';
		queryString += cols.toString();
		queryString += ') ';
		queryString += 'VALUES (';
		queryString += printQuestionMarks(vals.length);
		queryString += ') ';

		console.log(queryString);
		console.log(vals);

		connection.query(queryString, vals, function(err, result) {
			if (err) throw err;
			// send the query result back to the callback function
			cb(result);
		});
	},

	// update one function for changing a burger status
	update: function(table, objColVals, condition, cb) {
		var queryString = 'UPDATE ' + table;

		queryString += ' SET ';
		queryString += objToSql(objColVals);
		queryString += ' WHERE ';
		queryString += condition;

		console.log(queryString);

		connection.query(queryString, function(err, result) {
			if (err) throw err;
			// send the query result back to the callback function
			cb(result);
		});
	}
};

// Export the orm object for the model
module.exports = orm;
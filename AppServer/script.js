var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createPool({
	connectionLimit: 50,
	host: 'localhost',
	user: 'toptal',
	password: '!toptal_rocks!',
	database: 'toptal_app'
});

app.get('/', function(req, resp) {
	connection.getConnection(function(error, tempConnect){
		if(error){
			tempConnect.release();
			console.log('Error');
		} else {
			console.log('Connected');
			tempConnect.query("SELECT * FROM timezones", function(error, rows, fields){
				if(error) {
					console.log('Error in the query');
				} else {
					console.log('successful query');
					console.log(rows);
					resp.json(rows);
					// do something with rows, fields
				}
			});
		}
	});
})

app.get('/createUser', (req, res) => {
  res.json('in here');
})

app.listen(1337);
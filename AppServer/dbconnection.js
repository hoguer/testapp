var mysql=require('mysql');
var connection=mysql.createPool({
	host: 'localhost',
	user: 'toptal',
	password: '!toptal_rocks!',
	database: 'toptal_app'
});
module.exports=connection;
var db=require('../dbconnection');

var User={
	getAllUsers:function(loggedInUser,callback){
  	let user_id_clause = (loggedInUser.role_name === 'user') ? "where u.id = " + loggedInUser.id : "";
  	return db.query("Select u.id,u.username,u.first_name,u.last_name,u.email,u.password,r.name as role_name from users u inner join roles r on u.role_id=r.id " + user_id_clause,callback);
	},
	findOne:function(username,callback){
		return db.query("Select u.id,u.username,u.first_name,u.last_name,u.email,u.password,r.name as role_name from users u inner join roles r on u.role_id=r.id where u.username=?", [username], callback);
	},
	addUser:function(User,callback){
		console.log(User);
  	return db.query("Insert into users (username, first_name, last_name, email, role_id, password) values(?,?,?,?,?,?)",[User.username, User.first_name, User.last_name, User.email, User.role_id, User.password],callback);
  },
  getUserById:function(User,id,callback){
  	return db.query("Select u.id,u.username,u.first_name,u.last_name,u.email,u.password,r.name as role_name from users u inner join roles r on u.role_id=r.id where u.id=?", [id], callback);
  },
  deleteUsers:function(loggedInUser,ids,callback){
  	if (loggedInUser.role_name === 'user') {
  		return;
  	}
    return db.query("DELETE FROM users WHERE id IN (?)",[ids],callback);
	},
	updateUser:function(loggedInUser,id,User,callback){
		let user_id_clause = (loggedInUser.role_name === 'user') ? "and id = " + loggedInUser.id : "";
    return db.query("Update users set username=?,first_name=?,last_name=?,role_id=?, email=? where id=? " + user_id_clause,[User.username,User.first_name,User.last_name,User.role_id,User.email,id],callback);
	}
};

module.exports=User;
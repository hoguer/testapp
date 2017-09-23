var db=require('../dbconnection');

var User={
	findOne:function(username,callback){
		return db.query("Select * from users where username=?", [username], callback);
	},
	addUser:function(User,callback){
		console.log(User);
  	return db.query("Insert into users (username, first_name, last_name, email, role_id, password) values(?,?,?,?,?,?)",[User.username, User.first_name, User.last_name, User.email, User.role_id, User.password],callback);
  },
  findById:function(id,callback){
  	return db.query("Select * from users where id=?", [id], callback);

  }
};

module.exports=User;
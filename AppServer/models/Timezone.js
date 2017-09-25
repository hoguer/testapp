var db=require('../dbconnection');

var Timezone={
	getAllTimezones:function(User,callback){
		let where_clause = ((User.role_name === 'user')||(User.role_name === 'manager')) ? "where owner_id = " + User.id : "";
		return db.query("Select id,name,city,gmt_offset from timezones " + where_clause,callback);
	},
	getTimezoneById:function(User,id,callback){
		let owner_id_clause = ((User.role_name === 'user')||(User.role_name === 'manager')) ? "and owner_id = " + User.id : "";
    return db.query("select id,name,city,gmt_offset from timezones where id=? " + owner_id_clause,[id],callback);
  },
  addTimezone:function(User,Timezone,callback){
  	return db.query("Insert into timezones (name,city,gmt_offset,owner_id)values(?,?,?,?)",[Timezone.name,Timezone.city,Timezone.gmt_offset,User.id],callback);
  },
  deleteTimezones:function(User,ids,callback){
  	let owner_id_clause = ((User.role_name === 'user')||(User.role_name === 'manager')) ? "and owner_id = " + User.id : "";
    return db.query("DELETE FROM timezones WHERE id IN (?) " + owner_id_clause,[ids],callback);
	},
	updateTimezone:function(User,id,Timezone,callback){
		console.log(Timezone);
		let owner_id_clause = ((User.role_name === 'user')||(User.role_name === 'manager')) ? "and owner_id = " + User.id : "";
    return db.query("Update timezones set name=?,city=?,gmt_offset=? where id=? " + owner_id_clause,[Timezone.name,Timezone.city,Timezone.gmt_offset,id],callback);
	}
};

module.exports=Timezone;
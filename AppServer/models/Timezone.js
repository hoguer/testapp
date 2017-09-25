var db=require('../dbconnection');

var Timezone={
	getAllTimezones:function(User,callback){
		let where_clause = ((User.role_name === 'user')||(User.role_name === 'manager')) ? "where owner_id = " + User.id : "";
		console.log(where_clause);
		return db.query("Select id,name,city,gmt_offset from timezones " + where_clause,callback);
	},
	getTimezoneById:function(User,id,callback){
		let owner_id_clause = ((User.role_name === 'user')||(User.role_name === 'manager')) ? "and owner_id = " + User.id : "";
    return db.query("select id,name,city,gmt_offset from timezones where id=? " + owner_id_clause,[id],callback);
  },
  addTimezone:function(User, Timezone,callback){
  	return db.query("Insert into timezones (name,city,gmt_offset,owner_id)values(?,?,?,?)",[Timezone.name,Timezone.city,Timezone.gmt_offset,User.id],callback);
  },
  deleteTimezone:function(User,id,callback){
  	let owner_id_clause = ((User.role_name === 'user')||(User.role_name === 'manager')) ? "and owner_id = " + User.id : "";
    return db.query("delete from timezones where id=? " + owner_id_clause,[id],callback);
	},
	updateTimezone:function(User,id,Timezone,callback){
		let owner_id_clause = ((User.role_name === 'user')||(User.role_name === 'manager')) ? "and owner_id = " + User.id : "";
    return db.query("update timezones set name=?,city=?,gmt_offset=? where id=? " + owner_id_clause,[Timezone.name,Timezone.city,Timezone.gmt_offset,id],callback);
	},
	deleteAll:function(item,callback){
		var delarr=[];
		for(i=0;i<item.length;i++){
			delarr[i]=item[i].Id;
	  }
	  return db.query("delete from timezones where id in (?)",[delarr],callback);
	}
};

module.exports=Timezone;
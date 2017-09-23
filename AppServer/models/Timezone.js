var db=require('../dbconnection');

var Timezone={
	getAllTimezones:function(callback){
		return db.query("Select id,name,city,gmt_offset from timezones",callback);
	},
	getTimezoneById:function(id,callback){
		console.log(id);
    return db.query("select id,name,city,gmt_offset from timezones where id=?",[id],callback);
  },
  addTimezone:function(Timezone,callback){
  	console.log("in addTimezone");
  	console.log(Timezone);
  	return db.query("Insert into timezones (name,city,gmt_offset)values(?,?,?)",[Timezone.name,Timezone.city,Timezone.gmt_offset],callback);
  },
  deleteTimezone:function(id,callback){
    return db.query("delete from timezones where id=?",[id],callback);
	},
	updateTimezone:function(id,Timezone,callback){
    return db.query("update timezones set name=?,city=?,gmt_offset=? where id=?",[Timezone.name,Timezone.city,Timezone.gmt_offset,id],callback);
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
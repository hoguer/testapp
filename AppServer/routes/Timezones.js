var express = require('express');
var router = express.Router();
var Timezone=require('../models/Timezone');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.send("NOT_LOGGED_IN");
}

//CREATE
router.post('/', isAuthenticated, function(req,res,next){
	Timezone.addTimezone(req.user[0], req.body,function(err,result){
		if(err) {
			res.json(err);
		} else {
			if (result) {
				req.body.id = result.insertId;
			}
      res.json(req.body); 
    }
  });
});

//READ
router.get('/:id?', isAuthenticated, function(req,res,next){
	if(req.params.id){
		Timezone.getTimezoneById(req.user[0], req.params.id,function(err,rows){
			if(err) {
				res.json(err);
			} else {
				res.json(rows);
			}
		});
	} else {
		Timezone.getAllTimezones(req.user[0], function(err,rows){
			if(err) {
				res.json(err);
			} else {
				res.json(rows);
			}
    });
	}
});

//UPDATE
router.put('/:id',isAuthenticated, function(req,res,next){
  Timezone.updateTimezone(req.user[0], req.params.id,req.body,function(err,rows){
		if(err) {
			res.json(err);
		} else {
      res.json(rows);
    }
  });
});

//DELETE
router.delete('/:id', isAuthenticated, function(req,res,next){
	console.log(req.params.id);
	Timezone.deleteTimezone(req.user[0], req.params.id,function(err,count){
		if(err) {
			res.json(err);
		} else {
      res.json(count);
    }
  });
});

module.exports=router;



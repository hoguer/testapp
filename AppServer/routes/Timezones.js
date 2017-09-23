var express = require('express');
var router = express.Router();
var cors = require('cors');
var Timezone=require('../models/Timezone');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.json("NOT_LOGGED_IN");
}

//CREATE
router.post('/', function(req,res,next){
	console.log("in post");
	console.log(req.headers);
	console.log(req.body);
	Timezone.addTimezone(req.body,function(err,result){
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
router.get('/:id?', function(req,res,next){
	if(req.params.id){
		Timezone.getTimezoneById(req.params.id,function(err,rows){
			if(err) {
				res.json(err);
			} else {
				res.json(rows);
			}
		});
	} else {
		Timezone.getAllTimezones(function(err,rows){
			if(err) {
				res.json(err);
			} else {
				res.json(rows);
			}
    });
	}
});

//UPDATE
router.put('/:id',function(req,res,next){
  Timezone.updateTimezone(req.params.id,req.body,function(err,rows){
		if(err) {
			res.json(err);
		} else {
      res.json(rows);
    }
  });
});

//DELETE
router.delete('/:id',function(req,res,next){
	Timezone.deleteTimezone(req.params.id,function(err,count){
		if(err) {
			res.json(err);
		} else {
      res.json(count);
    }
  });
});

module.exports=router;



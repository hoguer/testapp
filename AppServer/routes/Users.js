var express = require('express');
var router = express.Router();
var User=require('../models/User');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.send("NOT_LOGGED_IN");
}

function getRoleName(role_id) {
	switch(role_id) {
    case "1":
        return 'admin';
    case "3":
        return 'manager';
    default:
    console.log(role_id);
        return 'user';
	}
}

//GET CURRENT USER
router.get('/getCurrentUser', isAuthenticated, function(req,res,next){
	res.json(req.user[0]);
});

//CREATE
router.post('/', isAuthenticated, function(req,res,next){
	console.log("in add user");
	User.addUser(req.body,function(err,result){
		if(err) {
			res.json(err);
		} else {
			if (result) {
				req.body.id = result.insertId;
			}
			req.body.role_name = getRoleName(req.body.role_id);
      res.json(req.body); 
    }
  });
});

//READ
router.get('/:id?', isAuthenticated, function(req,res,next){
	if(req.params.id){
		User.getUserById(req.user[0], req.params.id,function(err,rows){
			if(err) {
				res.json(err);
			} else {
				res.json(rows);
			}
		});
	} else {
		User.getAllUsers(req.user[0], function(err,rows){
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
  User.updateUser(req.user[0], req.params.id,req.body,function(err,result){
		if(err) {
			res.json(err);
		} else {
			if (result) {
				req.body.id = req.params.id;
			}
			req.body.role_name = getRoleName(req.body.role_id);
      res.json(req.body);
    }
  });
});

//DELETE
router.delete('/:ids', isAuthenticated, function(req,res,next){
	User.deleteUsers(req.user[0], JSON.parse(req.params.ids),function(err,count){
		if(err) {
			res.json(err);
		} else {
      res.json(count);
    }
  });
});

module.exports=router;



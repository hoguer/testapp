var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.json('false');
}

module.exports = function(passport){
  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
    successRedirect: 'http://localhost:8000/',
    failureRedirect: '/login',
    failureFlash : true 
  }));
 
  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: 'http://localhost:8000/',
    failureRedirect: '/signup',
    failureFlash : true 
  }));

  	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	router.get('/isLoggedIn', function(req, res) {
		if (req.user && req.user.username) {
			res.json("true");
		} else {
			res.json("false");
		}
	});

	/* GET login page. */
  router.get('/login', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('index', { message: req.flash('message') });
  });

  /* GET registration page. */
  router.get('/signup', function(req, res) {
    // Display the Registration with any flash message, if any
		res.render('register',{message: req.flash('message')});
  });
 
  return router;
}
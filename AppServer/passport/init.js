var login = require('./login');
var signup = require('./signup');
var User = require('../models/User');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        console.log(user.username);
        done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {
        User.findOne(username, function(err, user) {
            console.log('deserializing user:',user);
            done(err, user);
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);

}
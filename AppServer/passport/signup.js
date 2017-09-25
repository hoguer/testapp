var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/User');
var bCrypt = require('bcrypt');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            findOrCreateUser = function(){
                // find a user in DB with provided username
                User.findOne(username, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        return done(err);
                    }
                    // already exists
                    if (user && (user.length > 0)) {
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        req.body.username = username;
                        req.body.password = createHash(password);
                        req.body.role_id = 2;

                        // save the user
                        User.addUser(req.body, function(err) {
                            if (err){
                                throw err;  
                            }
                            return done(null, req.body);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}
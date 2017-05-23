var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/userModel');
var jwt = require('jsonwebtoken');
var config = require('../etc/config'); // the secrets file

passport.use(new FacebookStrategy({
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL,
        profileFields: ['email', 'displayName']
    },
    function(accessToken, refreshToken, profile, done) {

      console.log(profile)

        User.findOne({
            'socialId': profile.id
        }, function(err, user) {

            //If no user was found, create a new user with details from the facebook profile
            if (!user) {
                console.log('user not found in db, creating a new one');

                user = new User({
                    socialId: profile.id,
                    displayName: profile.displayName,
                    eMail: profile.emails ? profile.emails[0].value : "",
                    provider: 'facebook',
                    loginCount: 0,
                    photoURI: 'http://graph.facebook.com/'+profile.id+'/picture'

                });
            } else {
                //else, a user exists so let's add one to their login count
                user.loginCount++;
                user.lastLogin = new Date();

            }
            //finally let's save and call "done"
            user.save(function(err, newUser) {
                if (err) {
                  //  console.log(err);
                    return done(err);
                } else {
                    var token = jwt.sign(
                      {
                        id: newUser.id,
                        name: newUser.displayName
                      }
                        ,config.localKey,
                      {
                        expiresIn: "1000d"
                      });

                    return done(null, {
                        token: token,
                        name: newUser.displayName,
                        oid: newUser._id
                    });
                }
            });
        });







        //code to check database goes here

        //code to create JWT goes here


    }
));

//passport configuration here

module.exports = passport;

var express = require('express');
var router = express.Router();
var passport = require('../models/passport');
var User = require('../models/userModel');


router.get('/facebook',
    passport.authenticate('facebook', {
        scope: 'email user_location'
    }));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        session: false,
        failureRedirect: '/'
    }),
    function(req, res) {

        //console.log(req.headers);
        //console.log(req.user);

        res.redirect('/authorization?token=' + req.user.token + "&name=" + req.user.name +"&oid="+ req.user.oid);
        // Successful authentication, redirect home.
        //res.redirect('/');
    });

// export the route to the main server.js file
module.exports = router;

var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/angularjs-auth', function(err) {
    if (err) throw err;
});

var User = require('./models/userModel'); //used by passport

var ensureAuthenticated = jwt({ secret: 'secret' });

var app = express();
//Use body parser for
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


//Serve static files in the root directory:
// app.use(express.static('public'));
app.use(express.static('app'));
//Serve the node_modules files without the need for full path:
app.use(express.static('node_modules'));

// Server errors handling
app.all('[^.]+', function(req, res) {
    res.sendFile(__dirname + "/app/index.html");
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});

// Start a server listener
app.listen(7000, function() {
    console.log("App: " + app.name + " is listening on 7000. ");

});

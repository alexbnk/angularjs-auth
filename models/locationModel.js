var mongoose = require('mongoose');
//var plm = require('passport-local-mongoose');
var Schema = mongoose.Schema;

  var locationSchema = new Schema({

    provider: {type: String},
    id: {type: String},
    data: {},
    created: {type: Date}

  });

  //userSchema.plugin(plm);

var userLocation = mongoose.model("userLocation", locationSchema);
module.exports = userLocation;

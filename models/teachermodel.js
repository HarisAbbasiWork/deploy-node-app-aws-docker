var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var teacher = new Schema({
    "firstname": String, 
    "lastname": String,
    "email":String, 
    "password":String
});
module.exports = mongoose.model('teachers', teacher);
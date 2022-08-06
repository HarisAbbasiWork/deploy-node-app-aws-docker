var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var instructor = new Schema({
    "id": String, 
    "password": String
});
module.exports = mongoose.model('instructor', instructor);
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var user = new Schema({
    "firstname": String, 
    "lastname": String,
    "email":String, 
    "password":String,
    "courses":[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses'
    }]
});
module.exports = mongoose.model('students', user);
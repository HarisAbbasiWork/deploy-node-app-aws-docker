var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var job = new Schema({
    "coursename": String, 
    "coursedescription": String,
    "courseteacher":{type: mongoose.Schema.Types.ObjectId,
        ref: 'teachers'}
});
module.exports = mongoose.model('courses', job);
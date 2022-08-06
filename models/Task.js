var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var task = new Schema({
    "task":String,
    "status":{
        type:String,
        default:null
        
    }
});
module.exports = mongoose.model('tasks', task);
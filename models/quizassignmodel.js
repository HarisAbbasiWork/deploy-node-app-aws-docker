var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var quiz = new Schema({
    "type": String, 
    "question1": String,
    "question2": String,
    "teacher":{type: mongoose.Schema.Types.ObjectId,
        ref: 'teachers'},
    "course":{type: mongoose.Schema.Types.ObjectId,
        ref: 'courses'}
});
module.exports = mongoose.model('quizassignments', quiz);
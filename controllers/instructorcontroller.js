var userModel = require('../models/usermodel')
var courseModel = require('../models/coursemodel')
var teacherModel = require('../models/teachermodel')
var instructorModel = require('../models/instructormodel')
const bcrypt = require("bcrypt")
var ObjectId = require('mongodb').ObjectID;
const saltRounds = 10;
const instructormodel = require('../models/instructormodel')

       exports.addcourse = async function(req, res){
        var courseelements = req.body;
        console.log("Job i recieved in nodejs (Backend)", courseelements)
        var data = { 
          "coursename": courseelements.coursename,
          "coursedescription": courseelements.coursedescription, 
          "courseteacher": courseelements.teacher
          
          
        } 
        courseModel.create(data,function(err, collection){ 
          if (err) throw err; 
          console.log("Course inserted Successfully"); 
          return res.send({
            message: 'Course inserted Successfully'
          });
                
      });
        
       }
       exports.signin = async function(req, res){
        var countValue = req.body;
    console.log("U are ", countValue);
    instructorModel.findOne({ id: countValue.id }, function(err, collection){
      if(err){
          console.log("Invalid Instructor");
          return res.send({
            success: false,
            message: 'Instructor not exists'
          });
      }else{
        
        if (collection!=null){
          console.log("Instructor found");
          bcrypt.compare(countValue.pass, collection.password, function(err, resi) {
            console.log(resi)
          if (resi === true){
            console.log("Instructor Matched");
            return res.send({
              success: true,
              message: 'Correct Details',
              
            });
          }else{
            return res.send({
              success: false,
              message: 'Error: Instructor ID and Pass Dont Match'
            });
           
          }
        });
          
        }else{
          console.log("Instructor not found");
          return res.send({
            success: false,
            message: 'Error: Incorrect Instructor, Recheck Your Instructor ID'
          });
        }
      }
       
    });
       }
       exports.createinstructor = function(req, res){
        console.log("new instructor ID: ",req.body.id," new pass: ", req.body.pass)
  
  bcrypt.hash(req.body.pass, saltRounds, async (err, hash) => {
  var data = { 
    "id": req.body.id,
    "password":hash
    } 
console.log("HashedPwd: ", hash)
instructorModel.create(data,function(err, collection){ 
    if (err) throw err; 
    console.log("Record inserted Successfully"); 
    res.status(400).json({ auth : true, message :"You are now a registered instructor please login"});
          
}); 
});
       }
       
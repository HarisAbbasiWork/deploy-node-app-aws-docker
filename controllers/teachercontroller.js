var userModel = require('../models/usermodel')
var courseModel = require('../models/coursemodel')
var teacherModel = require('../models/teachermodel')
var qaModel =require('../models/quizassignmodel')
const bcrypt = require("bcrypt")
var ObjectId = require('mongodb').ObjectID;
const saltRounds = 10;

exports.getteachers =async function(req,res){ 
  console.log("lets get teachers")
  const filter = {};
  const all = await teacherModel.find(filter);
  console.log("All Teachers: ", all)
  res.json(all)

    
}
exports.getQA =async function(req,res){ 
  console.log("lets get teachers")
  const filter = {};
  const all = await qaModel.find(filter);
  console.log("All QA: ", all)
  res.json(all)

    
}
       exports.signup = async function(req, res){
        var countValue = req.body;
  console.log("CountValue is", countValue.email, countValue.fname, countValue.lname);
  teacherModel.findOne({email:countValue.email},function(err,user){
    if(user) return res.status(400).json({ auth : false, message :"Email Already Exits"});
  
  bcrypt.hash(req.body.pass, saltRounds, async (err, hash) => {
  var data = { 
    "firstname": countValue.fname, 
    "lastname": countValue.lname,
    "email":countValue.email, 
    "password":hash
    



} 
console.log("HashedPwd: ", hash)
teacherModel.create(data,function(err, collection){ 
    if (err) throw err; 
    console.log("Record inserted Successfully"); 
    res.status(400).json({ auth : true, message :"You are now a registered teacher please login"});
          
}); 
});
});
       }
       exports.signin = async function(req, res){
        var countValue = req.body;
  console.log("U are ", countValue.email);
  
  teacherModel.findOne({ email: countValue.email }, function(err, collection){
  if(err){
      console.log("Invalid Teacher");
      return res.send({
        success: false,
        message: 'Teacher not exists'
      });
  }else{
    
    if (collection!=null){
      console.log("Teacher found");
      bcrypt.compare(countValue.pass, collection.password, function(err, resi) {
        console.log(resi)
      if (resi === true){
        console.log("Correct details found");
        console.log(collection.firstname+ countValue.email+collection._id)
        const id=collection._id
        /*var token = jwt.sign(id, "jwtsecret",{
          expiresIn:3000,

        });*/

        return res.send({
          success: true,
          //token: token,
          message: 'Correct Details',
          fname: collection.firstname,
          lname: collection.lastname,
          email: collection.email,
          islogged: "true",
          id: collection._id,
          favs: collection.favs
        });
      }else{
        return res.send({
          success: false,
          message: 'Error: Email and Pass Dont Match Teacher'
        });
       
      }
    });
      
    }else{
      console.log("Teacher not found");
      return res.send({
        success: false,
        message: 'Error: Incorrect Teacher, Recheck Your Email'
      });
    }
  }
   
});
       }
       exports.assignQA = async function(req, res){
        var countValue = req.body;
        console.log("Quiz/Assign i recieved in nodejs (Backend)", countValue)
        var data = { 
          "type": countValue.type,
          "question1": countValue.question1, 
          "question2": countValue.question2,
          "teacher": countValue.teacher,
          "course": countValue.course,
          
          
        } 
        qaModel.create(data,function(err, collection){ 
          console.log("Collection: ", collection)
          if (err) throw err; 
          console.log("Quiz/Assign inserted Successfully"); 
          return res.send({
            message: 'Quiz/Assign inserted Successfully'
          });
                
      });
  
       }
       exports.getteacherCourses = async function(req, res){
        console.log("U are ", req.params.id);
        const filter = {"courseteacher":ObjectId(req.params.id)};
        const all = await courseModel.find(filter);
        console.log("all courses of teacher "+req.params.id+' :', all)
        res.json(all)
  
  
       }
       exports.assignedQAs = async function(req, res){
        console.log("Email: ", req.params.email)
        const filter = {email:req.params.email};
        const all = await teacherModel.findOne(filter);
        console.log(all._id)
        const all2= await qaModel.find({teacher: all._id}).populate('teacher course')
        console.log(all2)
        res.json(all2)
  
       }
       
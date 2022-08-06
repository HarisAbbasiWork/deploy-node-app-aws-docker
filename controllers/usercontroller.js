var userModel = require('../models/usermodel')
const bcrypt = require("bcrypt")
var ObjectId = require('mongodb').ObjectID;
const saltRounds = 10;
const coursemodel = require('../models/coursemodel');
var qaModel = require('../models/quizassignmodel')
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
//I used an mlab Sandbox DB. Substitute the details with your own
const url = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.9zwax.mongodb.net/${process.env.DB_NAME}?retryWrites=true`;
const dbName = process.env.DB_NAME;

let storage = new GridFsStorage({
  url: `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.9zwax.mongodb.net/${process.env.DB_NAME}?retryWrites=true`,
  file: (req, file) => {
    return {
      bucketName: 'images',       //Setting collection name, default name is fs
      filename: file.originalname     //Setting file name to original name of file
    }
  }
});

let upload = null;

storage.on('connection', (db) => {
  console.log("connected.. ");
  //Setting up upload for a single file
  upload = multer({
    storage: storage
  }).single('file1');

});
async function getCourses(req, res) {
  const filter = {};
  const all = await coursemodel.find(filter).populate('courseteacher');
  res.json(all)

}
async function logout(req, res) {
  console.log("logging out")
  req.logout();
  res.redirect("/");
}
async function mongofile(req, res) {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ title: 'Uploaded Error', message: 'File could not be uploaded', error: err });
    }
    res.status(200).json({ title: 'Uploaded', message: `File ${req.file.filename} has been uploaded!` });
  });
};
async function getuserCourses(req, res) {
  const filter = { email: req.params.email };
  const all = await userModel.findOne(filter);
  console.log(all.courses)
  res.json(all.courses)

}
async function getusercoursesTeachers(req, res) {
  const filter = { email: req.params.email };
  const all = await userModel.findOne(filter);
  console.log(all.courses)
  const all2 = await coursemodel.find({ _id: { $in: all.courses } }, { courseteacher: 1, _id: 0 }).populate('courseteacher')
  console.log(all2)
  res.json(all2)
}

async function getusercoursesDetails(req, res) {
  const filter = { email: req.params.email };
  const all = await userModel.findOne(filter);
  console.log(all.courses)
  const all2 = await coursemodel.find({ _id: { $in: all.courses } }).populate('courseteacher')
  console.log(all2)
  res.json(all2)

}


async function enrollcourse(req, res) {
  var userandcourse = req.body;
  userModel.findOne({ "email": req.body.useremail }, async function (err, creden) {
    creden.courses.push(req.body.id);
    creden.save()


  });
  return res.send({
    message: 'Enrolled In Course'
  });

}


async function signup(req, res) {
  var countValue = req.body;
  console.log("CountValue is", countValue.email, countValue.fname, countValue.lname);
  userModel.findOne({ email: countValue.email }, function (err, user) {
    if (user) return res.status(400).json({ auth: false, message: "Email Already Exits" });
    bcrypt.hash(req.body.pass, saltRounds, async (err, hash) => {
      var data = {
        "firstname": countValue.fname,
        "lastname": countValue.lname,
        "email": countValue.email,
        "password": hash




      }
      console.log("HashedPwd: ", hash)
      userModel.create(data, function (err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");
        res.status(400).json({ auth: true, message: "You are now a registered student please login" });

      });
    });
  });
}
async function signin(req, res) {
  var countValue = req.body;
  console.log("U are ", countValue.email);

  userModel.findOne({ email: countValue.email }, function (err, collection) {
    if (err) {
      console.log("Invalid Student");
      return res.send({
        success: false,
        message: 'Student not exists'
      });
    } else {

      if (collection != null) {
        console.log("Student found");
        bcrypt.compare(countValue.pass, collection.password, function (err, resi) {
          console.log(resi)
          if (resi === true) {
            console.log("Correct details found");
            console.log(collection.firstname + countValue.email + collection._id)
            const id = collection._id
            /*var token = jwt.sign(id, "jwtsecret",{
              expiresIn:3000,
    
            });*/
            req.session.save(function(){
              //res.redirect('/secretPage');
            })
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
          } else {
            return res.send({
              success: false,
              message: 'Error: Email and Pass Dont Match'
            });

          }
        });

      } else {
        console.log("Student not found");
        return res.send({
          success: false,
          message: 'Error: Incorrect Student, Recheck Your Email'
        });
      }
    }

  });
}
async function myQuizes(req, res) {
  console.log("Email: ", req.params.email)
  const filter = { email: req.params.email };
  const all = await userModel.findOne(filter);
  console.log(all.courses)
  const all2 = await qaModel.find({ course: { $in: all.courses } }).populate('teacher course')
  console.log(all2)
  res.json(all2)
}
module.exports = {
  getCourses,
  logout,
  getuserCourses,
  getusercoursesTeachers,
  getusercoursesDetails,
  enrollcourse,
  signup,
  signin,
  myQuizes,
  mongofile
};
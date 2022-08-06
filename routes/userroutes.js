var express = require('express');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
var userModel = require('../models/usermodel')
const connectEnsureLogin = require('connect-ensure-login');
const bcrypt = require("bcrypt")
passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log("username", username, "password", password)
    userModel.findOne({ email: username }, async function (err, user) {
      if (!user) {
        return done(null, {
          success: false,
          message: "userdontexists"
        });
      }
      console.log(password, user.password)
      const responsee = await bcrypt.compare(password, user.password)
      console.log(responsee)
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (responsee) {
        console.log("pass equal"); return done(null, {
          user: user,
          success: true
        });
      } else {
        console.log("pass not equal"); return done(null, {
          success: false,
          message: "email and password dont match"
        });
      }

    });
  }
));
var router = express.Router();
var user_controller = require('../controllers/usercontroller');
function isLoggedIn(req, res, next) {
  console.log("req.isAuthenticated() ", req.isAuthenticated())
  if (req.isAuthenticated()) return next();
  res.send({
    message: "you need to be logged in"
  });
}

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users managing API
 */

/**
 * @swagger
 * /getcourses:
 *  get:
 *    tags: [Users]
 *    description: use to get all courses
 *    responses:
 *       '200':
 *         description: A successful request
 */
router.get('/getcourses', isLoggedIn, user_controller.getCourses)
router.post('/sign-up', user_controller.signup)
router.post('/sign-in', user_controller.signin)
/**
* @swagger
* /enrollcourse:
*  post:
*    tags: [Users]
*    description: use to enroll in course
*    responses:
*       '200':
*         description: A successful request
*/
router.post('/enrollcourse', user_controller.enrollcourse)
router.get('/getusercourses/:email', isLoggedIn, user_controller.getuserCourses)
router.get('/getusercoursesteachers/:email', isLoggedIn, user_controller.getusercoursesTeachers)
router.get('/getusercoursesdetails/:email', user_controller.getusercoursesDetails)
router.get('/myquizes/:email', user_controller.myQuizes)
router.get('/logout', user_controller.logout)
router.post('/mongofile', user_controller.mongofile)
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log(err, user, info)
    if (user.success) {
      res.send({
        user: user.user
      })
    } else {
      res.send({
        message: user.message
      })
    }

  })(req, res, next)
});
passport.serializeUser(function (user, done) {
  console.log("user ",user)
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  userModel.findById(id, function (err, user) {
    done(err, user);
  });
});
module.exports = router;

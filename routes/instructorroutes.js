var express = require('express');
var router = express.Router();
var instructor_controller = require('../controllers/instructorcontroller');          
           router.post('/Instructorsign-in', instructor_controller.signin)
           router.post('/createinstructor', instructor_controller.createinstructor)
           router.post('/addcourse', instructor_controller.addcourse)
           module.exports = router;

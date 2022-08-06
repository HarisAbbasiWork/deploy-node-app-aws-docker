var express = require('express');
var router = express.Router();
var teacher_controller = require('../controllers/teachercontroller');
           /**
             * @swagger
             * tags:
             *   name: Teachers
             *   description: The Users managing API
             */
           router.post('/teachersign-up', teacher_controller.signup)
           router.post('/teachersign-in', teacher_controller.signin)
           /**
         * @swagger
         * /getteachers:
         *  get:
         *    tags: [Teachers]
         *    description: use to get all teachers
         *    responses:
         *       '200':
         *         description: A successful request
         */
           router.get('/getteachers',teacher_controller.getteachers)
           /**
         * @swagger
         * /getQA:
         *  get:
         *    tags: [Teachers]
         *    description: use to get all QA affliated with teacher
         *    responses:
         *       '200':
         *         description: A successful request
         */
           router.get('/getQA',teacher_controller.getQA)
           router.post('/assignqa',teacher_controller.assignQA)
           /**
         * @swagger
         * /getteachercourses/{id}:
         *  get:
         *    tags: [Teachers]
         *    description: use to get all cources affliated with teacher
         *    responses:
         *       '200':
         *         description: A successful request
         *       '404':
         *         description: Courses not found
         */
           router.get('/getteachercourses/:id',teacher_controller.getteacherCourses)
           /**
         * @swagger
         * /assignedQAs/:email:
         *  get:
         *    tags: [Teachers]
         *    description: use to get all QAs assigned by teacher
         *    responses:
         *        200:
         *         description: A successful request
         *        404:
         *          description: The QA was not found
         */
           router.get('/assignedQAs/:email', teacher_controller.assignedQAs)
           module.exports = router;
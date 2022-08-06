var express = require('express');
var router = express.Router();
var task_controller = require('../controllers/taskcontroller');

    router.post('/addtask',task_controller.addcomment)    
    router.get('/gettasks',task_controller.gettasks)  
    router.post('/updatestatus',task_controller.updatestatus)
    router.get('/taskscount',task_controller.taskscount)    
    module.exports = router;

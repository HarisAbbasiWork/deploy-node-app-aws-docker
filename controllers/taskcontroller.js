var ObjectId = require('mongodb').ObjectID;

var taskModel = require('../models/Task')
exports.addcomment =async function(req,res){ 
    console.log("Task: ", req.body.task)
    var data = { 
      "task": req.body.task,
      "status":"Pending"
      
    } 
    await taskModel.create(data, async function(err, collection){ 
      if (err) throw err; 
      
      console.log("Task inserted Successfully"); 
      console.log("okay send response")
      return res.send({
        success:true
      })
            
  });
  
    
  
  
  
  
      
  }
  exports.gettasks =async function(req,res){ 
    const filter = {};
    const all = await taskModel.find(filter);
    console.log(all)
    res.json(all)      
  }
  exports.updatestatus =async function(req,res){ 
    await taskModel.findOne({"_id": ObjectId(req.body.todoid)}, async function(err, todo) {
        console.log("todo Found",todo)
        if(req.body.status=="Pending"){
            todo.status="Done"
        }else{
            todo.status="Pending"
        }
        
        return await todo.save()
      });   
      console.log("Task Status Updated") 
      const filter = {};
      const all = await taskModel.find(filter);
      console.log(all)
      res.json(all) 
  }
  exports.taskscount =async function(req,res){ 
    await taskModel.aggregate([
        { $group: { _id: "$status", count: { $sum:1 }} }
     ]).then(async (result) => {
         console.log(result)
         res.json({
             result,
             all:result.map(item => item.count).reduce((prev, curr) => prev + curr, 0)
         })
     })
  }
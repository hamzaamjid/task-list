var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://hamza:hamza786@ds137763.mlab.com:37763/mytasklist_hamza',['tasks']);

// this grabs the collection of tasks (all of them)
router.get('/tasks',function(req,res,next) {
    db.tasks.find(function(err,tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);

    });

});
// this will grab a single task from the db 


router.get('/tasks/:id',function(req,res,next) {
    db.tasks.findOne({_id: mongojs.ObjectID(req.params.id)},function(err,task){
        if(err){
            res.send(err);
        }
        res.json(task);

    });

});
// if we need to save the task
router.post('/task', function(req,res, next) {
    var task = req.body;
    if(!task.title ||  (task.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }else {
        db.tasks.save(task,function(err,task){
            if(err){
                res.send(err);
            }
            res.json(tasks);
    
        });

            
    }



})


// deleting the task


router.delete('/tasks/:id',function(req,res,next) {
    db.tasks.remove({_id: mongojs.ObjectID(req.params.id)},updTask, {} ,function(err,task){
        if(err){
            res.send(err);
        }
        res.json(task);

    });


});


// update some task
router.put('/tasks/:id',function(req,res,next) {
    var task = req.body;
    var updTask = {}; 

    if (task.isDone) {
        updTask.isDone = task.isDone;

    }
    if (task.title) {
        updTask.title = task.title;
        
    }
    if (!updTask) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        })
    }else {
        db.tasks.update({_id: mongojs.ObjectID(req.params.id)},function(err,task){
            if(err){
                res.send(err);
            }
            res.json(task);
    
        });
    

    }


});



module.exports = router;

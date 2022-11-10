const express=require('express');
const fs=require('fs');

// Port number 
const port=8000;

//connceting to the database
const db=require('./config/mongoose');
const Todo=require('./models/todo');

// Creating object of express
const app=express();

const path = require('path');

// Decoding url
app.use(express.urlencoded());


//setting view engine
app.set('view engine','ejs');

// Set path of views directory
app.set('views',path.join(__dirname,'views'));

// for accessing css files from assets
app.use(express.static('assets'));

// Home page
app.get('/',function(req,res){
    

    Todo.find({},function(err,todolist){

        if(err){
            console.log('Error',err);
            return;
        }

        return res.render('home', {
            title:'TODO APP',
            todo_list:todolist
        });

    });

});


// Creating a task in the database
app.post('/create-task', function (req, res) {
    Todo.create({
            description: req.body.description,
            category: req.body.category,
            date: req.body.date
        }, function (err, newtodo) {
            if (err) {
                console.log('error in creating task', err);
                return;
            }
            return res.redirect('back');
        }
    )
});

// Deleting single task from the database
app.get('/delete_todo_single',function(req,res){

    let id=req.query.id;
    Todo.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting task from db');
            return;
        }

        return res.redirect('back');
    });
    
});

// Deleting multiple tasks from the database
app.post('/delete-task',function(req,res){

    let ids = req.body.task;
    // if single task is to be deleted
    if (typeof(ids) == "string") {
        Todo.findByIdAndDelete(ids, function(err) {
            if (err) { 
                console.log("error in deleting"); 
                return; 
            }
        });
    } else {    
        // if multiple task is to be deleted
        for (let i = 0; i < ids.length; i++) {
            Todo.findByIdAndDelete(ids[i], function (err) {
                if (err) { 
                    console.log("error in deleting");
                    return; 
                }
            });
        }
    }
    return res.redirect('back');

});

// Server
app.listen(port,function(err){
    if(err){
        console.log('Error in running the server');
        return;
    }

    console.log('Server is up and running on port:',port);    

});
//Schema

const mongoose=require('mongoose');

var ToDoListSchema = new mongoose.Schema({

    description: {
        type: String,
        require: true
    },

    category: {
        type: String,
        require: true
    },

    date: {
        type: Date,
        require: true
    }

});

const Todo=mongoose.model('ToDoListData',ToDoListSchema);

module.exports=Todo;
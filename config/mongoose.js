// require mongoose
const mongoose = require('mongoose');

//connectig to the database
mongoose.connect('mongodb://localhost/To_Do_List');

//acquiring the connection to check if it is successful or not
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,'Error in connecting to the database'));

//working fine
db.once('open',function(){
    console.log('successfully connected to the database');
})


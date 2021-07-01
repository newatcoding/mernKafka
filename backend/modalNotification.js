let mongoose=require('mongoose');
let db = require('./database');
// create an schema
let userSchema = new mongoose.Schema({
            id:String,
            Name: String,
            age:String,
            message:String,
            type:String
            
        });
module.exports=mongoose.model("Notifications",userSchema,"Notifications");
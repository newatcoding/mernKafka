let mongoose=require('mongoose');
let db = require('./database');
// create an schema
let userSchema = new mongoose.Schema({
            id:String,
            name: String,
            age:String,
            
        });
module.exports=mongoose.model("Users",userSchema,"Users");
        
// module.exports={
//      fetchData:function(callback){
//         var userData=userTable.find({});
//         userData.exec(function(err, data){
//             if(err) throw err;
//             return callback(data);
//         })
        
//      }
// }
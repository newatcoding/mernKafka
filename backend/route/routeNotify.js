const express = require('express');
const router=express.Router();
const notifications=require('../modalNotification');
const mongoose=require('mongoose');
const DB='mongodb+srv://newatcoding:newatcoding@cluster0.ilmvp.mongodb.net/PaymentnNotification?retryWrites=true&w=majority';
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

mongoose.Promise=global.Promise;
mongoose.connect(DB,
    {   useNewUrlParser: true,
        useCreateIndex:true,
        useUnifiedTopology: true,
        useFindAndModify:false
    }).catch((err)=>{
            console.log(err);
});


router.get('/',(req,res,next)=>{
    let arr=[];
    arr.push({"/getNotifications": "for getting Histoy "});
    arr.push( { "/postNotifications" :"for adding Current Occurences"});
    res.json(arr);
})
    
router.get('/getNotifications',(req,res,next) => {
    // console.log('get all users');
    notifications.find({}).exec((err,data)=>{
        if(err){
            res.json(err);
        }else{
            //res.json(data);
            res.json(data);
        }
    })
});

router.post('/postNotifications', urlencodedParser, function (req, res) {
    const data=req.body;
    const newUser=new notifications(data);
    
    newUser.save((err)=>{
        if(err){
            res.status(500).json({msg:'Sorry, internal Server errors'});
        }else{
            res.json({msg:'your data has been saved'})
        }
    });
})
 
router.delete('/deleteNotification/:id',(req,res,next) =>{
    notifications.findByIdAndRemove({id:req.params.id}).then((deteltedUser)=>{
        res.json(deletedUser);
    }).catch((err)=>{
        res.json(err);
    })
});
 
router.delete('/deleteAllNotifications',(req,res,next)=>{
    notifications.deleteMany({},()=>{
        console.log('All Deleted notifications');
    });
    res.json({msg:'All Notifications Removed'})
});
module.exports=router;


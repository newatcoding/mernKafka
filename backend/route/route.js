const express = require('express');
const router=express.Router();
const model=require('../model');
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
    arr.push({"/getUsers": "for getting All users"});
    arr.push( { "/postUsers" :"for adding Users"});
    res.send( arr);
})
    
router.get('/getUsers',(req,res,next) => {
    // console.log('get all users');
    model.find({}).exec((err,data)=>{
        if(err){
            // console.log('error users not found');
            res.send(err);
        }else{
            // console.log(data);
            //res.json(data);
            res.send(data);
        }
    })
});

router.post('/postUsers', urlencodedParser, async function (req, res) {
    //  console.log(req.body);
    const data=await req.body;
    const newUser=await new model(data);
    
    await newUser.save((err)=>{
        if(err){
            res.status(500).json({msg:'Sorry, internal Server errors'});
        }else{
            res.json({msg:'your data has been saved'})
        }
    });
    // res.send(post);
    // let newUser=new Pos
    // console.log(res);
//   res.send('POST request to the homepage')
});

router.delete('/deleteUser/:id',(req,res,next) =>{
    console.log(req.params.id.toString())
    
    model.findByIdAndRemove({id:`${req.params.id}`}).then((deletedUser)=>{
        console.log(deletedUser);
        res.send(deletedUser);
    }).catch((err)=>{
        res.json(err);
    })
});
 
router.delete('/deleteAllUsers',(req,res,next)=>{
    model.deleteMany({},()=>{
        console.log('All Deleted');
    });

    res.json({msg:'All Users Removed'})
});
module.exports=router;


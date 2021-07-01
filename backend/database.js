const mongoose=require('mongoose');

const DB='mongodb+srv://newatcoding:newatcoding@cluster0.ilmvp.mongodb.net/PaymentnNotification?retryWrites=true&w=majority';

mongoose.connect(DB,
    {   useNewUrlParser: true,
        useCreateIndex:true,
        useUnifiedTopology: true,
        useFindAndModify:false
    }).then((data)=>{
            // console.log(data);
        }).catch((err)=>{
            // console.log(err);
});

var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));

module.exports = conn;

let fetchModel= require('./model');
module.exports={
    fetchData:function(req, res){
      fetchModel.fetchData(function(data){
          res.render('user-table',{userData:data});
      })
    }
}
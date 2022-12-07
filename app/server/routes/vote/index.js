const express =require('express')
const app=express();
const jwt = require('jsonwebtoken');
const { db } = require('../../utils/db');

var token ='';
app.get('/:id',(req,res)=>{
    let sql = "select * from Parties"
     token = req.path.slice(1)
    // console.log(token)
    db.query(sql,(err,result)=>{
        if(err){
            return res.json({"success":false,"message":"Something went wrong"})
        }
        // console.log(result)
        return res.render('voters',{results:result})
    })
})


app.post('/',(req,res)=>{
    try {
        if(token.length==0) throw "Token not found"
        const data = jwt.verify(token,'ANOTHER SECRET');
        console.log(data)
        if(!data['voter_id'] || !data['date_of_birth']) {
           return res.render('error',{ms:"Invalid data"})
            // throw "Invalid token"
        
        }
        db.query("SELECT * FROM elections WHERE id="+data['voter_id'],(err,result)=>{
            // if(err) throw "Something went wrong"
            // if(result.length==0) throw "No such voter found"
            // if(result[0]['date_of_birth']!=data['date_of_birth']) throw "Invalid token"
            if(result[0]['y_2022']==1) return res.render('error',{ms:"You have already voted"})

        })
    const party_id=req.body.party_id
    
  
    let sql='UPDATE Parties SET count=count+1 WHERE id='+party_id; 
    // console.log(sql)
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
            return res.render('error')
        }
        // console.log(result);

            return res.render('Success')

        // return res.json({"Success":false,"message":"Something went wrong!"})
    })
}
    catch (err) {
        console.log(err)
        res.render('error')
        // res.json({"success":false,"message":"Invalid token"})
    }
});

module.exports = app;
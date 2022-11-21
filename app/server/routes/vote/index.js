const express =require('express')
const app=express();
const { db } = require('../../utils/db');


app.get('/all-parties',(req,res)=>{
    let sql = "select * from Parties"
    db.query(sql,(err,result)=>{
        if(err){
            return res.send("Idk what happened!")
        }
        return res.json(result)
    })
})


app.post('/',(req,res)=>{
    
    let sql='UPDATE Parties SET count=count+1 WHERE id='+req.body.id; 
    console.log(sql)
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
            // throw err;

            return res.json({"Success":false,"message":"Something went wrong!"})
        }
        console.log(result);
        return res.json({"Success":true,"message":"Voter voted successfully!"})
    })
});

module.exports = app;
const express =require('express')
const app=express();
const { db } = require('../../utils/db');


app.get('/all-parties',(req,res)=>{
    let sql = "select * from Parties"
    db.query(sql,(err,result)=>{
        if(err){
            return res.send({"Success":true,"message":"Idk what happened!"})
        }
        // console.log(result)
        return res.render('voters',{results:result})
    })
})


app.post('/',(req,res)=>{
    const   {party_id,voter_id} = req.body
    let sql='UPDATE Parties SET count=count+1 WHERE id='+party_id; 
    console.log(sql)
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
            return res.json({"Success":false,"message":"Invalid party!"})
        }
        console.log(result);
        db.query("UPDATE Voters SET voted = 1 WHERE id="+voter_id,(err,result)=>{
            if(err){
                console.log(err);
                return res.json({"Success":false,"message":"Something went wrong with Voter!"})
            }
            else
            return res.json({"Success":true,"message":"Voter voted successfully!"})
        })
        // return res.json({"Success":false,"message":"Something went wrong!"})
    })
});

module.exports = app;
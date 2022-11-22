const express =require('express')
const app=express();
const { db } = require('../../utils/db');


app.get('/',(req,res)=>{
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
    // const  {party_id,voter_id} = req.body
    const party_id=req.body.party_id

    //temporaroty making it hard coded we can make it 
    const voter_id=1000
    let sql='UPDATE Parties SET count=count+1 WHERE id='+party_id; 
    console.log(sql)
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
            return res.render('error')
        }
        // console.log(result);
        db.query("UPDATE Voters SET voted = 1 WHERE id="+voter_id,(err,result)=>{
            if(err){
                console.log(err);
                return res.render('error')
            }
            
            return res.render('Success')
        })
        // return res.json({"Success":false,"message":"Something went wrong!"})
    })
});

module.exports = app;
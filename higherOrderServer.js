const express=require('express')
const app =  express();
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const {db,connect} = require('./app/server/utils/db')

app.use(express.json())
app.use(express.urlencoded({extended:true}))


// connect it re 
connect();




app.post('/api/validate',(req,res)=>{
    const {fingerprint} = req.body;
    const sql = "SELECT * FROM voter_info WHERE finegrprint = '" + fingerprint+"'";
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
            return res.json({"success":false,"message":"User validation failed!!!"})
        }
        if(result.length){
            const token = jwt.sign(result[0].id,'SECRET_KEY')
            return res.json({"success":true,"encrypted_token":token});
            // console.log(result[0].id)
        }

        return res.json({"success":false,"message":"User validation failed!!!"})
    })
})


app.listen(3000,(req,res)=>{
    console.log("Connected to port 3000")
})
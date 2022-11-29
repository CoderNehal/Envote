const express=require('express')
const app =  express();
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const {db,connect} = require('./app/server/utils/db');
const { encrypt } = require('./app/server/services/auth');
const encryption = require('./encryption');

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.set('view engine','ejs')

// connect it re 
connect();

app.get('/add-voter',(req,res)=>{
    res.render("login")
})

app.post('/add-voter',(req,res)=>{
    const id=req.body.id
    const name=req.body.name
    const location=req.body.location
    const dob=req.body.dob
    const gender=req.body.gender
    const finegrprint=encryption(req.body.fingerprint)
    
    const q="INSERT INTO voter_info values("+id+",'"+name+"','"+location+"','"+dob+"','"+gender+"','"+finegrprint+"')";
    db.query(q,(err,result)=>{
        // console.log(err)
            if(err)
                return res.json({"failure":err})
            return res.json({"success":result})
        })
    //console.log(q)

    // return res.json({"gt":false})
})



app.post('/api/validate',(req,res)=>{
    const {fingerprint} = encryption(req.body);
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
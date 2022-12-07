const express=require('express')
const app =  express();
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const {db,connect} = require('./app/server/utils/db');
const { encrypt } = require('./app/server/services/auth');
const encryption = require('./encryption');
const cors = require('cors');
// dotenv
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.set('view engine','ejs')

app.use(cors())


// connect it re 
connect();
let year=new Date().getFullYear();
let result=[]
let statistics
app.get('/add-voter',(req,res)=>{
    
    
    res.render("login")
})

app.post('/add-voter',(req,res)=>{
    console.log(req.body)
    const id=req.body.id
    const name=req.body.name
    const location=req.body.location
    const dob=req.body.dob
    const gender=req.body.gender
    const finegrprint=encryption(req.body.fingerprint)
    // console.log(gender)
    const q="INSERT INTO voter_info values("+id+",'"+name+"','"+location+"','"+dob+"','"+gender+"','"+finegrprint+"')";

    db.query(q,(err,result)=>{
        
        if(err)
            res.json({"failure":err});
        else {
            const q1="INSERT INTO elections values("+id+",0)";
            db.query(q1,(er,re)=>{
                if(er)
               return res.json({"failure":er})
                return res.json({"success":result})
            })
            
        }
           
        })
        
})
app.get("/results",async (req,res)=>{
    const q="SELECT * from elections INNER JOIN voter_info on elections.id=voter_info.id";
      db.query(q,(err,resu)=>{
        if(err)
            return result = [];
            result = resu;
            // console.log(result)
        })
        
        // console.log(result)
        res.render("results")
    })

app.use("/api/results",(req,res)=>{
    const q="SELECT * from  Parties"
    db.query(q,(err,resu)=>{
        if(err)
            {
                //console.log(err);
                return res.json({"failure":err})
            }
    //    console.log(resu)
        return res.status(200).json({"success":resu})
    })
});

app.use("/api/gender",(req,res)=>{
    let c=0,k=result.length;
    //console.log(result)
     result.filter((item)=> 
    {
        if(item.gender=='M' || item.gender=='Male' || item.gender=='male')
            c++;

    })
    // console.log(c);
    return res.json({"data":[c,k-c]});
})


app.use("/api/year",(req,res)=>{
let young=0,mid_age=0,old_age=0;
})


app.post('/api/validate',(req,res)=>{
    console.log("Fngerprint",req.body.fingerprint)
    const fingerprint = encryption(req.body.fingerprint);
    console.log(fingerprint)
    
    const sql = "SELECT * FROM voter_info WHERE fingerprint = '" + fingerprint+"'";
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
            return res.json({"failure":true,"message":"UserOK failed!!!"})
        }
        console.log(result)
        if(result.length){
            const id  = result[0].id;
            const dob = result[0].DOB;
            const token = jwt.sign({id,dob},'SECRET KEY')
            return res.json({"success":true,"encrypted_token":token});
            // console.log(result[0].id)
        }
// 
        return res.json({"failure":true,"message":"User validation failed!!!"})
    })

    // return res.json({"success":true});
})


//Main page of the website
app.use("/",(req,res)=>{
    res.render("home");
})


app.listen(5000,(req,res)=>{
    console.log("Connected to port 5000")
})
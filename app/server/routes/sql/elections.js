const {db} = require('../../utils/db')
const app = require('express')()
//Add voter to election table

app.use('/add-voter',(req,res)=>{
    const {voter_id} = req.body;
    // console.log("Opp")
    // return res.send("Op")
    db.query("INSERT INTO elections VALUES(0,"+voter_id+")",(err,result)=>{
        if(err){
             console.log(err);
           if(err.errno==1452){
            return res.status(401).send({"success":false,"message":"Voter is not registered!"})
           }
        }
        if(err?.errno==1062) {
            return res.status(401).send({"success":false,"message":"Voter has been already in the database!"})
        }
        return res.json({"success":true,"message":"Voter inserted into database!"})
    })
})

app.post('/show-table',(req,res)=>{
    const { name} = req.body
    db.query("SELECT * FROM "+ name,(err,result)=>{
        if(err){
            console.log(err);
            return res.send("Error")
        }
        console.log(result)
        const data = [];
        result.forEach(element => {
            data.push(element);
        });
        return res.json({"success":true,"message":"data fetched successfully!","data":data})
    })
})

module.exports = app;
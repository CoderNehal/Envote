const express = require('express');
const app = express();
const mysql = require('mysql');

//Add the static files
app.use(express.static('public'));

// dotenv
require('dotenv').config()
const port = 4000;

app.set('view engine','ejs')

// user imports
const {db,connect} = require('./utils/db')

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create connection
connect();

// Use this to create a datAabse
// Create Database
app.get('/create-databse', (req, res) => {
    let sql = 'create database voting';
    db.query
        (sql, (err, result) => {
            if (err) {
                console.log(err);
                throw err
            };
            console.log(result);
            res.send('Table created');
        });
});

// Use this to create table
// Create table

app.get('/create-table', (req, res) => {
    let sql = 'CREATE OR UPDATE TABLE Voters(id int, name VARCHAR(255), PRIMARY KEY(id), voted BOOLEAN, ADHAR_NO int)';

    db.query
        (sql, (err, result) => {
            if (err) {
                console.log(err);
                throw err
            };
            console.log(result);
            db.query(sql,(err,result)=>{
                if(err)
                {
                    console.log(err);
                    throw err;
                };

            })
            res.send('Table created');
        });
});

app.use('/drop-table',(req,res)=>{
    const {name} =  req.body;
    db.query(`drop table ${name}`,(err,result)=>{
        if(err){
            console.log(err);
            return res.send("nahi ho raha hai bhai")
        }
        return res.send("Table deleted successfully!")
    })
})


// create parties table
app.use('/create-partites',(req,res)=>{
    let sql='CREATE TABLE Parties(id int, name VARCHAR(255),img VARCHAR(255),leader VARCHAR(255),count int,PRIMARY KEY(id))';
    db.query
    (sql, (err, result) => {
        if (err) {
            console.log(err);
            throw err
        };
        console.log(result);
        db.query(sql,(err,result)=>{
            if(err)
            {
                console.log(err);
                throw err;
            };

        })
        res.send('Table created');
    });
})

//Use this to insert the data into table
app.use('/insert-data',(req,res)=>{

    // const {name,fields} =  req.body;
    let sql='INSERT INTO Parties values('+req.body.id+',"'+req.body.name+'","'+req.body.img+'","'+req.body.leader+'",0)';
    // let sql =  'INSERT INTO'+ name + 'VALUES('
    // for(let key of Object.keys(fields)){
    //     sql+=(fielsds[key]);
        
    // }

    db.query(sql,(err,result)=>{
        if(err)
        {
            console.log(err);
            throw err
        }
        console.log(result);
    })
    res.send("Data inserted")
});

// Use this to insert the data into election table
app.use('/insert-election',(req,res)=>{
    const {id} =  req.body;
 db.query("INSERT INTO election VALUES("+id+",0)",(err,result)=>{
    if(err)
    {
        console.log(err);
        throw err
    }
    // console.log(result);
    return res.send("Data inserted")    
 })
})

app.use('/insert-data-p',(req,res)=>{
    
    let sql='INSERT INTO Parties values('+req.body.id+',"'+req.body.name+'","'+req.body.img+'","'+req.body.leader+'",0)';
    db.query(sql,(err,result)=>{
        if(err)
        {
            console.log(err);
            throw err
        }
        console.log(result);
    })
    res.send("Data inserted")
});
// tracker
app.use('*', (req, res, next) => {
    console.log("=>", req.method, req.url);
    next();
})

app.get("/",(req,res)=>{
    // const {encrypted_key} = req.body;
    const encrypted_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2b3Rlcl9pZCI6MywiZGF0ZV9vZl9iaXJ0aCI6IjIwMDItMDgtMDciLCJpYXQiOjE2Njk2OTgxNjh9.hAsnFpIRPmXiGKX6FgZTIiRaU4Y3SYSPJxwg95jH528"
    res.render('login',{encrypted_key})
})

app.use('/error',(req,res)=>{
    res.render('error')
})

// All Routes imporrted here
app.use('/', require('./routes'));





// For other routes
app.use('*', (req, res) => {
    res.render('error404');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
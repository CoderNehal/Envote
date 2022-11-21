const express = require('express');
const app = express();
const mysql = require('mysql');



// dotenv
require('dotenv').config()
const port = 4000;


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
    let sql = 'CREATE TABLE Voters1(id int, name VARCHAR(255), PRIMARY KEY(id), voted BOOLEAN)';
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

app.use('/delete-table',(req,res)=>{
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
    let sql='CREATE TABLE Parties(id int, name VARCHAR(255),count int, PRIMARY KEY(id))';
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
    
    let sql='INSERT INTO Voters values('+req.body.id+',"'+req.body.name+'",0)';
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



// All Routes imporrted here
app.use('/', require('./routes'));



// For other routes
app.use('*', (req, res) => {
    res.send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
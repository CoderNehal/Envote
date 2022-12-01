const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
//Add the static files
app.use(express.static('public'));


// dotenv
require('dotenv').config()
const port = 4000;
app.use(cors());
app.set('view engine','ejs')

// user imports
const {db,connect} = require('./utils/db')

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create connection
connect();

// tracker
app.use('*', (req, res, next) => {
    console.log("=>", req.method, req.url);
    next();
})

app.get("/",(req,res)=>{
    // const {encrypted_key} = req.body;
    
    res.render('fingerprint')
})

app.get("/login",(req,res)=>{
    // res.render("fingerprint");
    const encrypted_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQ1NiwiZG9iIjoiMjAwNC0xMC0wN1QxODozMDowMC4wMDBaIiwiaWF0IjoxNjY5ODg3NDcwfQ.5-cf2jbaYS2iiW2-eo3_tv99x7zd1DTw1zvsNaqRsxo"
    const token =  req.query.token;
    return res.render("login",{encrypted_key})
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
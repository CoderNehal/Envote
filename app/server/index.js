const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const { imageHash } = require('image-hash');
const multer = require("multer");
const path = require('path');
const fs = require('fs');
//Add the static files
app.use(express.static('public'));


// dotenv
require('dotenv').config()
const port = 4000;
app.use(cors());
app.set('view engine', 'ejs')

// user imports
const { db, connect } = require('./utils/db')

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create connection
connect();


// storage engine 

const storage = multer.diskStorage({
    destination: './public/upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 10
    // }
})
// tracker
app.use('*', (req, res, next) => {
    console.log("=>", req.method, req.url);
    next();
})

app.get("/", (req, res) => {
    // const {encrypted_key} = req.body;

    res.render('fingerprint')
})

app.get("/login", (req, res) => {
    // res.render("fingerprint");
    // const encrypted_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQ1NiwiZG9iIjoiMjAwNC0xMC0wN1QxODozMDowMC4wMDBaIiwiaWF0IjoxNjY5ODg3NDcwfQ.5-cf2jbaYS2iiW2-eo3_tv99x7zd1DTw1zvsNaqRsxo"
    const encrypted_key = req.url.split("?")[1];
    console.log(encrypted_key)
    return res.render("login", { encrypted_key })
})
app.use('/error', (req, res) => {
    res.render('error')
})
app.post("/upload", upload.single('file'), (req, res) => {
    console.log("Hitting it")
    // res.json({
    //     success: 1,
    //     profile_url: `http://localhost:4000/upload/images/${req.file.filename}`
    // })
    imageHash(`http://localhost:4000/upload/images/${req.file.filename}`, 16, true, (error, data) => {
        if (error) throw error;
        console.log(data);
        var filename = __dirname + `/public/upload/images/${req.file.filename}`;
        var tempFile = fs.openSync(filename, 'r');
        fs.closeSync(tempFile);

        fs.unlinkSync(filename);
        return res.json(data)
    });
})
app.use('/imghash', (req, res) => {
    console.log(req.body)
    imageHash("https://cdn-icons-png.flaticon.com/512/1231/1231052.png", 16, true, (error, data) => {
        if (error) throw error;
        console.log(data);

        return res.send(data)
    });
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
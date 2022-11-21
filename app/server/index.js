const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 4000;


// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'voting'
});

// Connect
db.connect((err) => {
    if (err) {
        console.err('Error connecting to database');
        throw err;
    }
    console.log('Connected to database');

});


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
    let sql = 'CREATE TABLE Voters(id int, name VARCHAR(255), PRIMARY KEY(id), voted BOOLEAN)';
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
    console.log('Request made to: ', req.originalUrl);
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
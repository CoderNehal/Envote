const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 5000;


// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nehalughade',
    database: 'voting'
});

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});



app.use('/', (req, res) => {
    console.log("here and there")
    res.send("Hello World");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
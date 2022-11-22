const mysql =  require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nehalughade',
    database: 'voting'
});

// Connect

const connect = () =>{
db.connect((err) => {
    if (err) {
        console.log('Error connecting to database');
        throw err;
    }
    console.log('Connected to database');

});
}

module.exports= {
    db,
    connect
}
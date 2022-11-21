const mysql =  require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'voting'
});

// Connect

const connect = () =>{
db.connect((err) => {
    if (err) {
        console.err('Error connecting to database');
        throw err;
    }
    console.log('Connected to database');

});
}

module.exports= {
    db,
    connect
}
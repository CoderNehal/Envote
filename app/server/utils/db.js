const mysql =  require('mysql')
const password =  process.env.password;
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'voting'
});

// Connect

const connect = () =>{
db.connect((err) => {
    // console.log(process.env.password)
    if (err) {
       return  console.log('Error connecting to database');
        // throw err;
    }
    console.log('Connected to database');

});
}

module.exports= {
    db,
    connect
}
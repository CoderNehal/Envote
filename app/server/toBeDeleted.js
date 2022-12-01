
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
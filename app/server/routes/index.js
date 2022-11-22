const express = require('express');
const app = express();


//Middlewares
const verifyToken = require('./middlewares')



app.use('/auth', require('./auth'));
app.use('/vote',verifyToken, require('./vote'));



module.exports = app;
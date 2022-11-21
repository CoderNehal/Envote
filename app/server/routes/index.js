const express = require('express');
const app = express();



app.use('/auth', require('./auth'));
app.use('/vote', require('./vote'));



module.exports = app;
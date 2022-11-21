const express = require('express');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


// User imports


// Cotrollers
const {AuthController} = require('../../controllers')

app.post('/',AuthController);


module.exports = app;
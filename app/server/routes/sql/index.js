// const elections = require('./elections')
const app = require('express')()

app.use('/elections',require('./elections'))


module.exports = app;
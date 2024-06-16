const express = require('express')
const app = express()
const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log('Connected!'));

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})

module.exports=app;
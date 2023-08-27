
require('dotenv').config();
const db = require('./Utils/connectToDb');
const port = process.env.PORT || 5000
const express = require('express')
const app = express();
const cors = require('cors');
const morgan = require('morgan')

// Use these Codes If you want to dynamically generate Additional Tables as per your requirement

// const {CREATE_USERS_TABLE} = require('./Constants/Queries/Create');
// const {createAnyTable} = require('./Utils/CreateTables/CreateAllTables')

// createAnyTable(CREATE_USERS_TABLE,"users")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.listen(port , () => {
    console.log(`Server is runnning on PORT ${port}`)
})










require('dotenv').config();
const db = require('./Utils/connectToDb');
const port = process.env.PORT || 5000
const express = require('express')
const scheduleJobs = require('../Server/Schedulers/mainScheduler')
const app = express();
const cors = require('cors');
const morgan = require('morgan')
const authRoutes = require('./Routes/Auth/Auth');



// Use these Codes If you want to dynamically generate Additional Tables as per your requirement

// const {CREATE_USERS_TABLE} = require('./Constants/Queries/Create');
// const {createAnyTable} = require('./Utils/CreateTables/CreateAllTables')

// createAnyTable(CREATE_USERS_TABLE,"users")

// Setup Nodemailer



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

scheduleJobs()

app.use("/api" , authRoutes)


app.listen(port , () => {
    console.log(`Server is runnning on PORT ${port}`)
})










require('dotenv').config();
const db = require('./Utils/connectToDb');
const port = process.env.PORT || 5000
const express = require('express')
const scheduleJobs = require('../Server/Schedulers/mainScheduler')
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./Routes/Auth/Auth');
const blogRoutes = require('./Routes/Blogs/Blog');
const likeRoutes = require('./Routes/Likes/Like');
const commentRoutes = require('./Routes/Comments/Comment');
const connectionRoutes = require('./Routes/Connections/Connection');
const conversationRoutes = require('./Routes/Conversations/Conversation');
const chatGroupRoutes = require('./Routes/ChatGroups/ChatGroup');
const chatGroupParticipantsRoutes = require('./Routes/ChatGroupParticipants/ChatGroupParticipants');
const messagesRoutes = require('./Routes/Messages/Message')


// Use these Codes If you want to dynamically generate Additional Tables as per your requirement

// const {CREATE_USERS_TABLE} = require('./Constants/Queries/Create');
// const {createAnyTable} = require('./Utils/CreateTables/CreateAllTables')

// createAnyTable(CREATE_USERS_TABLE,"users")

// Setup Nodemailer



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

scheduleJobs()

// All Routes

app.use("/api",authRoutes)
app.use("/api",blogRoutes)
app.use("/api",likeRoutes)
app.use('/api',commentRoutes)
app.use('/api',connectionRoutes)
app.use('/api',conversationRoutes)
app.use('/api',chatGroupRoutes)
app.use('/api',chatGroupParticipantsRoutes)
app.use('/api',messagesRoutes)

app.listen(port , () => {
    console.log(`Server is runnning on PORT ${port}`)
})









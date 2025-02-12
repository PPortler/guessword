const express = require('express')
const cors = require('cors')
require('dotenv').config();
require('./config/database').connectDB;
const cookieParser = require('cookie-parser')

const app = express()

const corsOptions = {
    origin: process.env.CLIENT_DOMAIN,  // URL ของไคลเอนต์
    credentials: true,  // ส่งคุกกี้
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//api
const quizApi = require('./routes/quiz.route')
const userApi = require('./routes/user.route')
const authUser = require('./routes/auth_user')

app.route('/').get((req,res) => {
    return res.status(200).send(`server is running on port ${process.env.PORT}`)
})
app.use('/auth', authUser)
app.use('/api/quiz', quizApi)
app.use('/api/user', userApi)

module.exports = app;
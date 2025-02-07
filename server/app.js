const express = require('express')
const cors = require('cors')
require('dotenv').config();
require('./config/database').connectDB;

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//api
const quizApi = require('./routes/quiz.route')

app.use('/api/quiz', quizApi)

module.exports = app;
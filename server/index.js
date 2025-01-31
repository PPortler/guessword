const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.Promise = global.Promise; //ใช้สำหรับตั้งค่าระบบ Promise ที่ใช้ใน Mongoose (ไลบรารีสำหรับ MongoDB ใน Node.js) กำหนดให้ Mongoose ใช้ Promise ที่มาจาก JavaScript global แทนที่การใช้ Promise ของ Mongoose เอง
mongoose.connect(process.env.MONGODB)

    .then(() => { 
        console.log('mongoDB connect')
    }).catch((err) => {
        console.log(`error connect: ${err}`)
    })

//api
const quizApi = require('./routes/quiz.route')

app.use('/api/quiz', quizApi)

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
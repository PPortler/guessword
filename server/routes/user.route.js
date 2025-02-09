const express = require('express')
const userRoute = express.Router();
const Users = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

userRoute.route("/new_user").post(async (req, res) => {
    try {
        const { first_name, last_name, username, password } = req.body;
        if (!first_name, !last_name, !username, !password) {
            return res.status(400).send("All input is required")
        }

        const checkUser = await Users.findOne({ username })
        if (checkUser) {
            return res.status(409).send("User already exits. Please Login")
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({
            first_name,
            last_name,
            username: username.toLowerCase(),
            password: hashPassword
        })

        const token = jwt.sign(
            {
                user_id: user._id,
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: '2h'
            }
        )

        res.cookie('token', token, {
            httpOnly: true,      // ไม่ให้ JavaScript เข้าถึง cookie นี้
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',  // ป้องกันการโจมตี CSRF
            maxAge: 2 * 60 * 60 * 1000  // ตั้งเวลาให้หมดอายุใน 2 ชั่วโมง
        })

        user.token = token
        return res.status(201).json({
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
        })

    } catch (err) {
        console.log(err)
    }
})

userRoute.route('/sign_in').post(async (req, res) => {
    try {
        const { username, password } = req.body

        if (!(username, password)) {
            return res.status(400).send("All input is required")
        }
        const user = await Users.findOne({ username })
        const comparePassword = await bcrypt.compare(password, user.password)

        if (user && comparePassword) {
            const token = jwt.sign(
                {
                    user_id: user._id
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            )

            res.cookie("token", token, {
                httpOnly: true,      // ไม่ให้ JavaScript เข้าถึง cookie นี้
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'None',  // ป้องกันการโจมตี CSRF
                maxAge: 2 * 60 * 60 * 1000  // ตั้งเวลาให้หมดอายุใน 2 ชั่วโมง
            })

            user.token = token
            return res.status(200).json({
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                token: user.token,
            })
        }
        
        return res.status(400).send("Invalid Credentials")
    } catch (err) {
        console.log(err)
    }
})

userRoute.route("/").get(auth ,async (req, res) => {
    try {
        const users = await Users.find({});
        return res.status(200).json(users); // ส่งข้อมูลผู้ใช้กลับ
    } catch (err) {
        console.error(err); // log ข้อผิดพลาด
        return res.status(500).json({ message: "Internal Server Error", error: err.message }); // ส่งข้อความ error กลับ
    }
})
module.exports = userRoute
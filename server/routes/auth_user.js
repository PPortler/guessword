const express = require('express')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const Users = require('../models/user')

const appRoute = express.Router()

appRoute.route('/').get(auth, async (req, res) => {
    const id = req.user.user_id
    try {
        const user = await Users.findOne({ _id: id })
        if (!user) {
            return res.status(404).json({ authenticated: false, message: "User not found" });
        }
        return res.status(200).json({ authenticated: true, user });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ authenticated: false, message: "Server error" });
    }

})


appRoute.route('/logout').get(auth, async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,  // ป้องกันไม่ให้เข้าถึงจาก JavaScript
        secure: true,  // ใช้ HTTPS เมื่อใน production
        sameSite: 'None',  // ข้ามโดเมนได้
        path: '/',  // ให้ลบจากทุก Path
    });

    return res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = appRoute
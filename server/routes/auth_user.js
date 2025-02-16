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

// appRoute.route('/logout').get(async (req, res) => {
//     // ลบ cookie ที่เก็บ JWT token
//     res.clearCookie('token', {
//         httpOnly: true,      // ไม่ให้ JavaScript เข้าถึง cookie นี้
//         secure: process.env.NODE_ENV === 'production', // ใช้ secure cookie เฉพาะใน production
//         sameSite: 'None',    // ข้ามโดเมนได้
//         partitioned: true  // ✅ ใช้ partitioned เพื่อรองรับ Chrome ใหม่
//     });

//     return res.status(200).json({ message: 'Logged out successfully' });
// });

appRoute.route('/logout').get(async (req, res) => {
    return res.status(200).json({ message: 'Logged out successfully' });
});


module.exports = appRoute
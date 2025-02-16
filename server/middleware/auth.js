const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    // const token = req.body.token || req.headers["x-access-token"] || req.query.token || req.cookies.token;

    const token = req.headers.authorization?.split(" ")[1]; // ดึง token ออกมา

    if(!token){
        return res.status(401).send("A token is required for authentication")
    }

    if (!process.env.TOKEN_KEY) {
        return res.status(500).send("TOKEN_KEY is not set in the environment variables");
    }

    try{
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)

        req.user = decoded;
    }catch(err){
        return res.status(403).send("Invalid Token");
    }

    return next();
}

module.exports = verifyToken
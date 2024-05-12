const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.cookie.split("jwt=")[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.body.auth = decoded;
        next();
    } catch (err) {
        res.status(401).json({
            "message": "Auth Failed",
            error: err
        })
    }
}
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
    try {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                res.status(400).json({
                    "message": "unable to hash password",
                    error: err
                })
            } else {
                req.body.password = hash;
                const user = new User(req.body);
                const newUser = await user.save();
                res.status(201).json({
                    "message": "user registered successfully",
                    "newUser": newUser
                })
            }
        })
    } catch (err) {
        res.status(500).json({
            "message": "unable to register user",
            error: err
        })
    }
}

const userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).json({
                "message": "email doesn't exist",
            })
        } else {
            const auth = await bcrypt.compare(req.body.password, user.password);
            if (!auth) {
                res.status(400).json({
                    "message": "incorrect password"
                })
            } else {
                const token = jwt.sign(
                    {
                        id: user._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '1h'
                    }
                );
                res.cookie('jwt', token);
                res.status(200).json({
                    "message": "user logged in",
                    user: user
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            "message": "unable to login user",
            error: err
        })
    }
}

const userGet = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json({
            "message": "success",
            user: user
        })
    } catch (err) {
        res.status(500).json({
            "message": "unable to get user",
            error: err
        })
    }
}

const userLogout = async (req, res) => {
    try {
        res.cookie('jwt', ''),
        res.status(200).json({
            "message": "user logged out"
        })
    } catch (err) {
        res.status(500).json({
            "message": "need to login first",
            error: err
        })
    }
}

const userFetch = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            "message": "user fetched",
            user: user
        })
    } catch (err) {
        res.status(500).json({
            "message": "unable to fetch user",
            error: err
        })
    }
}

module.exports = {
    userRegister,
    userLogin,
    userGet,
    userLogout,
    userFetch
}
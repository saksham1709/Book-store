const express = require("express");
const router = express.Router();
const { userRegister, userLogin, userGet, userLogout, userFetch } = require("../controller/userController");
const checkAuth = require("../middleware/checkAuth");

// Register user
router.post('/register', userRegister);

// Login user
router.post('/login', userLogin);

// get user
router.get('/get', checkAuth, userGet);

// Logout user
router.post('/logout', checkAuth, userLogout);

// Fetch user
router.get('/:id', userFetch);

module.exports = router;
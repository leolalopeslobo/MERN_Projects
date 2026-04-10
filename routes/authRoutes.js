const express = require('express');
const router = express.Router();

const { signUp, login } = require('../controllers/authController');

// sign up
router.post("/signup", signUp);

// login
router.post("/login", login);

module.exports = router;
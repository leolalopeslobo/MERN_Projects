const express = require('express');
const router = express.Router();

const { signUp, login } = require('../controllers/authController');
const validate = require("../middlewares/validate");
const { signUpSchema, loginSchema } = require("../validators/authValidator");

// sign up
router.post("/signup", validate(signUpSchema), signUp);

// login
router.post("/login", validate(loginSchema), login);

module.exports = router;
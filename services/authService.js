const jwt = require("jsonwebtoken");
const User = require('../models/User');

// signup service
const signUpService = async (data) => {
    const user = new User(data);
    return await user.save();
}

// login service
const loginService = async ({ email, password }) => {
    const user = await User.findOne({ email, password });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    // create a token
    return jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
};

module.exports = {
    signUpService,
    loginService
}
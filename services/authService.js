const jwt = require("jsonwebtoken");
const User = require('../models/User');
const bcrypt = require("bcrypt");

// signup service
const signUpService = async (data) => {
    const { email, password } = data;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });
    return await user.save();
}

// login service
const loginService = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid user");
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
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
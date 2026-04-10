const jwt = require('jsonwebtoken'); // bring in the JWT tool that creates and verifies tokens

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization; // pull the token out of the request envelope
        // Example: req.headers.authorization = "eyJhbGciOiJIUzI1NiJ9..."

        if (!token) {
            return res.status(401).json({ error: "No token provided" }); // no token found — block immediately
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify the token is real and unpack it
        // jwt.verify() does two things:
        // 1. VERIFY — checks if the token is genuine and hasn't been tampered with
        //             uses JWT_SECRET to do this — the same secret that was used to CREATE the token
        //             think of JWT_SECRET as a stamp — if the stamp matches, the token is real
        // 2. DECODE — if valid, unpacks the token and returns the data stored inside
        // Example decoded: { id: "64abc123", email: "user@gmail.com" }
        // If token is fake or expired — throws an error and jumps straight to catch 

        req.user = decoded; // attach the decoded user data to the request so controllers can use it
        // Example: req.user.id = "64abc123", req.user.email = "user@gmail.com"

        next(); // token is valid so move forward

    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
}
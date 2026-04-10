const mongoose = require('mongoose'); // Translator between code and the database - helps the code talk to the db
const express = require("express"); // Tool that handles incoming requests
const cors = require('cors'); // Security guard that allows frontend-backend communication (makes Same-Origin Policy flexible)
const errorHandler = require('./middlewares/errorHandler');

const taskRoutes = require('./routes/taskRoutes')
const authRoutes = require('./routes/authRoutes')

require('dotenv').config(); // Open the secret drawer and load passwords/keys

const app = express();        // Start the receptionist and name them 'app'

// middlewares
app.use(cors());              // Rule 1: Let all origins (addresses) communicate with the server relaxing the Same-Origin Policy
app.use(express.json());      // Rule 2: Unpack all incoming JSON data so our code can read it. Converts different forms of incoming data (raw, text, etc.) into JavaScript Objects

// app.use() is called middleware — which is just a fancy word for something that sits in the middle between the request arriving and your code handling it.
// app.use() is simply a way of saying "apply this to every request that comes in."

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {  // When someone visits / of the server
    res.send("API is running...");  // Send back this message
});

// code to debug API
app.get("/ping", (req, res) => {
  console.log("Ping received!");
  res.send("pong");
});

// code to test a simple manual error
app.get("/test-error", (req, res, next) => {
  const err = new Error("Test error working");
  err.statusCode = 400;
  next(err);
});

// after all routes
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)  // Connect to the database using the secret address from .env
.then(() => {                            // If the connection succeeds...
    console.log("MongoDB Connected");    // Print success message in the terminal
    app.listen(3001, () => console.log("Server running on port 3001")); // Start the server on port 5000
})
.catch(err => console.log(err));        // If connection fails, print the error


// ASYNCHRONOUS PROGRAMMING & PROMISES
// Connecting to a database is not instant, it takes time.
// But default, JavaScript doesn't like to wait — it will keep running the next lines without stopping.
// This is dangerous because your server could start before the database is even connected.
// So we use Promises — JavaScript's way of saying "I'll get back to you with a result."
// .then() → runs if the operation succeeded
// .catch() → runs if the operation failed

// HOW JAVASCRIPT HANDLES THE WAITING
// JavaScript runs on a single thread — it can only do one thing at a time.
// When an async operation is called, JavaScript doesn't freeze.
// It hands off the task to the background and says "let me know when you're done."
// This background area is called the Web APIs / Background.
// While waiting, JavaScript is free to do other things if there are any.
// When the background task finishes, the result lines up in the Callback Queue.
// The EVENT LOOP constantly checks — "is the main thread free and is there
// anything waiting in the queue? If yes, bring it in and process it."
// When the response comes back, it jumps into .then() or .catch().
// This is why it's called ASYNCHRONOUS — the task happens outside
// the normal top-to-bottom flow of the code.


/*
The Event Loop
JavaScript runs on a single thread — meaning it can only do one thing at a time. So how does it handle waiting for slow tasks without freezing?
It has a system made of three parts:
1. Call Stack
This is where your code runs line by line. Think of it as the main desk where work gets done.
2. Web APIs / Background
When a slow task comes in (like a database connection), it gets sent off here to run in the background — outside of JavaScript's main thread.
3. Callback Queue
When the background task finishes, its result lines up here waiting to be processed.
The Event Loop is simply the mechanism that constantly checks:

"Is the Call Stack free? Is there anything waiting in the Callback Queue? If yes — bring it onto the Call Stack and process it."
*/

###### Express vs Mongoose Async Handling Notes

###### 1. mongoose.connect()

###### What it is
- Used to connect your app to MongoDB
- Returns a **Promise**

###### Correct Usage (Promise style)
```js
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(3001, () => console.log("Server running on port 3001"));
  })
  .catch(err => console.log(err));
```

###### Correct Usage (Async-Await style)
```js
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    app.listen(3001, () => {
      console.log("Server running on port 3001");
    });

  } catch (err) {
    console.error(err);
  }
};

startServer();
```

###### Incorrect Usage
```js
mongoose.connect(process.env.MONGO_URI, async (req, res) => { ... });
```

Why wrong?
- mongoose.connect() does NOT take a callback
- It does NOT use req and res
- It returns a Promise instead


###### 2. app.get()

###### What it is
- Defines a route in Express
- Takes a callback function (route handler)

###### Basic Usage
```js
app.get('/route', (req, res) => {
  res.send("Hello");
});
```

###### Key Points
- Callback runs every time the route is hit
- Express provides:
    - req → request object
    - res → response object


###### 3. Using async/await in app.get()
```js
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

###### Notes
- The callback can be async
- You can use await inside it
- Always use try/catch for error handling
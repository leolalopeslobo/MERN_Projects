require('dotenv').config
const express = require('express')
const app = express();
const cors = require('cors')


//importing routes
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")

//database
const connectDB = require('./db')


//middlewares
app.use(express.json())
app.use(cors());


//routes
app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)


const port = process.env.PORT || 8080;
const server = () => {
    connectDB();
    app.listen(port,()=>console.log(`Listening on port ${port}...`))
}


// const server = () => {
//     connectDB();
//     console.log(`You are listing to port: ${port}`)
//     app.listen(port,()=>console.log(`Listening on port ${port}...`))
//     // app.listen(PORT,'localhost',()=>{
//     //     console.log('listing to port:',PORT)
//     // })
// }

server()
const mongoose = require('mongoose');

const connectDB = async () => {

    try{
        const connect = await mongoose.connect('mongodb://127.0.0.1:27017/cms',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

        console.log('MongoDB connected...');
        console.log(`hostname: ${connect.connection.host}`)

    }catch(err){
        console.log(err);

    }

    
}

module.exports = connectDB;
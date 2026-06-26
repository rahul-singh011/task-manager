const mongoose = require('mongoose')
const {config} = require('./env')

const connectDB = async ()=>{
    try{
        await mongoose.connect(config.mongoUri);
        console.log("Database Connected!")

    }catch(error){
        console.error("MongoDb connection failed: ", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
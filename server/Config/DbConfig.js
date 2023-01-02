require("dotenv").config()
const mongoose = require("mongoose")
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.LOCAL_DB)
        console.log(`MongoDB Connect: ${conn.connection.host}`)
    } catch (error){
        console.log(error)
        process.exit();
    }
}

module.exports = connectDB;
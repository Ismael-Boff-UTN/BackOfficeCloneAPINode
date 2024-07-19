import mongoose from "mongoose";

const connectDB = async ()=>{

    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`MongoDB Conectado a : ${conn.connection.db.databaseName}`);
    } catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1);
    }
}


export default connectDB;
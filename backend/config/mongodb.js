import mongoose from "mongoose";

const connectDB=async()=>{
    mongoose.connection.on('connected',()=>console.log("Database Conneted"))
    await mongoose.connect(`${process.env.MONGODB_URL}/CarePoint`)
}

export default connectDB
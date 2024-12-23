import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
        return connection;
    } catch (err) {
        console.log("Error connecting to MongoDB:", err.message);
        throw err;
    }
};

